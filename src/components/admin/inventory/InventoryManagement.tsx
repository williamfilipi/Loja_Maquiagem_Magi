import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Search, Filter, ArrowUpDown, Edit } from "lucide-react";

// Mock inventory data
const mockInventory = [
  {
    id: "1",
    name: "Luminous Matte Foundation",
    sku: "FDN-LM-001",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=100&q=80",
    currentStock: 125,
    threshold: 20,
    status: "normal",
  },
  {
    id: "2",
    name: "Velvet Lip Stain",
    sku: "LIP-VL-002",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&q=80",
    currentStock: 89,
    threshold: 15,
    status: "normal",
  },
  {
    id: "3",
    name: "Radiant Skin Illuminator",
    sku: "HLT-RS-003",
    image:
      "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=100&q=80",
    currentStock: 54,
    threshold: 25,
    status: "normal",
  },
  {
    id: "4",
    name: "Volumizing Mascara",
    sku: "EYE-VM-004",
    image:
      "https://images.unsplash.com/photo-1591360236480-9c6a4cb3a6de?w=100&q=80",
    currentStock: 0,
    threshold: 10,
    status: "out_of_stock",
  },
  {
    id: "5",
    name: "Hydrating Face Primer",
    sku: "PRM-HF-005",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80",
    currentStock: 12,
    threshold: 15,
    status: "low_stock",
  },
  {
    id: "6",
    name: "Creamy Blush Stick",
    sku: "BLH-CB-006",
    image:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=100&q=80",
    currentStock: 8,
    threshold: 10,
    status: "low_stock",
  },
  {
    id: "7",
    name: "Precision Brow Pencil",
    sku: "BRW-PB-007",
    image:
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb1a?w=100&q=80",
    currentStock: 42,
    threshold: 20,
    status: "normal",
  },
  {
    id: "8",
    name: "Matte Eyeshadow Palette",
    sku: "EYE-ME-008",
    image:
      "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?w=100&q=80",
    currentStock: 3,
    threshold: 5,
    status: "low_stock",
  },
];

const InventoryManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState(mockInventory);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  // Handle sorting
  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const sortedInventory = React.useMemo(() => {
    let sortableItems = [...inventory];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [inventory, sortConfig]);

  // Filter inventory based on search term
  const filteredInventory = sortedInventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Update stock level
  const updateStock = (id: string, newStock: number) => {
    setInventory(
      inventory.map((item) => {
        if (item.id === id) {
          const status =
            newStock === 0
              ? "out_of_stock"
              : newStock < item.threshold
                ? "low_stock"
                : "normal";
          return { ...item, currentStock: newStock, status };
        }
        return item;
      }),
    );
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
      case "low_stock":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Estoque Baixo</Badge>
        );
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">Sem Estoque</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Gerenciamento de Estoque</h1>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            Ajustar Níveis de Estoque
          </Button>
          <Button size="sm">Gerar Relatório de Estoque</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar estoque..."
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

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagem</TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  Produto
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => requestSort("currentStock")}
                >
                  Estoque Atual
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Limite</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      value={item.currentStock}
                      onChange={(e) =>
                        updateStock(item.id, parseInt(e.target.value) || 0)
                      }
                      className="w-20 mr-2"
                    />
                    {item.status === "low_stock" && (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    {item.status === "out_of_stock" && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{item.threshold}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Stock Alert Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
        <h2 className="text-lg font-medium flex items-center text-amber-800">
          <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
          Alertas de Estoque Baixo
        </h2>
        <p className="text-amber-700 mt-1 mb-3">
          Os seguintes produtos estão abaixo do limite mínimo de estoque e
          precisam ser reabastecidos.
        </p>
        <div className="space-y-2">
          {inventory
            .filter(
              (item) =>
                item.status === "low_stock" || item.status === "out_of_stock",
            )
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-3 rounded-md border border-amber-200"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-md object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.sku}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-3">
                    {item.currentStock} / {item.threshold}
                  </span>
                  <Button size="sm" variant="outline">
                    Reabastecer
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
