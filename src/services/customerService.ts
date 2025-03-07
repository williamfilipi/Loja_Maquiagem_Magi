import { supabase } from "@/lib/supabase";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  status: string;
  segment: string;
  avatar_url: string | null;
  created_at: string;
}

export const getCustomers = async (): Promise<Customer[]> => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }

  return data || [];
};

export const getCustomerById = async (id: string): Promise<Customer | null> => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching customer with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const createCustomer = async (
  customer: Omit<Customer, "id" | "created_at">,
): Promise<Customer> => {
  const { data, error } = await supabase
    .from("customers")
    .insert(customer)
    .select()
    .single();

  if (error) {
    console.error("Error creating customer:", error);
    throw error;
  }

  return data;
};

export const updateCustomer = async (
  id: string,
  customer: Partial<Omit<Customer, "id" | "created_at">>,
): Promise<Customer> => {
  const { data, error } = await supabase
    .from("customers")
    .update(customer)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating customer with id ${id}:`, error);
    throw error;
  }

  return data;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  const { error } = await supabase.from("customers").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting customer with id ${id}:`, error);
    throw error;
  }
};

export const getCustomersBySegment = async (
  segment: string,
): Promise<Customer[]> => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("segment", segment)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching customers with segment ${segment}:`, error);
    throw error;
  }

  return data || [];
};
