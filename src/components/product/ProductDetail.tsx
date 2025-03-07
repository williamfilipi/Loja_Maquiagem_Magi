import React, { useState } from "react";
import {
  Star,
  Heart,
  Share2,
  ShoppingBag,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";

interface ProductDetailProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount?: number;
  description?: string;
  features?: string[];
  ingredients?: string;
  usage?: string;
  images: string[];
  category: string;
  inStock?: boolean;
  variants?: {
    type: string;
    options: string[];
  }[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  id,
  name,
  price,
  rating = 4.5,
  reviewCount = 124,
  description = "A lightweight, buildable foundation that provides medium coverage with a natural matte finish. Perfect for all skin types, especially those with oily or combination skin.",
  features = [
    "Lightweight, buildable formula",
    "Medium coverage with a natural matte finish",
    "Oil-free and non-comedogenic",
    "Long-wearing, up to 12 hours",
    "Available in 40 shades",
  ],
  ingredients = "Water, Cyclopentasiloxane, Dimethicone, Glycerin, PEG-10 Dimethicone, Talc, Silica, Phenyl Trimethicone, Magnesium Sulfate, Acrylates/Dimethicone Copolymer, Nylon-12, Boron Nitride, Ethylhexylglycerin, Tocopheryl Acetate, Caprylyl Glycol, Sodium Dehydroacetate, Phenoxyethanol, [+/- May Contain: CI 77891 (Titanium Dioxide), CI 77491, CI 77492, CI 77499 (Iron Oxides)]",
  usage = "Apply to clean, moisturized skin using a foundation brush, beauty sponge, or fingertips. Start at the center of the face and blend outward. Layer for additional coverage as needed.",
  images = [
    "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&q=80",
    "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=600&q=80",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
  ],
  category,
  inStock = true,
  variants = [
    {
      type: "Shade",
      options: ["Fair", "Light", "Medium", "Tan", "Deep"],
    },
    {
      type: "Size",
      options: ["1 oz", "1.7 oz"],
    },
  ],
}) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const {
    addToCart,
    cart,
    removeFromCart,
    updateQuantity: updateCartQuantity,
  } = useCart();

  const cartItem = cart.find((item) => item.id === id);
  const isInCart = !!cartItem;

  // Initialize selected variants
  React.useEffect(() => {
    const initialVariants: Record<string, string> = {};
    variants.forEach((variant) => {
      initialVariants[variant.type] = variant.options[0];
    });
    setSelectedVariants(initialVariants);
  }, [variants]);

  const handleVariantChange = (type: string, option: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [type]: option,
    }));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (isInCart) {
      // If already in cart, update quantity
      updateCartQuantity(id, cartItem.quantity + quantity);
    } else {
      // Add new item to cart
      addToCart({
        id,
        name,
        price,
        image: images[0],
        category,
      });
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
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
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={mainImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${mainImage === image ? "border-pink-500" : "border-transparent"}`}
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image}
                  alt={`${name} - view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {category}
            </Badge>
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {renderStars()}
                <span className="ml-2 text-sm text-gray-600">
                  {rating} ({reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="text-2xl font-bold">${price.toFixed(2)}</div>

          <p className="text-gray-700">{description}</p>

          {/* Variants */}
          {variants.map((variant) => (
            <div key={variant.type} className="space-y-2">
              <h3 className="font-medium">{variant.type}</h3>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option) => (
                  <Button
                    key={option}
                    variant={
                      selectedVariants[variant.type] === option
                        ? "default"
                        : "outline"
                    }
                    className={
                      selectedVariants[variant.type] === option
                        ? "bg-pink-600 hover:bg-pink-700"
                        : ""
                    }
                    onClick={() => handleVariantChange(variant.type, option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="space-y-2">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                {inStock ? (
                  <span className="text-green-600 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> In Stock
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
              size="lg"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              {isInCart ? "Add More to Cart" : "Add to Cart"}
            </Button>
            {isInCart && (
              <Button
                variant="outline"
                className="flex-1"
                size="lg"
                onClick={handleRemoveFromCart}
              >
                Remove from Cart
              </Button>
            )}
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-4">
            <h3 className="text-lg font-medium mb-4">Product Features</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="ingredients" className="py-4">
            <h3 className="text-lg font-medium mb-4">Ingredients</h3>
            <p className="text-gray-700 leading-relaxed">{ingredients}</p>
          </TabsContent>
          <TabsContent value="how-to-use" className="py-4">
            <h3 className="text-lg font-medium mb-4">How to Use</h3>
            <p className="text-gray-700 leading-relaxed">{usage}</p>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
            <p className="text-gray-500">Reviews coming soon...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
