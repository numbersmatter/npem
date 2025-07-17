export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string;
          created_at: string;
          id: string;
          state: string;
          street_address: string;
          street_address2: string | null;
          updated_at: string;
          user_id: string;
          zip_code: string;
        };
        Insert: {
          city: string;
          created_at?: string;
          id?: string;
          state: string;
          street_address: string;
          street_address2?: string | null;
          updated_at?: string;
          user_id: string;
          zip_code: string;
        };
        Update: {
          city?: string;
          created_at?: string;
          id?: string;
          state?: string;
          street_address?: string;
          street_address2?: string | null;
          updated_at?: string;
          user_id?: string;
          zip_code?: string;
        };
        Relationships: [];
      };
      period: {
        Row: {
          id: number;
          name: string;
          status: Database["public"]["Enums"]["period_status"] | null;
        };
        Insert: {
          id?: never;
          name: string;
          status?: Database["public"]["Enums"]["period_status"] | null;
        };
        Update: {
          id?: never;
          name?: string;
          status?: Database["public"]["Enums"]["period_status"] | null;
        };
        Relationships: [];
      };
      program_areas: {
        Row: {
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: never;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: never;
          name?: string;
        };
        Relationships: [];
      };
      programs: {
        Row: {
          area_id: number;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          area_id: number;
          description?: string | null;
          id?: never;
          name: string;
        };
        Update: {
          area_id?: number;
          description?: string | null;
          id?: never;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "programs_area_id_fkey";
            columns: ["area_id"];
            isOneToOne: false;
            referencedRelation: "program_areas";
            referencedColumns: ["id"];
          }
        ];
      };
      sections: {
        Row: {
          created_at: string;
          id: number;
          period_id: number;
          program_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          period_id: number;
          program_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          period_id?: number;
          program_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "sections_period_id_fkey";
            columns: ["period_id"];
            isOneToOne: false;
            referencedRelation: "period";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sections_program_id_fkey";
            columns: ["program_id"];
            isOneToOne: false;
            referencedRelation: "programs";
            referencedColumns: ["id"];
          }
        ];
      };
      user_profiles: {
        Row: {
          address_id: string | null;
          created_at: string;
          first_name: string;
          id: string;
          last_name: string;
          middle_name: string | null;
          updated_at: string;
        };
        Insert: {
          address_id?: string | null;
          created_at?: string;
          first_name: string;
          id: string;
          last_name: string;
          middle_name?: string | null;
          updated_at?: string;
        };
        Update: {
          address_id?: string | null;
          created_at?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          middle_name?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_address";
            columns: ["address_id"];
            isOneToOne: false;
            referencedRelation: "addresses";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      sections_full: {
        Row: {
          period_name: string | null;
          period_status: Database["public"]["Enums"]["period_status"] | null;
          program_name: string | null;
          section_id: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      period_status: "active" | "finished" | "upcoming" | "archived";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      period_status: ["active", "finished", "upcoming", "archived"],
    },
  },
} as const;
