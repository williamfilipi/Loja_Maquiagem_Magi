import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard: React.FC = () => {
  // Mock data for dashboard
  const stats = [
    {
      title: "Receita Total",
      value: "R$ 24.389,50",
      change: "+12,5%",
      trend: "up",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Pedidos",
      value: "342",
      change: "+8,2%",
      trend: "up",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Produtos",
      value: "128",
      change: "+3,1%",
      trend: "up",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Clientes",
      value: "1.205",
      change: "+18,7%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  const lowStockProducts = [
    {
      id: "5",
      name: "Hydrating Face Primer",
      sku: "PRM-HF-005",
      stock: 12,
      threshold: 15,
    },
    {
      id: "9",
      name: "Liquid Eyeliner Pen",
      sku: "EYE-LE-009",
      stock: 8,
      threshold: 10,
    },
    {
      id: "12",
      name: "Vitamin C Serum",
      sku: "SKC-VC-012",
      stock: 5,
      threshold: 10,
    },
  ];

  const recentOrders = [
    {
      id: "ORD-7652",
      customer: "Emma Johnson",
      date: "2023-06-15",
      status: "completed",
      total: "R$ 128,50",
    },
    {
      id: "ORD-7651",
      customer: "Michael Smith",
      date: "2023-06-15",
      status: "processing",
      total: "R$ 74,99",
    },
    {
      id: "ORD-7650",
      customer: "Sophia Williams",
      date: "2023-06-14",
      status: "completed",
      total: "R$ 253,25",
    },
    {
      id: "ORD-7649",
      customer: "James Brown",
      date: "2023-06-14",
      status: "shipped",
      total: "R$ 96,75",
    },
    {
      id: "ORD-7648",
      customer: "Olivia Davis",
      date: "2023-06-13",
      status: "cancelled",
      total: "R$ 189,30",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      completed: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status === "completed"
          ? "Concluído"
          : status === "processing"
            ? "Processando"
            : status === "shipped"
              ? "Enviado"
              : status === "cancelled"
                ? "Cancelado"
                : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Painel</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/10 p-2 rounded-full">
                  {stat.icon}
                </div>
                {stat.trend === "up" ? (
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 text-sm">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    {stat.change}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pedidos Recentes</CardTitle>
            <Button variant="outline" size="sm">
              Ver Todos
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 border-b">
                    <th className="pb-2 font-medium">ID do Pedido</th>
                    <th className="pb-2 font-medium">Cliente</th>
                    <th className="pb-2 font-medium">Data</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-3 text-sm font-medium">{order.id}</td>
                      <td className="py-3 text-sm">{order.customer}</td>
                      <td className="py-3 text-sm">{order.date}</td>
                      <td className="py-3 text-sm">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="py-3 text-sm text-right">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Alerta de Estoque Baixo</CardTitle>
            <Button variant="outline" size="sm">
              Ver Todos
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sku}</p>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm font-medium">
                      {product.stock} / {product.threshold}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Analytics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Análise de Vendas</CardTitle>
            <Tabs defaultValue="week">
              <TabsList>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mês</TabsTrigger>
                <TabsTrigger value="year">Ano</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <BarChart3 className="h-40 w-40 text-gray-300" />
            <p className="text-gray-500 ml-4">
              Gráfico de análise de vendas seria exibido aqui
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
