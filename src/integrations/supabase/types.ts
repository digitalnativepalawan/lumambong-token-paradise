export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      client_profiles: {
        Row: {
          city_barangay: string | null
          country: string | null
          created_at: string
          id: string
          is_vat_registered: boolean | null
          municipality: string | null
          name: string
          tin_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          city_barangay?: string | null
          country?: string | null
          created_at?: string
          id?: string
          is_vat_registered?: boolean | null
          municipality?: string | null
          name: string
          tin_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          city_barangay?: string | null
          country?: string | null
          created_at?: string
          id?: string
          is_vat_registered?: boolean | null
          municipality?: string | null
          name?: string
          tin_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      company_profiles: {
        Row: {
          city_barangay: string | null
          country: string | null
          created_at: string
          id: string
          is_vat_registered: boolean | null
          municipality: string | null
          name: string
          tin_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          city_barangay?: string | null
          country?: string | null
          created_at?: string
          id?: string
          is_vat_registered?: boolean | null
          municipality?: string | null
          name: string
          tin_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          city_barangay?: string | null
          country?: string | null
          created_at?: string
          id?: string
          is_vat_registered?: boolean | null
          municipality?: string | null
          name?: string
          tin_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          account_code: string | null
          amount_purchase: number
          bir_registered_name: string
          category: string
          company_address: string | null
          created_at: string
          creditable_input_vat: number | null
          date: string
          description: string
          id: string
          image_link: string | null
          non_creditable_input_vat: number | null
          proprietor: string | null
          receipt_url: string | null
          tin_seller: string | null
          total_less_vat: number
          updated_at: string
          user_id: string
        }
        Insert: {
          account_code?: string | null
          amount_purchase: number
          bir_registered_name: string
          category: string
          company_address?: string | null
          created_at?: string
          creditable_input_vat?: number | null
          date: string
          description: string
          id?: string
          image_link?: string | null
          non_creditable_input_vat?: number | null
          proprietor?: string | null
          receipt_url?: string | null
          tin_seller?: string | null
          total_less_vat: number
          updated_at?: string
          user_id: string
        }
        Update: {
          account_code?: string | null
          amount_purchase?: number
          bir_registered_name?: string
          category?: string
          company_address?: string | null
          created_at?: string
          creditable_input_vat?: number | null
          date?: string
          description?: string
          id?: string
          image_link?: string | null
          non_creditable_input_vat?: number | null
          proprietor?: string | null
          receipt_url?: string | null
          tin_seller?: string | null
          total_less_vat?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      investors: {
        Row: {
          created_at: string
          email: string | null
          id: string
          investment_amount_usd: number | null
          name: string
          nationality: string | null
          percentage: number | null
          unit_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          investment_amount_usd?: number | null
          name: string
          nationality?: string | null
          percentage?: number | null
          unit_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          investment_amount_usd?: number | null
          name?: string
          nationality?: string | null
          percentage?: number | null
          unit_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      saved_invoices: {
        Row: {
          created_at: string
          id: string
          invoice_data: Json
          invoice_number: string
          logo_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          invoice_data: Json
          invoice_number: string
          logo_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          invoice_data?: Json
          invoice_number?: string
          logo_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      token_pools: {
        Row: {
          created_at: string
          id: string
          pool_type: string
          sold_tokens: number
          total_tokens: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          pool_type: string
          sold_tokens?: number
          total_tokens: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          pool_type?: string
          sold_tokens?: number
          total_tokens?: number
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          payment_method: string | null
          status: string
          unit_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status?: string
          unit_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string | null
          status?: string
          unit_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_user_id: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_invoice_number_unique: {
        Args:
          | { p_invoice_number: string; p_exclude_id?: string }
          | {
              p_user_id: string
              p_invoice_number: string
              p_invoice_id?: string
            }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
