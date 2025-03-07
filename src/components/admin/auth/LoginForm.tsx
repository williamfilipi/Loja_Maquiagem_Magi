import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";

// Form schema with phone number validation
const loginFormSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^[0-9+\-\s()]*$/, { message: "Please enter a valid phone number" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Password must contain only letters and numbers",
    }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      // Hardcoded admin credentials for development
      if (data.phone === "0123456789" && data.password === "admin123") {
        // Simulate successful login
        console.log("Admin login successful");

        // Store admin phone for session persistence
        localStorage.setItem("adminPhone", data.phone);

        // Navigate to admin dashboard
        setTimeout(() => {
          navigate("/admin");
        }, 500);
        return;
      }

      // For other credentials, try Supabase auth
      const email = `${data.phone}@magi-store.com`;

      // Call Supabase auth
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: data.password,
      });

      if (error) throw error;

      // Check if user is admin
      const userResponse = await supabase.auth.getUser();
      const userId = userResponse.data.user?.id;

      if (!userId) {
        throw new Error("User ID not found");
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        throw new Error("Unauthorized access");
      }

      // Successful login
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
      form.setError("root", {
        message: "Telefone ou senha inválidos",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-pink-600">Magi Store</h1>
        <p className="text-gray-600 mt-2">Admin Dashboard Login</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter your phone number"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <div className="text-sm font-medium text-red-500">
              {form.formState.errors.root.message}
            </div>
          )}

          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm text-pink-600 hover:text-pink-800"
              onClick={(e) => {
                e.preventDefault();
                // Handle forgot password
              }}
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Having trouble logging in? Contact support at support@magistore.com
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
