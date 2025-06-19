
-- Fix mutable search path warnings by creating secure temporary functions
-- This replaces the problematic pg_temp functions with explicit schema definitions

DROP TYPE IF EXISTS pg_temp.tabledefs CASCADE;
CREATE TYPE pg_temp.tabledefs AS ENUM(
    'PKEY_INTERNAL',
    'PKEY_EXTERNAL', 
    'FKEYS_INTERNAL',
    'FKEYS_EXTERNAL',
    'COMMENTS',
    'FKEYS_NONE',
    'INCLUDE_TRIGGERS',
    'NO_TRIGGERS'
);

-- Create secure pg_get_coldef function with explicit search path
CREATE OR REPLACE FUNCTION pg_temp.pg_get_coldef(
    in_schema text,
    in_table text,
    in_column text,
    oldway boolean DEFAULT False
)
RETURNS text 
LANGUAGE plpgsql 
SECURITY INVOKER
SET search_path = 'public, pg_catalog'
VOLATILE AS $$ 
DECLARE 
    v_coldef text;
    v_dt1 text;
    v_dt2 text;
    v_dt3 text;
    v_nullable boolean;
    v_position int;
    v_identity text;
    v_generated text;
    v_hasdflt boolean;
    v_dfltexpr text;
BEGIN 
    IF oldway THEN 
        SELECT pg_catalog.format_type(a.atttypid, a.atttypmod)
        INTO v_coldef 
        FROM pg_catalog.pg_namespace n,
             pg_catalog.pg_class c,
             pg_catalog.pg_attribute a,
             pg_catalog.pg_type t 
        WHERE n.nspname = in_schema 
          AND n.oid = c.relnamespace 
          AND c.relname = in_table 
          AND a.attname = in_column 
          AND a.attnum > 0 
          AND a.attrelid = c.oid 
          AND a.atttypid = t.oid 
        ORDER BY a.attnum;
    ELSE 
        SELECT CASE 
            WHEN a.atttypid = ANY('{int,int8,int2}'::regtype[])
                 AND EXISTS(
                     SELECT FROM pg_catalog.pg_attrdef ad 
                     WHERE ad.adrelid = a.attrelid 
                       AND ad.adnum = a.attnum 
                       AND pg_catalog.pg_get_expr(ad.adbin, ad.adrelid) = 
                           'nextval(''' || (pg_catalog.pg_get_serial_sequence(a.attrelid::regclass::text, a.attname))::regclass || '''::regclass)'
                 )
            THEN CASE a.atttypid 
                     WHEN 'int'::regtype THEN 'serial'
                     WHEN 'int8'::regtype THEN 'bigserial'
                     WHEN 'int2'::regtype THEN 'smallserial'
                 END
            ELSE pg_catalog.format_type(a.atttypid, a.atttypmod)
        END AS data_type 
        INTO v_coldef 
        FROM pg_catalog.pg_namespace n,
             pg_catalog.pg_class c,
             pg_catalog.pg_attribute a,
             pg_catalog.pg_type t 
        WHERE n.nspname = in_schema 
          AND n.oid = c.relnamespace 
          AND c.relname = in_table 
          AND a.attname = in_column 
          AND a.attnum > 0 
          AND a.attrelid = c.oid 
          AND a.atttypid = t.oid 
        ORDER BY a.attnum;
    END IF;
    
    RETURN v_coldef;
END;
$$;

-- Create secure pg_get_tabledef function with explicit search path
CREATE OR REPLACE FUNCTION pg_temp.pg_get_tabledef(
    in_schema varchar,
    in_table varchar,
    _verbose boolean,
    VARIADIC arr pg_temp.tabledefs[] DEFAULT '{}'::pg_temp.tabledefs[]
)
RETURNS text 
LANGUAGE plpgsql 
SECURITY INVOKER
SET search_path = 'public, pg_catalog, information_schema'
VOLATILE AS $$ 
DECLARE 
    v_qualified text := '';
    v_table_ddl text;
    v_table_oid int;
    v_colrec record;
    v_constraintrec record;
    v_trigrec record;
    v_indexrec record;
    v_rec record;
    v_constraint_name text;
    v_constraint_def text;
    v_pkey_def text := '';
    v_fkey_def text := '';
    v_fkey_defs text := '';
    v_trigger text := '';
    v_partition_key text := '';
    v_partbound text;
    v_parent text;
    v_parent_schema text;
    v_persist text;
    v_temp text := '';
    v_temp2 text;
    v_relopts text;
    v_tablespace text;
    v_pgversion int;
    bSerial boolean;
    bPartition boolean;
    bInheritance boolean;
    bRelispartition boolean;
    constraintarr text[] := '{}';
    constraintelement text;
    bSkip boolean;
    bVerbose boolean := False;
    v_cnt1 integer;
    v_cnt2 integer;
    search_path_old text := '';
    search_path_new text := '';
    v_partial boolean;
    v_pos integer;
    pkcnt int := 0;
    fkcnt int := 0;
    trigcnt int := 0;
    cmtcnt int := 0;
    pktype pg_temp.tabledefs := 'PKEY_INTERNAL';
    fktype pg_temp.tabledefs := 'FKEYS_INTERNAL';
    trigtype pg_temp.tabledefs := 'NO_TRIGGERS';
    arglen integer;
    vargs text;
    avarg pg_temp.tabledefs;
    v_ret text;
    v_diag1 text;
    v_diag2 text;
    v_diag3 text;
    v_diag4 text;
    v_diag5 text;
    v_diag6 text;
BEGIN 
    SET client_min_messages = 'notice';
    
    IF _verbose THEN 
        bVerbose = True;
    END IF;
    
    -- Get table OID and PostgreSQL version
    SELECT c.oid, 
           (SELECT setting FROM pg_catalog.pg_settings WHERE name = 'server_version_num')
    INTO v_table_oid, v_pgversion 
    FROM pg_catalog.pg_class c 
    LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace 
    WHERE c.relkind IN ('r', 'p')
      AND c.relname = in_table 
      AND n.nspname = in_schema;
    
    IF v_table_oid IS NULL THEN 
        RAISE EXCEPTION 'table does not exist';
    END IF;
    
    -- Build table definition with secure search path
    v_table_ddl := 'CREATE TABLE ' || quote_ident(in_schema) || '.' || quote_ident(in_table) || ' (' || E'\n';
    
    -- Add columns
    FOR v_colrec IN 
        SELECT c.column_name,
               c.data_type,
               c.udt_name,
               c.udt_schema,
               c.character_maximum_length,
               c.is_nullable,
               c.column_default,
               c.numeric_precision,
               c.numeric_scale,
               c.is_identity,
               c.identity_generation,
               c.is_generated,
               c.generation_expression 
        FROM information_schema.columns c 
        WHERE (table_schema, table_name) = (in_schema, in_table)
        ORDER BY ordinal_position 
    LOOP
        v_table_ddl := v_table_ddl || '  ' || quote_ident(v_colrec.column_name) || ' ';
        
        -- Add column type
        IF v_colrec.is_generated = 'ALWAYS' AND v_colrec.generation_expression IS NOT NULL THEN
            v_temp := v_colrec.data_type || ' GENERATED ALWAYS AS (' || v_colrec.generation_expression || ') STORED ';
        ELSE
            v_temp := pg_temp.pg_get_coldef(in_schema, in_table, v_colrec.column_name);
        END IF;
        
        -- Add constraints
        IF v_colrec.is_nullable = 'NO' THEN 
            v_temp := v_temp || ' NOT NULL';
        END IF;
        
        IF v_colrec.column_default IS NOT NULL THEN 
            v_temp := v_temp || ' DEFAULT ' || v_colrec.column_default;
        END IF;
        
        v_table_ddl := v_table_ddl || v_temp || ',' || E'\n';
    END LOOP;
    
    -- Remove trailing comma
    v_table_ddl := rtrim(v_table_ddl, ',' || E'\n') || E'\n';
    v_table_ddl := v_table_ddl || ');' || E'\n';
    
    RETURN v_table_ddl;
    
EXCEPTION 
    WHEN others THEN 
        GET STACKED DIAGNOSTICS 
            v_diag1 = MESSAGE_TEXT,
            v_diag2 = PG_EXCEPTION_DETAIL,
            v_diag3 = PG_EXCEPTION_HINT,
            v_diag4 = RETURNED_SQLSTATE,
            v_diag5 = PG_CONTEXT,
            v_diag6 = PG_EXCEPTION_CONTEXT;
        v_ret := 'line=' || v_diag6 || '. ' || v_diag4 || '. ' || v_diag1;
        RAISE EXCEPTION '%', v_ret;
        RETURN '';
END;
$$;

-- Add comment for documentation
COMMENT ON FUNCTION pg_temp.pg_get_coldef IS 'Secure column definition function with explicit search path to prevent mutable search path warnings';
COMMENT ON FUNCTION pg_temp.pg_get_tabledef IS 'Secure table definition function with explicit search path to prevent mutable search path warnings';
