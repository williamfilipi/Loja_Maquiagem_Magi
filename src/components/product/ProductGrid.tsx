import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
}

const ProductGrid = ({
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
      name: "Radiant Skin Illuminator",
      price: 32.5,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=300&q=80",
      category: "Highlighter",
    },
    {
      id: "4",
      name: "Volumizing Mascara",
      price: 19.99,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1591360236480-9c6a4cb3a6de?w=300&q=80",
      category: "Eyes",
    },
    {
      id: "5",
      name: "Hydrating Face Primer",
      price: 28.99,
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
      category: "Face",
    },
    {
      id: "6",
      name: "Creamy Blush Stick",
      price: 22.5,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=300&q=80",
      category: "Cheeks",
    },
    {
      id: "7",
      name: "Precision Brow Pencil",
      price: 18.99,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1625093742435-6fa192b6fb1a?w=300&q=80",
      category: "Brows",
    },
    {
      id: "8",
      name: "Matte Eyeshadow Palette",
      price: 45.0,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?w=300&q=80",
      category: "Eyes",
    },
  ],
  title = "Todos os Produtos",
  subtitle,
  showFilters = true,
}: ProductGridProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    // Reset to first page when products change
    setCurrentPage(1);
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    // Sort products based on selected option
    const sortedProducts = [...filteredProducts];

    switch (sortOption) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      // "featured" is default, no sorting needed
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  }, [sortOption]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleFilterChange = () => {
    // This would normally filter products based on selected filters
    // For now, we're just using the mock data
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of product grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Mobile Filter Button */}
        {showFilters && (
          <div className="md:hidden p-4 border-b border-gray-200">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </Button>
          </div>
        )}

        {/* Sidebar Filters */}
        {showFilters && (
          <div
            className={cn(
              "fixed inset-0 z-50 bg-white md:static md:z-0 md:bg-transparent transition-transform duration-300 md:translate-x-0",
              isMobileFilterOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <FilterSidebar
              onFilterChange={handleFilterChange}
              isOpen={isMobileFilterOpen}
              onClose={() => setIsMobileFilterOpen(false)}
            />
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1 p-4">
          <div className="flex flex-col space-y-4">
            {/* Title and Sort Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                {(title || subtitle) && (
                  <div className="mb-4">
                    {title && <h1 className="text-2xl font-bold">{title}</h1>}
                    {subtitle && (
                      <p className="text-gray-600 mt-1">{subtitle}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4">
                <div className="flex items-center gap-2">
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Destaque</SelectItem>
                      <SelectItem value="price-low">
                        Preço: Menor para Maior
                      </SelectItem>
                      <SelectItem value="price-high">
                        Preço: Maior para Menor
                      </SelectItem>
                      <SelectItem value="rating">Melhor Avaliados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="hidden md:flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-none",
                      viewMode === "grid" && "bg-gray-100",
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-none",
                      viewMode === "list" && "bg-gray-100",
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Count */}
            <div className="text-sm text-gray-500">
              Mostrando {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, filteredProducts.length)} de{" "}
              {filteredProducts.length} produtos
            </div>

            {/* Products */}
            {currentProducts.length > 0 ? (
              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1",
                )}
              >
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className={cn(
                      viewMode === "list" &&
                        "flex flex-col md:flex-row gap-4 border rounded-lg p-4",
                    )}
                  >
                    {viewMode === "grid" ? (
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        image={product.image}
                        category={product.category}
                        onQuickAdd={() =>
                          console.log(`Added ${product.name} to cart`)
                        }
                      />
                    ) : (
                      <div className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="md:w-1/3 h-[200px] overflow-hidden rounded-md">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-medium">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {product.category}
                            </p>
                            <div className="flex items-center mt-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-xs text-gray-600 ml-1">
                                {product.rating}
                              </span>
                            </div>
                            <p className="mt-4 text-sm text-gray-600">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua.
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-lg font-semibold">
                              R$ {product.price.toFixed(2).replace(".", ",")}
                            </span>
                            <Button
                              onClick={() =>
                                console.log(`Added ${product.name} to cart`)
                              }
                              className="bg-pink-600 hover:bg-pink-700"
                            >
                              Adicionar ao Carrinho
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <SlidersHorizontal className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium">
                  Nenhum produto encontrado
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md">
                  Tente ajustar seus filtros ou critérios de busca para
                  encontrar o que você está procurando.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="h-8 w-8"
                  >
                    <span className="sr-only">Página Anterior</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </Button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    // Show limited page numbers with ellipsis
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={pageNumber}
                          variant={
                            currentPage === pageNumber ? "default" : "outline"
                          }
                          size="icon"
                          onClick={() => handlePageChange(pageNumber)}
                          className={`h-8 w-8 ${currentPage === pageNumber ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                        >
                          {pageNumber}
                        </Button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span key={pageNumber} className="px-1">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="h-8 w-8"
                  >
                    <span className="sr-only">Próxima Página</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
