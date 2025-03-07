import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Package,
  Tags,
  Truck,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const navItems = [
    {
      name: "Painel",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Produtos",
      href: "/admin/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Categorias",
      href: "/admin/categories",
      icon: <Tags className="h-5 w-5" />,
    },
    {
      name: "Pedidos",
      href: "/admin/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "Clientes",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Estoque",
      href: "/admin/inventory",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Envios",
      href: "/admin/shipping",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      name: "Análises",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Avaliações",
      href: "/admin/reviews",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Configurações",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-white"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6">
          <Link to="/admin" className="flex items-center">
            <span className="text-2xl font-bold text-pink-600">Magi Store</span>
            <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">
              Admin
            </span>
          </Link>
          <Link to="/">
            <Button
              variant="ghost"
              className="w-full mt-4 justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sair
            </Button>
          </Link>
        </div>

        <nav className="mt-2">
          <ul className="space-y-1 px-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors",
                    item.href === "/admin/products" &&
                      "bg-pink-50 text-pink-600",
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 flex-1 p-4 md:p-6 pt-16 md:pt-6">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default AdminLayout;
