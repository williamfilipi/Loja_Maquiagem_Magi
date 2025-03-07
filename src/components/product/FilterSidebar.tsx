import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFilterChange,
  isOpen,
  onClose,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  // Mock categories
  const categories = [
    { id: "face", name: "Rosto" },
    { id: "eyes", name: "Olhos" },
    { id: "lips", name: "Lábios" },
    { id: "cheeks", name: "Bochechas" },
    { id: "skincare", name: "Skincare" },
    { id: "brushes", name: "Pincéis" },
    { id: "sets", name: "Kits" },
  ];

  // Mock brands
  const brands = [
    { id: "brand1", name: "Glossier" },
    { id: "brand2", name: "Fenty Beauty" },
    { id: "brand3", name: "Rare Beauty" },
    { id: "brand4", name: "Charlotte Tilbury" },
    { id: "brand5", name: "MAC Cosmetics" },
    { id: "brand6", name: "NARS" },
  ];

  // Mock product types
  const productTypes = [
    { id: "foundation", name: "Base" },
    { id: "concealer", name: "Corretivo" },
    { id: "powder", name: "Pó" },
    { id: "mascara", name: "Máscara" },
    { id: "eyeliner", name: "Delineador" },
    { id: "lipstick", name: "Batom" },
    { id: "lipgloss", name: "Gloss" },
    { id: "blush", name: "Blush" },
    { id: "highlighter", name: "Iluminador" },
  ];

  return (
    <div className="h-full flex flex-col bg-white w-full md:w-64 p-4 border-r">
      <div className="flex items-center justify-between md:hidden mb-4">
        <h2 className="font-semibold text-lg">Filtros</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="overflow-y-auto flex-1 space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Faixa de Preço</h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[0, 200]}
              max={200}
              step={1}
              value={priceRange}
              onValueChange={(value) =>
                setPriceRange(value as [number, number])
              }
              className="mb-6"
            />
            <div className="flex items-center justify-between">
              <div className="w-20">
                <Label htmlFor="min-price" className="sr-only">
                  Preço Mínimo
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="h-8"
                />
              </div>
              <span className="text-gray-500">-</span>
              <div className="w-20">
                <Label htmlFor="max-price" className="sr-only">
                  Preço Máximo
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">Categorias</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={`category-${category.id}`} />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="text-sm cursor-pointer"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h3 className="font-medium mb-3">Marcas</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox id={`brand-${brand.id}`} />
                <Label
                  htmlFor={`brand-${brand.id}`}
                  className="text-sm cursor-pointer"
                >
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Types */}
        <div>
          <h3 className="font-medium mb-3">Tipos de Produto</h3>
          <div className="space-y-2">
            {productTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox id={`type-${type.id}`} />
                <Label
                  htmlFor={`type-${type.id}`}
                  className="text-sm cursor-pointer"
                >
                  {type.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t mt-6">
        <Button
          onClick={() => {
            onFilterChange();
            if (isOpen) onClose();
          }}
          className="w-full bg-pink-600 hover:bg-pink-700"
        >
          Aplicar Filtros
        </Button>
        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={() => {
            setPriceRange([0, 200]);
            onFilterChange();
            if (isOpen) onClose();
          }}
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
