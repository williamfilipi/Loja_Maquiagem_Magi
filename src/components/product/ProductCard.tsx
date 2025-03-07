import React, { useState } from "react";
import {
  Star,
  Check,
  ShoppingCart,
  Heart,
  Clock,
  Plus,
  Minus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  rating?: number;
  image?: string;
  category?: string;
  onQuickAdd?: () => void;
}

const ProductCard = ({
  id = "1",
  name = "Luminous Matte Foundation",
  price = 39.99,
  rating = 4.5,
  image = "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&q=80",
  category = "Foundation",
  onQuickAdd = () => {},
}: ProductCardProps) => {
  const {
    addToCart,
    cart,
    removeFromCart,
    updateQuantity,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useCart();
  const isFavorite = favorites.includes(id);
  const [saveForLater, setSaveForLater] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isQuantityDialogOpen, setIsQuantityDialogOpen] = useState(false);

  const isInCart = cart.some((item) => item.id === id);
  const cartItem = cart.find((item) => item.id === id);

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      setIsQuantityDialogOpen(true);
    }
  };

  const confirmAddToCart = () => {
    addToCart({ id, name, price, image, category });
    if (cartItem) {
      updateQuantity(id, quantity);
    } else {
      updateQuantity(id, quantity);
    }
    onQuickAdd();
    setIsQuantityDialogOpen(false);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  const toggleSaveForLater = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaveForLater(!saveForLater);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-4 h-4 text-yellow-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <>
      <Card className="w-full h-[400px] overflow-hidden flex flex-col bg-white hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-[220px] overflow-hidden group">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-black"
          >
            {category}
          </Badge>
        </div>

        <CardHeader className="p-4 pb-0">
          <h3 className="font-medium text-base line-clamp-2">{name}</h3>
        </CardHeader>

        <CardContent className="p-4 pt-2 flex-grow">
          <div className="flex items-center space-x-1">
            {renderStars()}
            <span className="text-xs text-gray-600 ml-1">{rating}</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="font-semibold">
            R$ {price.toFixed(2).replace(".", ",")}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFavorite}
              className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-700"}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSaveForLater}
              className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <Clock
                className={`h-4 w-4 ${saveForLater ? "fill-blue-500 text-blue-500" : "text-gray-700"}`}
              />
            </Button>
            <Button
              variant={isInCart ? "default" : "outline"}
              size="sm"
              onClick={handleAddToCart}
              className={`text-xs ${isInCart ? "bg-pink-600 hover:bg-pink-700" : ""}`}
            >
              {isInCart ? (
                "Remover"
              ) : (
                <>
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Adicionar
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Quantity Selection Dialog */}
      <Dialog
        open={isQuantityDialogOpen}
        onOpenChange={setIsQuantityDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Selecionar Quantidade</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="flex items-center justify-center mb-4">
              <img
                src={image}
                alt={name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <h4 className="font-medium">{name}</h4>
                <p className="text-sm text-gray-500">{category}</p>
                <p className="font-semibold mt-1">
                  R$ {price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsQuantityDialogOpen(false)}
              className="sm:w-full"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmAddToCart}
              className="sm:w-full bg-pink-600 hover:bg-pink-700"
            >
              Adicionar ao Carrinho
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
