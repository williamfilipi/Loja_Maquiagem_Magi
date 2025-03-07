import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Copy,
  Archive,
  Trash2,
  Eye,
  Download,
  Upload,
} from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Luminous Matte Foundation",
    sku: "FDN-LM-001",
    category: "Foundation",
    price: 39.99,
    stock: 125,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=100&q=80",
  },
  {
    id: "2",
    name: "Velvet Lip Stain",
    sku: "LIP-VL-002",
    category: "Lips",
    price: 24.99,
    stock: 89,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&q=80",
  },
  {
    id: "3",
    name: "Radiant Skin Illuminator",
    sku: "HLT-RS-003",
    category: "Highlighter",
    price: 32.5,
    stock: 54,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=100&q=80",
  },
  {
    id: "4",
    name: "Volumizing Mascara",
    sku: "EYE-VM-004",
    category: "Eyes",
    price: 19.99,
    stock: 0,
    status: "out_of_stock",
    image:
      "https://images.unsplash.com/photo-1591360236480-9c6a4cb3a6de?w=100&q=80",
  },
  {
    id: "5",
    name: "Hydrating Face Primer",
    sku: "PRM-HF-005",
    category: "Face",
    price: 28.99,
    stock: 12,
    status: "low_stock",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80",
  },
  {
    id: "6",
    name: "Creamy Blush Stick",
    sku: "BLH-CB-006",
    category: "Cheeks",
    price: 22.5,
    stock: 76,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=100&q=80",
  },
  {
    id: "7",
    name: "Precision Brow Pencil",
    sku: "BRW-PB-007",
    category: "Brows",
    price: 18.99,
    stock: 42,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb1a?w=100&q=80",
  },
  {
    id: "8",
    name: "Matte Eyeshadow Palette",
    sku: "EYE-ME-008",
    category: "Eyes",
    price: 45.0,
    stock: 0,
    status: "archived",
    image:
      "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?w=100&q=80",
  },
];

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(mockProducts);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">Sem Estoque</Badge>;
      case "low_stock":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Estoque Baixo</Badge>
        );
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">Arquivado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleArchive = (id: string) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === "archived" ? "active" : "archived",
            }
          : product,
      ),
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Link to="/admin/products/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagem</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          window.open(`/admin/products/${product.id}`, "_blank")
                        }
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/admin/products/${product.id}`)
                        }
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const newProduct = {
                            ...product,
                            id: `${product.id}_copy`,
                            name: `${product.name} (Copy)`,
                          };
                          setProducts([...products, newProduct]);
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleArchive(product.id)}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        {product.status === "archived"
                          ? "Desarquivar"
                          : "Arquivar"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
