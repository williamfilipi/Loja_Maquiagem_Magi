import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
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
  dimensions: any | null;
  taxable: boolean;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  created_at: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return data || [];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const createProduct = async (
  product: Omit<Product, "id" | "created_at">,
): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    throw error;
  }

  return data;
};

export const updateProduct = async (
  id: string,
  product: Partial<Omit<Product, "id" | "created_at">>,
): Promise<Product> => {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};

export const getLowStockProducts = async (
  threshold?: number,
): Promise<Product[]> => {
  let query = supabase.from("products").select("*");

  if (threshold) {
    query = query.lt("stock", threshold);
  } else {
    query = query.lt(
      "stock",
      supabase.rpc("column_ref", {
        table: "products",
        column: "low_stock_threshold",
      }),
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching low stock products:", error);
    throw error;
  }

  return data || [];
};
