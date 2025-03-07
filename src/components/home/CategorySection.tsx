import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryItemProps {
  name: string;
  image: string;
  slug: string;
  onClick?: () => void;
}

const CategoryItem = ({
  name = "Lipstick",
  image = "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&q=80",
  slug = "lipstick",
  onClick = () => console.log(`Category ${name} clicked`),
}: CategoryItemProps) => {
  return (
    <Link
      to={`/category/${slug}`}
      className="flex flex-col items-center space-y-2 cursor-pointer group"
    >
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-pink-500 transition-all duration-300 bg-white">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <span className="text-sm font-medium text-center group-hover:text-pink-600 transition-colors">
        {name}
      </span>
    </Link>
  );
};

interface CategorySectionProps {
  title?: string;
  categories?: CategoryItemProps[];
}

const CategorySection = ({
  title = "Navegue por Categoria",
  categories = [
    {
      name: "Rosto",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
      slug: "face",
    },
    {
      name: "Olhos",
      image:
        "https://images.unsplash.com/photo-1583241475880-083f84369ecd?w=200&q=80",
      slug: "eyes",
    },
    {
      name: "Lábios",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&q=80",
      slug: "lips",
    },
    {
      name: "Bochechas",
      image:
        "https://images.unsplash.com/photo-1631214503074-e7c58d0e7cba?w=200&q=80",
      slug: "cheeks",
    },
    {
      name: "Skincare",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&q=80",
      slug: "skincare",
    },
    {
      name: "Pincéis",
      image:
        "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=200&q=80",
      slug: "brushes",
    },
    {
      name: "Kits",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80",
      slug: "sets",
    },
  ],
}: CategorySectionProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-10 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-gray-600">
            Encontre os produtos perfeitos para cada parte do seu look
          </p>
        </div>

        <div className="flex items-center justify-end mb-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="rounded-full"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="rounded-full"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category, index) => (
            <div key={index} className="snap-start flex-shrink-0">
              <CategoryItem
                name={category.name}
                image={category.image}
                slug={category.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
