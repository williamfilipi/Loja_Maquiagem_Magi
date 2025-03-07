import React from "react";
import { X, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

interface FavoritesDrawerProps {
  children?: React.ReactNode;
}

const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ children }) => {
  const { favorites, favoritesCount, removeFromFavorites, addToCart, cart } =
    useCart();

  // We need to fetch the product details for each favorite
  // In a real app, this would come from your API or state management
  // For now, we'll use mock data
  const mockProducts = [
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
    {
      id: "5",
      name: "Hydrating Face Primer",
      price: 28.99,
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
      category: "Face",
    },
    {
      id: "6",
      name: "Creamy Blush Stick",
      price: 22.5,
      image:
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=300&q=80",
      category: "Cheeks",
    },
    {
      id: "7",
      name: "Precision Brow Pencil",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1625093742435-6fa192b6fb1a?w=300&q=80",
      category: "Brows",
    },
    {
      id: "8",
      name: "Matte Eyeshadow Palette",
      price: 45.0,
      image:
        "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?w=300&q=80",
      category: "Eyes",
    },
  ];

  // Filter products to only show favorites
  const favoriteProducts = mockProducts.filter((product) =>
    favorites.includes(product.id),
  );

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-pink-600 text-white text-xs">
                {favoritesCount}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">
              Seus Favoritos ({favoritesCount})
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Heart className="h-12 w-12 text-gray-300 mb-2" />
              <h3 className="font-medium text-lg mb-1">
                Sua lista de favoritos está vazia
              </h3>
              <p className="text-gray-500 mb-4">
                Salve seus produtos favoritos para encontrá-los facilmente
                depois.
              </p>
              <SheetClose asChild>
                <Button>Explorar Produtos</Button>
              </SheetClose>
            </div>
          ) : (
            <ul className="space-y-4">
              {favoriteProducts.map((product) => (
                <li key={product.id} className="flex border-b pb-4">
                  <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {product.name}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-gray-400 hover:text-red-500"
                        onClick={() => removeFromFavorites(product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>
                      <Button
                        variant={isInCart(product.id) ? "outline" : "default"}
                        size="sm"
                        className={
                          isInCart(product.id)
                            ? ""
                            : "bg-pink-600 hover:bg-pink-700"
                        }
                        onClick={() => handleAddToCart(product)}
                      >
                        {isInCart(product.id) ? (
                          "No Carrinho"
                        ) : (
                          <>
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Adicionar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {favoriteProducts.length > 0 && (
          <SheetFooter className="border-t pt-4">
            <div className="w-full space-y-4">
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Continuar Comprando
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default FavoritesDrawer;
