import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import CartPage from "./components/cart/CartPage";
import routes from "tempo-routes";
import MainLayout from "./components/layout/MainLayout";
import ProductDetail from "./components/product/ProductDetail";
import CategoryPage from "./components/category/CategoryPage";

// Lazy load admin routes
const AdminRoutes = lazy(() => import("./components/admin/AdminRoutes"));

function App() {
  // Mock product detail
  const productDetail = {
    id: "1",
    name: "Base Líquida Matte",
    price: 39.99,
    rating: 4.5,
    reviewCount: 124,
    description:
      "Uma base leve e de longa duração que proporciona uma cobertura média com acabamento matte natural. Perfeita para todos os tipos de pele, especialmente peles oleosas ou mistas.",
    images: [
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&q=80",
      "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=600&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    ],
    category: "Foundation",
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route
              path="product/:id"
              element={
                <div className="container mx-auto px-4 py-8">
                  <ProductDetail {...productDetail} />
                </div>
              }
            />
          </Route>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
