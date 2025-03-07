import { supabase } from "@/lib/supabase";

export interface Order {
  id: string;
  customer_id: string;
  status: string;
  total: number;
  shipping_address: string;
  shipping_method: string;
  shipping_cost: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  return data || [];
};

export const getOrderById = async (
  id: string,
): Promise<OrderWithItems | null> => {
  // First get the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (orderError) {
    console.error(`Error fetching order with id ${id}:`, orderError);
    throw orderError;
  }

  if (!order) return null;

  // Then get the order items
  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  if (itemsError) {
    console.error(`Error fetching order items for order ${id}:`, itemsError);
    throw itemsError;
  }

  return {
    ...order,
    items: items || [],
  };
};

export const createOrder = async (
  order: Omit<Order, "id" | "created_at">,
  items: Omit<OrderItem, "id" | "created_at" | "order_id">[],
): Promise<OrderWithItems> => {
  // Start a transaction
  const { data: newOrder, error: orderError } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw orderError;
  }

  // Add order_id to each item
  const orderItems = items.map((item) => ({
    ...item,
    order_id: newOrder.id,
  }));

  // Insert order items
  const { data: newItems, error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems)
    .select();

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    throw itemsError;
  }

  return {
    ...newOrder,
    items: newItems || [],
  };
};

export const updateOrderStatus = async (
  id: string,
  status: string,
): Promise<Order> => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating order status for order ${id}:`, error);
    throw error;
  }

  return data;
};

export const getOrdersByCustomer = async (
  customerId: string,
): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching orders for customer ${customerId}:`, error);
    throw error;
  }

  return data || [];
};

export const getOrdersByStatus = async (status: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching orders with status ${status}:`, error);
    throw error;
  }

  return data || [];
};
