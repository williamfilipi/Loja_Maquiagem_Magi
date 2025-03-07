export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string;
          price: number;
          sale_price: number | null;
          category_id: string;
          subcategory_id: string | null;
          brand_id: string;
          sku: string;
          barcode: string | null;
          stock: number;
          low_stock_threshold: number;
          status: string;
          featured: boolean;
          images: string[] | null;
          weight: number | null;
          dimensions: Json | null;
          taxable: boolean;
          meta_title: string | null;
          meta_description: string | null;
          meta_keywords: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description: string;
          price: number;
          sale_price?: number | null;
          category_id: string;
          subcategory_id?: string | null;
          brand_id: string;
          sku: string;
          barcode?: string | null;
          stock: number;
          low_stock_threshold?: number;
          status?: string;
          featured?: boolean;
          images?: string[] | null;
          weight?: number | null;
          dimensions?: Json | null;
          taxable?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string;
          price?: number;
          sale_price?: number | null;
          category_id?: string;
          subcategory_id?: string | null;
          brand_id?: string;
          sku?: string;
          barcode?: string | null;
          stock?: number;
          low_stock_threshold?: number;
          status?: string;
          featured?: boolean;
          images?: string[] | null;
          weight?: number | null;
          dimensions?: Json | null;
          taxable?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          slug: string;
          description: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          slug: string;
          description?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          slug?: string;
          description?: string | null;
        };
      };
      subcategories: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          slug: string;
          category_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          slug: string;
          category_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          slug?: string;
          category_id?: string;
        };
      };
      brands: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          slug: string;
          logo_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
        };
      };
      customers: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          address: string | null;
          status: string;
          segment: string;
          avatar_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone?: string | null;
          address?: string | null;
          status?: string;
          segment?: string;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          address?: string | null;
          status?: string;
          segment?: string;
          avatar_url?: string | null;
        };
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          customer_id: string;
          status: string;
          total: number;
          shipping_address: string;
          shipping_method: string;
          shipping_cost: number;
          payment_method: string;
          payment_status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          customer_id: string;
          status?: string;
          total: number;
          shipping_address: string;
          shipping_method: string;
          shipping_cost: number;
          payment_method: string;
          payment_status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          customer_id?: string;
          status?: string;
          total?: number;
          shipping_address?: string;
          shipping_method?: string;
          shipping_cost?: number;
          payment_method?: string;
          payment_status?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          created_at: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
        };
      };
      reviews: {
        Row: {
          id: string;
          created_at: string;
          product_id: string;
          customer_id: string;
          rating: number;
          comment: string;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          product_id: string;
          customer_id: string;
          rating: number;
          comment: string;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          product_id?: string;
          customer_id?: string;
          rating?: number;
          comment?: string;
          status?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          role: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          role?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          role?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
