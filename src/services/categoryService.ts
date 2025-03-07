import { supabase } from "@/lib/supabase";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  created_at: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data || [];
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const createCategory = async (
  category: Omit<Category, "id" | "created_at">,
): Promise<Category> => {
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();

  if (error) {
    console.error("Error creating category:", error);
    throw error;
  }

  return data;
};

export const updateCategory = async (
  id: string,
  category: Partial<Omit<Category, "id" | "created_at">>,
): Promise<Category> => {
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating category with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
};

// Subcategory functions
export const getSubcategories = async (
  categoryId?: string,
): Promise<Subcategory[]> => {
  let query = supabase.from("subcategories").select("*").order("name");

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }

  return data || [];
};

export const createSubcategory = async (
  subcategory: Omit<Subcategory, "id" | "created_at">,
): Promise<Subcategory> => {
  const { data, error } = await supabase
    .from("subcategories")
    .insert(subcategory)
    .select()
    .single();

  if (error) {
    console.error("Error creating subcategory:", error);
    throw error;
  }

  return data;
};

export const updateSubcategory = async (
  id: string,
  subcategory: Partial<Omit<Subcategory, "id" | "created_at">>,
): Promise<Subcategory> => {
  const { data, error } = await supabase
    .from("subcategories")
    .update(subcategory)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating subcategory with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const deleteSubcategory = async (id: string): Promise<void> => {
  const { error } = await supabase.from("subcategories").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting subcategory with id ${id}:`, error);
    throw error;
  }
};
