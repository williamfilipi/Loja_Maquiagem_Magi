import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Use default values for development if environment variables are not set
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://placeholder-project.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Create a mock client if we're using placeholder values
const isMockClient = supabaseUrl.includes("placeholder");

if (isMockClient) {
  console.warn(
    "Using mock Supabase client. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables for a real connection.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Add mock methods for development when no real Supabase connection is available
if (isMockClient) {
  // Override methods to return mock data instead of making actual API calls
  const mockData = {};
  const originalFrom = supabase.from;

  supabase.from = (table: string) => {
    const mockMethods = {
      select: () => mockMethods,
      insert: () => mockMethods,
      update: () => mockMethods,
      delete: () => mockMethods,
      eq: () => mockMethods,
      order: () => mockMethods,
      single: () => mockMethods,
      lt: () => mockMethods,
      then: (callback: Function) => {
        callback({ data: [], error: null });
        return Promise.resolve({ data: [], error: null });
      },
    };

    return mockMethods as any;
  };

  // Mock auth methods
  const originalAuth = supabase.auth;
  supabase.auth = {
    ...originalAuth,
    signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    getSession: () => Promise.resolve({ data: { session: null } }),
    getUser: () => Promise.resolve({ data: { user: null } }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
  } as any;
}
