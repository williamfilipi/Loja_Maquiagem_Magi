import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import ProductList from "./products/ProductList";
import ProductForm from "./products/ProductForm";
import InventoryManagement from "./inventory/InventoryManagement";
import OrderManagement from "./orders/OrderManagement";
import ReviewManagement from "./reviews/ReviewManagement";
import CustomerManagement from "./customers/CustomerManagement";
import CategoryManagement from "./categories/CategoryManagement";
import LoginForm from "./auth/LoginForm";
import { withAdminAuth } from "./auth/AdminAuthProvider";

// Wrap components that require admin authentication
const ProtectedAdminLayout = withAdminAuth(AdminLayout);

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<ProtectedAdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id" element={<ProductForm isEditing={true} />} />
        <Route path="inventory" element={<InventoryManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="reviews" element={<ReviewManagement />} />
        <Route path="customers" element={<CustomerManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
