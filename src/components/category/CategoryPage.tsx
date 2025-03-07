import React from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../product/ProductGrid";

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { slug } = useParams<{ slug: string }>();

  // Map of category slugs to display names
  const categoryNames: Record<string, string> = {
    face: "Rosto",
    eyes: "Olhos",
    lips: "Lábios",
    cheeks: "Bochechas",
    skincare: "Skincare",
    brushes: "Pincéis",
    sets: "Kits",
  };

  // Mock products for each category
  const categoryProducts: Record<string, any[]> = {
    face: [
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
        id: "5",
        name: "Hydrating Face Primer",
        price: 28.99,
        rating: 4.2,
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&q=80",
        category: "Face",
      },
      {
        id: "9",
        name: "Poreless Blur Powder",
        price: 32.99,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=300&q=80",
        category: "Face",
      },
      {
        id: "13",
        name: "Skin Perfecting Tint",
        price: 26.5,
        rating: 4.3,
        image:
          "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&q=80",
        category: "Face",
      },
    ],
    eyes: [
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
        id: "8",
        name: "Matte Eyeshadow Palette",
        price: 45.0,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?w=300&q=80",
        category: "Eyes",
      },
      {
        id: "14",
        name: "Precision Liquid Eyeliner",
        price: 18.5,
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1591360236480-9c6a4cb3a6de?w=300&q=80",
        category: "Eyes",
      },
      {
        id: "15",
        name: "Shimmer Eyeshadow Stick",
        price: 22.99,
        rating: 4.2,
        image:
          "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?w=300&q=80",
        category: "Eyes",
      },
    ],
    lips: [
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
        id: "16",
        name: "Hydrating Lip Balm",
        price: 14.99,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&q=80",
        category: "Lips",
      },
      {
        id: "17",
        name: "Matte Liquid Lipstick",
        price: 22.99,
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&q=80",
        category: "Lips",
      },
      {
        id: "18",
        name: "Lip Plumping Gloss",
        price: 19.99,
        rating: 4.3,
        image:
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&q=80",
        category: "Lips",
      },
    ],
    cheeks: [
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
        id: "19",
        name: "Powder Blush Palette",
        price: 34.99,
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=300&q=80",
        category: "Cheeks",
      },
      {
        id: "20",
        name: "Bronzing Powder",
        price: 29.99,
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=300&q=80",
        category: "Cheeks",
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
    ],
    skincare: [
      {
        id: "21",
        name: "Hydrating Facial Cleanser",
        price: 24.99,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80",
        category: "Skincare",
      },
      {
        id: "22",
        name: "Vitamin C Serum",
        price: 42.99,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80",
        category: "Skincare",
      },
      {
        id: "23",
        name: "Overnight Recovery Cream",
        price: 38.5,
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80",
        category: "Skincare",
      },
      {
        id: "24",
        name: "Exfoliating Facial Scrub",
        price: 26.99,
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80",
        category: "Skincare",
      },
    ],
    brushes: [
      {
        id: "25",
        name: "Foundation Brush",
        price: 18.99,
        rating: 4.5,
        image:
          "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=300&q=80",
        category: "Brushes",
      },
      {
        id: "26",
        name: "Eyeshadow Brush Set",
        price: 32.99,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=300&q=80",
        category: "Brushes",
      },
      {
        id: "27",
        name: "Blush & Contour Brush",
        price: 22.5,
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=300&q=80",
        category: "Brushes",
      },
      {
        id: "28",
        name: "Precision Lip Brush",
        price: 14.99,
        rating: 4.3,
        image:
          "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=300&q=80",
        category: "Brushes",
      },
    ],
    sets: [
      {
        id: "29",
        name: "Complete Makeup Kit",
        price: 89.99,
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80",
        category: "Sets",
      },
      {
        id: "30",
        name: "Everyday Essentials Set",
        price: 65.99,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80",
        category: "Sets",
      },
      {
        id: "31",
        name: "Skincare Starter Kit",
        price: 72.5,
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80",
        category: "Sets",
      },
      {
        id: "32",
        name: "Travel Beauty Collection",
        price: 49.99,
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80",
        category: "Sets",
      },
    ],
  };

  // Get products for the current category
  const products = slug ? categoryProducts[slug] || [] : [];
  const categoryName = slug ? categoryNames[slug] || slug : "";

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
          <p className="text-gray-600">
            Explore nossa coleção de produtos para {categoryName.toLowerCase()}
          </p>
        </div>

        <ProductGrid
          products={products}
          title={`Produtos de ${categoryName}`}
          showFilters={true}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
