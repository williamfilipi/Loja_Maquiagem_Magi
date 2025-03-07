import { supabase } from "@/lib/supabase";

export interface Review {
  id: string;
  product_id: string;
  customer_id: string;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
}

export const getReviews = async (productId?: string): Promise<Review[]> => {
  let query = supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (productId) {
    query = query.eq("product_id", productId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }

  return data || [];
};

export const getReviewById = async (id: string): Promise<Review | null> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching review with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const createReview = async (
  review: Omit<Review, "id" | "created_at">,
): Promise<Review> => {
  const { data, error } = await supabase
    .from("reviews")
    .insert(review)
    .select()
    .single();

  if (error) {
    console.error("Error creating review:", error);
    throw error;
  }

  return data;
};

export const updateReviewStatus = async (
  id: string,
  status: string,
): Promise<Review> => {
  const { data, error } = await supabase
    .from("reviews")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating review status for review ${id}:`, error);
    throw error;
  }

  return data;
};

export const deleteReview = async (id: string): Promise<void> => {
  const { error } = await supabase.from("reviews").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting review with id ${id}:`, error);
    throw error;
  }
};

export const getReviewsByStatus = async (status: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching reviews with status ${status}:`, error);
    throw error;
  }

  return data || [];
};

export const getReviewsByCustomer = async (
  customerId: string,
): Promise<Review[]> => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching reviews for customer ${customerId}:`, error);
    throw error;
  }

  return data || [];
};
