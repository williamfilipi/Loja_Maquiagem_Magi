import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product/ProductCard";

interface RecommendationSectionProps {
  title?: string;
  subtitle?: string;
  products?: Array<{
    id: string;
    name: string;
    price: number;
    rating: number;
    image: string;
    category: string;
  }>;
  onViewAll?: () => void;
  onProductAdd?: (productId: string) => void;
}

const RecommendationSection = ({
  title = "Recomendado para Você",
  subtitle = "Recomendações baseadas em IA com base no seu histórico de navegação",
  products = [
    {
      id: "1",
      name: "Luminous Matte Foundation",
      price: 39.99,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&q=80",
      category: "Foundation",
    },
    {
      id: "2",
      name: "Velvet Lip Stain",
      price: 24.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&q=80",
      category: "Lips",
    },
    {
      id: "3",
      name: "Radiance Highlighting Palette",
      price: 32.5,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1596704017254-9a09c78c8a35?w=300&q=80",
      category: "Face",
    },
    {
      id: "4",
      name: "Volumizing Mascara",
      price: 19.99,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1631214503074-49bd9f890b9a?w=300&q=80",
      category: "Eyes",
    },
  ],
  onViewAll = () => console.log("View all recommendations clicked"),
  onProductAdd = (productId) =>
    console.log(`Product ${productId} added to cart`),
}: RecommendationSectionProps) => {
  return (
    <section className="w-full py-12 px-4 md:px-8 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {title}
              </h2>
            </div>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <Button
            onClick={onViewAll}
            variant="ghost"
            className="mt-4 md:mt-0 flex items-center gap-1 text-purple-700 hover:text-purple-800 hover:bg-purple-100"
          >
            Ver Todos <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex overflow-x-auto space-x-4 pb-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4 md:space-x-0 md:overflow-visible">
          {products.map((product) => (
            <div className="flex-shrink-0 w-[280px]">
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                rating={product.rating}
                image={product.image}
                category={product.category}
                onQuickAdd={() => onProductAdd(product.id)}
              />
            </div>
          ))}
        </div>

        <Card className="mt-10 bg-white/80 backdrop-blur border border-purple-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Obtenha recomendações personalizadas
                </h3>
                <p className="text-gray-600">
                  Crie uma conta para receber sugestões de produtos baseadas em
                  IA adaptadas às suas preferências.
                </p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Cadastre-se Agora
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RecommendationSection;
