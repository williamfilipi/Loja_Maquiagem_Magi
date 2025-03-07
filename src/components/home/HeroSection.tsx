import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCta?: string;
  secondaryCta?: string;
  backgroundImage?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Descubra Sua Maquiagem Perfeita",
  subtitle = "Explore nossa coleção de produtos de beleza premium projetados para todos os tons e tipos de pele.",
  primaryCta = "Comprar Agora",
  secondaryCta = "Ver Coleções",
  backgroundImage = "https://images.unsplash.com/photo-1596704017254-9a89b0a9f37c?w=1512&q=80",
  onPrimaryClick = () => console.log("Primary CTA clicked"),
  onSecondaryClick = () => console.log("Secondary CTA clicked"),
}) => {
  return (
    <div className="relative w-full h-[500px] bg-gray-100 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Header 1
        </h1>
        <div className="max-w-xl">
          {/* Animated Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white mb-6 animate-fade-in">
            <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
            Nova Coleção Disponível
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            {title}
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onPrimaryClick}
              size="lg"
              className="bg-pink-600 hover:bg-pink-700 text-white font-medium"
            >
              {primaryCta}
            </Button>
            <Button
              onClick={onSecondaryClick}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/20 backdrop-blur-sm"
            >
              {secondaryCta}
            </Button>
          </div>

          {/* Featured Brands */}
          <div className="mt-12 hidden md:block">
            <p className="text-white/70 text-sm mb-3">Marcas em Destaque</p>
            <div className="flex items-center space-x-6">
              {[1, 2, 3, 4].map((brand) => (
                <div
                  key={brand}
                  className="bg-white/10 backdrop-blur-sm p-2 rounded-md h-10 w-20 flex items-center justify-center"
                >
                  <div className="text-white font-medium text-xs">
                    Brand {brand}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-t from-pink-500/20 to-transparent rounded-tl-full" />
    </div>
  );
};

export default HeroSection;
