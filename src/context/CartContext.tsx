import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  favorites: string[];
  favoritesCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  getFavoriteProducts: () => Product[];
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock products for favorites
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Luminous Matte Foundation",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&q=80",
      category: "Foundation",
    },
    {
      id: "2",
      name: "Velvet Lip Stain",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&q=80",
      category: "Lips",
    },
    {
      id: "3",
      name: "Radiant Skin Illuminator",
      price: 32.5,
      image:
        "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=300&q=80",
      category: "Highlighter",
    },
    {
      id: "4",
      name: "Volumizing Mascara",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1591360236480-9c6a4cb3a6de?w=300&q=80",
      category: "Eyes",
    },
  ];

  // Load cart and favorites from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedFavorites = localStorage.getItem("favorites");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }
  }, []);

  // Save cart and favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const favoritesCount = favorites.length;

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const addToFavorites = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((itemId) => itemId !== id));
  };

  const getFavoriteProducts = () => {
    return mockProducts.filter((product) => favorites.includes(product.id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        favorites,
        favoritesCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToFavorites,
        removeFromFavorites,
        getFavoriteProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
