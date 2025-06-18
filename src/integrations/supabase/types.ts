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
      currency_rates: {
        Row: {
          base_currency: string
          created_at: string | null
          id: number
          is_active: boolean | null
          last_updated: string | null
          rate: number
          source: string | null
          target_currency: string
          updated_at: string | null
        }
        Insert: {
          base_currency?: string
          created_at?: string | null
          id?: never
          is_active?: boolean | null
          last_updated?: string | null
          rate: number
          source?: string | null
          target_currency: string
          updated_at?: string | null
        }
        Update: {
          base_currency?: string
          created_at?: string | null
          id?: never
          is_active?: boolean | null
          last_updated?: string | null
          rate?: number
          source?: string | null
          target_currency?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      kyc_documents: {
        Row: {
          created_at: string | null
          document_type: string
          document_url: string
          id: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_type: string
          document_url: string
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_type?: string
          document_url?: string
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kyc_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lots: {
        Row: {
          available_tokens: number
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          status: string | null
          token_price_usd: number | null
          total_tokens: number
        }
        Insert: {
          available_tokens?: number
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          status?: string | null
          token_price_usd?: number | null
          total_tokens?: number
        }
        Update: {
          available_tokens?: number
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          status?: string | null
          token_price_usd?: number | null
          total_tokens?: number
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          otp_code: string
          phone_number: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          otp_code: string
          phone_number: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          otp_code?: string
          phone_number?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "otp_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          kyc_status: string | null
          nationality: string
          phone_number: string | null
          updated_at: string | null
          wallet_address: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          kyc_status?: string | null
          nationality: string
          phone_number?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          kyc_status?: string | null
          nationality?: string
          phone_number?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      property_projects: {
        Row: {
          created_at: string | null
          description: string | null
          filipino_quota: number | null
          filipinos_tokens_sold: number | null
          foreign_quota: number | null
          foreign_tokens_sold: number | null
          id: string
          image_url: string | null
          location: string | null
          name: string
          project_status: string | null
          token_price_usd: number | null
          total_tokens: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          filipino_quota?: number | null
          filipinos_tokens_sold?: number | null
          foreign_quota?: number | null
          foreign_tokens_sold?: number | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
          project_status?: string | null
          token_price_usd?: number | null
          total_tokens?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          filipino_quota?: number | null
          filipinos_tokens_sold?: number | null
          foreign_quota?: number | null
          foreign_tokens_sold?: number | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
          project_status?: string | null
          token_price_usd?: number | null
          total_tokens?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      token_pools: {
        Row: {
          created_at: string | null
          id: number
          pool_type: string
          sold_tokens: number | null
          token_price_usd: number | null
          total_tokens: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          pool_type: string
          sold_tokens?: number | null
          token_price_usd?: number | null
          total_tokens: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          pool_type?: string
          sold_tokens?: number | null
          token_price_usd?: number | null
          total_tokens?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount_usd: number
          created_at: string | null
          id: string
          investor_id: string
          status: string | null
          token_amount: number
          tx_hash: string | null
          updated_at: string | null
        }
        Insert: {
          amount_usd: number
          created_at?: string | null
          id?: string
          investor_id: string
          status?: string | null
          token_amount: number
          tx_hash?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_usd?: number
          created_at?: string | null
          id?: string
          investor_id?: string
          status?: string | null
          token_amount?: number
          tx_hash?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_token_availability: {
        Args: { p_user_id: string; p_token_amount: number }
        Returns: boolean
      }
      update_token_pool_sold_amount: {
        Args: { pool_id: string; new_sold_amount: number }
        Returns: undefined
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
