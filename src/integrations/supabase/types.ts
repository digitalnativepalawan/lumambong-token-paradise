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
      blog_posts: {
        Row: {
          author: string
          content: string
          created_at: string
          created_by: string | null
          excerpt: string | null
          id: string
          published: boolean
          published_date: string
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          content: string
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          published?: boolean
          published_date?: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          published?: boolean
          published_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      investors: {
        Row: {
          created_at: string
          id: string
          investment_amount_usd: number
          nationality: string
          percentage: number
          unit_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          investment_amount_usd: number
          nationality: string
          percentage: number
          unit_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          investment_amount_usd?: number
          nationality?: string
          percentage?: number
          unit_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      kyc_documents: {
        Row: {
          document_type: string | null
          document_url: string
          id: string
          uploaded_at: string | null
          user_id: string
          verified_at: string | null
          verified_by_admin: boolean | null
        }
        Insert: {
          document_type?: string | null
          document_url: string
          id?: string
          uploaded_at?: string | null
          user_id: string
          verified_at?: string | null
          verified_by_admin?: boolean | null
        }
        Update: {
          document_type?: string | null
          document_url?: string
          id?: string
          uploaded_at?: string | null
          user_id?: string
          verified_at?: string | null
          verified_by_admin?: boolean | null
        }
        Relationships: []
      }
      lots: {
        Row: {
          available_tokens: number | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          status: string | null
          token_price_usd: number | null
          total_tokens: number | null
        }
        Insert: {
          available_tokens?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          status?: string | null
          token_price_usd?: number | null
          total_tokens?: number | null
        }
        Update: {
          available_tokens?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          status?: string | null
          token_price_usd?: number | null
          total_tokens?: number | null
        }
        Relationships: []
      }
      ownerships: {
        Row: {
          created_at: string | null
          id: string
          lot_id: string
          purchase_price_usd: number | null
          tokens_owned: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          lot_id: string
          purchase_price_usd?: number | null
          tokens_owned?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lot_id?: string
          purchase_price_usd?: number | null
          tokens_owned?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ownerships_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "lots"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          kyc_status: string | null
          nationality: string | null
          role: string | null
          updated_at: string | null
          uploaded_id_url: string | null
          wallet_address: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          kyc_status?: string | null
          nationality?: string | null
          role?: string | null
          updated_at?: string | null
          uploaded_id_url?: string | null
          wallet_address?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          kyc_status?: string | null
          nationality?: string | null
          role?: string | null
          updated_at?: string | null
          uploaded_id_url?: string | null
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
          location: string | null
          name: string
          project_status: string | null
          token_price_usd: number | null
          total_tokens: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          filipino_quota?: number | null
          filipinos_tokens_sold?: number | null
          foreign_quota?: number | null
          foreign_tokens_sold?: number | null
          id?: string
          location?: string | null
          name: string
          project_status?: string | null
          token_price_usd?: number | null
          total_tokens?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          filipino_quota?: number | null
          filipinos_tokens_sold?: number | null
          foreign_quota?: number | null
          foreign_tokens_sold?: number | null
          id?: string
          location?: string | null
          name?: string
          project_status?: string | null
          token_price_usd?: number | null
          total_tokens?: number | null
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
          total_tokens?: number
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
          amount_usd: number
          created_at: string
          id: string
          investor_email: string
          investor_name: string
          investor_phone: string | null
          notes: string | null
          payment_method: string
          reference_code: string
          status: string
          unit_id: string
          updated_at: string
        }
        Insert: {
          amount_usd: number
          created_at?: string
          id?: string
          investor_email: string
          investor_name: string
          investor_phone?: string | null
          notes?: string | null
          payment_method: string
          reference_code: string
          status?: string
          unit_id: string
          updated_at?: string
        }
        Update: {
          amount_usd?: number
          created_at?: string
          id?: string
          investor_email?: string
          investor_name?: string
          investor_phone?: string | null
          notes?: string | null
          payment_method?: string
          reference_code?: string
          status?: string
          unit_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      units: {
        Row: {
          created_at: string
          id: string
          name: string
          status: string
          token_price_usd: number
          total_tokens: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          status?: string
          token_price_usd?: number
          total_tokens?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          status?: string
          token_price_usd?: number
          total_tokens?: number
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          kyc_verified: boolean | null
          nationality: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          kyc_verified?: boolean | null
          nationality?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          kyc_verified?: boolean | null
          nationality?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_admin_user: {
        Args: { user_email: string }
        Returns: undefined
      }
      validate_token_purchase: {
        Args: {
          p_user_id: string
          p_project_id: string
          p_token_quantity: number
        }
        Returns: {
          is_valid: boolean
          error_message: string
          available_tokens: number
        }[]
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
