import React, { useState } from "react";
import HeroSection from "./home/HeroSection";
import CategorySection from "./home/CategorySection";
import ProductGrid from "./product/ProductGrid";
import ProductCard from "./product/ProductCard";
import RecommendationSection from "./home/RecommendationSection";

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Mock search functionality
    const allProducts = [
      { id: "1", name: "Luminous Matte Foundation", category: "Foundation" },
      { id: "2", name: "Velvet Lip Stain", category: "Lips" },
      { id: "3", name: "Radiant Skin Illuminator", category: "Highlighter" },
      { id: "4", name: "Volumizing Mascara", category: "Eyes" },
      { id: "5", name: "Hydrating Face Primer", category: "Face" },
      { id: "6", name: "Creamy Blush Stick", category: "Cheeks" },
      { id: "7", name: "Precision Brow Pencil", category: "Brows" },
      { id: "8", name: "Matte Eyeshadow Palette", category: "Eyes" },
    ];

    const results = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    );

    setSearchResults(results);
    console.log("Search results:", results);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative">
        <HeroSection />
      </div>

      {/* Category Section */}
      <CategorySection />

      {/* Featured Products */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Produtos em Destaque
          </h2>
          <div className="max-w-full overflow-hidden">
            <div className="flex overflow-x-auto space-x-4 pb-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4 md:space-x-0 md:overflow-visible">
              <div className="flex-shrink-0 w-[280px]">
                <ProductCard
                  id="1"
                  name="Luminous Matte Foundation"
                  price={39.99}
                  rating={4.5}
                  image="https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&q=80"
                  category="Foundation"
                />
              </div>
              <div className="flex-shrink-0 w-[280px]">
                <ProductCard
                  id="2"
                  name="Velvet Lip Stain"
                  price={24.99}
                  rating={4.8}
                  image="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&q=80"
                  category="Lips"
                />
              </div>
              <div className="flex-shrink-0 w-[280px]">
                <ProductCard
                  id="3"
                  name="Radiant Skin Illuminator"
                  price={32.5}
                  rating={4.3}
                  image="https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=300&q=80"
                  category="Highlighter"
                />
              </div>
              <div className="flex-shrink-0 w-[280px]">
                <ProductCard
                  id="4"
                  name="Volumizing Mascara"
                  price={19.99}
                  rating={4.6}
                  image="https://images.unsplash.com/photo-1591360236480-9c6a4cb3a6de?w=300&q=80"
                  category="Eyes"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <RecommendationSection />

      {/* New Arrivals */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Novidades</h2>
          <div className="max-w-full overflow-hidden">
            <div className="flex overflow-x-auto space-x-4 pb-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4 md:space-x-0 md:overflow-visible">
              <div className="flex-shrink-0 w-[280px]">
                <ProductCard
                  id="5"
                  name="Hydrating Face Primer"
                  price={28.99}
                  rating={4.2}
                  image="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80"
                  category="Face"
                />
              </div>
              <div className="flex-shrink-0 w-[280px]">
                <ProductCard
                  id="6"
                  name="Creamy Blush Stick"
                  price={22.5}
                  rating={4.7}
                  image="https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=300&q=80"
                  category="Cheeks"
                />
              </div>
              <div className="flex-shrink-0 w-[280px]">
                <ProductCard
                  id="7"
                  name="Precision Brow Pencil"
                  price={18.99}
                  rating={4.4}
                  image="https://images.unsplash.com/photo-1625093742435-6fa192b6fb1a?w=300&q=80"
                  category="Brows"
                />
              </div>
              <div className="flex-shrink-0 w-[280px]">
                <ProductCard
                  id="8"
                  name="Matte Eyeshadow Palette"
                  price={45.0}
                  rating={4.9}
                  image="https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?w=300&q=80"
                  category="Eyes"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 p-8 md:p-12">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 rounded-full bg-white/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-40 w-40 rounded-full bg-white/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Promoção de Verão
                </h3>
                <p className="text-white/90 text-lg mb-4">
                  Até 40% de desconto em itens selecionados
                </p>
                <p className="text-white/80">
                  Oferta por tempo limitado. Enquanto durarem os estoques.
                </p>
              </div>
              <button className="bg-white text-purple-600 hover:bg-white/90 font-medium py-3 px-6 rounded-lg transition-colors">
                Ver Promoções
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
