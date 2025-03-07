import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, User, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/cart/CartDrawer";
import FavoritesDrawer from "@/components/favorites/FavoritesDrawer";
import { useCart } from "@/context/CartContext";

const Navbar: React.FC = () => {
  const { cartCount, favoritesCount } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-pink-600">
            Magi
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <FavoritesDrawer>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-6 w-6" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </FavoritesDrawer>

            <Link to="/account" className="text-gray-600 hover:text-pink-600">
              <User className="h-6 w-6" />
            </Link>

            <CartDrawer />
          </nav>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:space-x-4">
          {/* Search - Desktop next to categories */}
          <div className="relative md:w-1/3 mb-4 md:mb-0">
            <Input
              placeholder="Buscar produtos..."
              className="pl-10 pr-4 py-2 rounded-full border-pink-200 focus:border-pink-400 focus:ring-pink-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Categories - Compact on mobile */}
          <div className="overflow-x-auto md:flex-1">
            <div className="flex space-x-2 md:space-x-4 pb-2">
              <Link
                to="/category/face"
                className="text-sm font-medium whitespace-nowrap px-3 py-2 rounded-full bg-pink-100 text-pink-800 hover:bg-pink-200"
              >
                Rosto
              </Link>
              <Link
                to="/category/eyes"
                className="text-sm font-medium whitespace-nowrap px-3 py-2 rounded-full bg-white hover:bg-pink-100 text-gray-700 hover:text-pink-800"
              >
                Olhos
              </Link>
              <Link
                to="/category/lips"
                className="text-sm font-medium whitespace-nowrap px-3 py-2 rounded-full bg-white hover:bg-pink-100 text-gray-700 hover:text-pink-800"
              >
                Lábios
              </Link>
              <Link
                to="/category/cheeks"
                className="text-sm font-medium whitespace-nowrap px-3 py-2 rounded-full bg-white hover:bg-pink-100 text-gray-700 hover:text-pink-800"
              >
                Bochechas
              </Link>
              <Link
                to="/category/skincare"
                className="text-sm font-medium whitespace-nowrap px-3 py-2 rounded-full bg-white hover:bg-pink-100 text-gray-700 hover:text-pink-800"
              >
                Skincare
              </Link>
              <Link
                to="/category/brushes"
                className="text-sm font-medium whitespace-nowrap px-3 py-2 rounded-full bg-white hover:bg-pink-100 text-gray-700 hover:text-pink-800"
              >
                Pincéis
              </Link>
              <Link
                to="/category/sets"
                className="text-sm font-medium whitespace-nowrap px-3 py-2 rounded-full bg-white hover:bg-pink-100 text-gray-700 hover:text-pink-800"
              >
                Kits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
