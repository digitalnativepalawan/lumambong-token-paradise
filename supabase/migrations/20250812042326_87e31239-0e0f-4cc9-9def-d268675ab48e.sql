
-- 1) Profiles table + trigger on auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  nationality text,
  kyc_verified boolean not null default false,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Managers can view all profiles"
on public.profiles
for select
to authenticated
using (has_role('manager'::app_role));

create policy "Managers can update all profiles"
on public.profiles
for update
to authenticated
using (has_role('manager'::app_role))
with check (has_role('manager'::app_role));

-- timestamp trigger
create trigger profiles_set_timestamp
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', null))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- 2) Token pools table
create table if not exists public.token_pools (
  id uuid primary key default gen_random_uuid(),
  pool_type text not null check (pool_type in ('FOREIGN','PHILIPPINE')),
  total_tokens integer not null,
  sold_tokens integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.token_pools enable row level security;

create policy "Public can view token pools"
on public.token_pools
for select
to anon, authenticated
using (true);

create policy "Managers can modify token pools"
on public.token_pools
for all
to authenticated
using (has_role('manager'::app_role))
with check (has_role('manager'::app_role));

create trigger token_pools_set_timestamp
before update on public.token_pools
for each row execute function public.update_updated_at_column();

-- 3) Enrich units with investment fields (keeps existing data)
alter table public.units
  add column if not exists unit_type text,
  add column if not exists total_securities integer not null default 0,
  add column if not exists available_securities integer not null default 0,
  add column if not exists security_price_usd numeric not null default 0,
  add column if not exists ownership_type text not null default 'foreign_allowed',
  add column if not exists status text not null default 'available',
  add column if not exists funded_percentage numeric not null default 0;

-- 4) Investors table
create table if not exists public.investors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  unit_id uuid references public.units(id) on delete set null,
  name text not null,
  email text not null,
  percentage numeric not null check (percentage > 0 and percentage <= 100),
  nationality text not null,
  investment_amount_usd numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.investors enable row level security;

create policy "Users can insert their own investor row"
on public.investors
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can view their own investor rows"
on public.investors
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can update their own investor rows"
on public.investors
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Managers can manage all investor rows"
on public.investors
for all
to authenticated
using (has_role('manager'::app_role))
with check (has_role('manager'::app_role));

create trigger investors_set_timestamp
before update on public.investors
for each row execute function public.update_updated_at_column();

-- 5) Transactions table for payments
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  unit_id uuid references public.units(id) on delete set null,
  amount numeric not null check (amount > 0),
  currency text not null default 'USD',
  payment_method text,
  status text not null default 'pending',
  reference_code text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy "Users can insert their own transactions"
on public.transactions
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can view their own transactions"
on public.transactions
for select
to authenticated
using (auth.uid() = user_id);

create policy "Managers can manage all transactions"
on public.transactions
for all
to authenticated
using (has_role('manager'::app_role))
with check (has_role('manager'::app_role));

create trigger transactions_set_timestamp
before update on public.transactions
for each row execute function public.update_updated_at_column();

-- 6) Private KYC storage bucket + policies
insert into storage.buckets (id, name, public)
values ('kyc-docs', 'kyc-docs', false)
on conflict (id) do nothing;

-- Users can upload only to their own folder (userId/...)
create policy "Users can upload KYC to own folder"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'kyc-docs'
  and (name like auth.uid()::text || '/%')
);

-- Users can read their own KYC
create policy "Users can read their own KYC"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'kyc-docs'
  and (name like auth.uid()::text || '/%')
);

-- Users can update/delete their own KYC
create policy "Users can update own KYC"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'kyc-docs'
  and (name like auth.uid()::text || '/%')
)
with check (
  bucket_id = 'kyc-docs'
  and (name like auth.uid()::text || '/%')
);

create policy "Users can delete own KYC"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'kyc-docs'
  and (name like auth.uid()::text || '/%')
);

-- Managers can read all KYC
create policy "Managers can read all KYC"
on storage.objects
for select
to authenticated
using (bucket_id = 'kyc-docs' and has_role('manager'::app_role));

-- 7) Realtime (optional, safe)
do $$
begin
  begin
    execute 'alter publication supabase_realtime add table public.investors';
  exception when others then
    null;
  end;
  begin
    execute 'alter publication supabase_realtime add table public.transactions';
  exception when others then
    null;
  end;
  begin
    execute 'alter publication supabase_realtime add table public.token_pools';
  exception when others then
    null;
  end;
end $$;

alter table public.investors replica identity full;
alter table public.transactions replica identity full;
alter table public.token_pools replica identity full;
