import React, { useState } from "react";
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
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock order data
const mockOrders = [
  {
    id: "ORD-7652",
    customer: {
      name: "Emma Johnson",
      email: "emma.j@example.com",
      phone: "+1 (555) 123-4567",
    },
    date: "2023-06-15",
    status: "completed",
    total: 128.5,
    items: [
      {
        id: "1",
        name: "Luminous Matte Foundation",
        quantity: 1,
        price: 39.99,
      },
      {
        id: "6",
        name: "Creamy Blush Stick",
        quantity: 2,
        price: 22.5,
      },
      {
        id: "7",
        name: "Precision Brow Pencil",
        quantity: 1,
        price: 18.99,
      },
    ],
    shipping: {
      method: "Standard Shipping",
      cost: 4.99,
      address: "123 Main St, Anytown, CA 12345",
    },
    payment: {
      method: "Credit Card",
      last4: "4242",
    },
  },
  {
    id: "ORD-7651",
    customer: {
      name: "Michael Smith",
      email: "michael.s@example.com",
      phone: "+1 (555) 987-6543",
    },
    date: "2023-06-15",
    status: "processing",
    total: 74.99,
    items: [
      {
        id: "4",
        name: "Volumizing Mascara",
        quantity: 1,
        price: 19.99,
      },
      {
        id: "5",
        name: "Hydrating Face Primer",
        quantity: 1,
        price: 28.99,
      },
      {
        id: "2",
        name: "Velvet Lip Stain",
        quantity: 1,
        price: 24.99,
      },
    ],
    shipping: {
      method: "Express Shipping",
      cost: 9.99,
      address: "456 Oak Ave, Somewhere, NY 54321",
    },
    payment: {
      method: "PayPal",
      email: "michael.s@example.com",
    },
  },
  {
    id: "ORD-7650",
    customer: {
      name: "Sophia Williams",
      email: "sophia.w@example.com",
      phone: "+1 (555) 456-7890",
    },
    date: "2023-06-14",
    status: "shipped",
    total: 253.25,
    items: [
      {
        id: "8",
        name: "Matte Eyeshadow Palette",
        quantity: 2,
        price: 45.0,
      },
      {
        id: "3",
        name: "Radiant Skin Illuminator",
        quantity: 3,
        price: 32.5,
      },
      {
        id: "6",
        name: "Creamy Blush Stick",
        quantity: 2,
        price: 22.5,
      },
    ],
    shipping: {
      method: "Standard Shipping",
      cost: 4.99,
      address: "789 Pine Ln, Elsewhere, TX 67890",
    },
    payment: {
      method: "Credit Card",
      last4: "1234",
    },
  },
  {
    id: "ORD-7649",
    customer: {
      name: "James Brown",
      email: "james.b@example.com",
      phone: "+1 (555) 789-0123",
    },
    date: "2023-06-14",
    status: "shipped",
    total: 96.75,
    items: [
      {
        id: "2",
        name: "Velvet Lip Stain",
        quantity: 2,
        price: 24.99,
      },
      {
        id: "7",
        name: "Precision Brow Pencil",
        quantity: 1,
        price: 18.99,
      },
      {
        id: "4",
        name: "Volumizing Mascara",
        quantity: 1,
        price: 19.99,
      },
    ],
    shipping: {
      method: "Express Shipping",
      cost: 9.99,
      address: "321 Elm St, Nowhere, WA 13579",
    },
    payment: {
      method: "Credit Card",
      last4: "5678",
    },
  },
  {
    id: "ORD-7648",
    customer: {
      name: "Olivia Davis",
      email: "olivia.d@example.com",
      phone: "+1 (555) 321-6547",
    },
    date: "2023-06-13",
    status: "cancelled",
    total: 189.3,
    items: [
      {
        id: "1",
        name: "Luminous Matte Foundation",
        quantity: 2,
        price: 39.99,
      },
      {
        id: "3",
        name: "Radiant Skin Illuminator",
        quantity: 2,
        price: 32.5,
      },
      {
        id: "5",
        name: "Hydrating Face Primer",
        quantity: 1,
        price: 28.99,
      },
    ],
    shipping: {
      method: "Standard Shipping",
      cost: 4.99,
      address: "654 Maple Dr, Anywhere, FL 97531",
    },
    payment: {
      method: "Credit Card",
      last4: "9012",
    },
  },
];

const OrderManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      completed: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={statusClasses[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  // View order details
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "all" || order.status === statusFilter) &&
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            Export Orders
          </Button>
          <Button size="sm">Generate Report</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search orders..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">
                      {order.customer.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {order.status === "processing" && (
                        <DropdownMenuItem
                          onClick={() => updateOrderStatus(order.id, "shipped")}
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Mark as Shipped
                        </DropdownMenuItem>
                      )}
                      {order.status === "shipped" && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "completed")
                          }
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Completed
                        </DropdownMenuItem>
                      )}
                      {(order.status === "processing" ||
                        order.status === "shipped") && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "cancelled")
                          }
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Order
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowOrderDetails(false)}
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Order Information
                  </h3>
                  <p className="font-medium">{selectedOrder.id}</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      {selectedOrder.date}
                    </span>
                  </div>
                  <div className="mt-2">
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Customer Information
                  </h3>
                  <p className="font-medium">{selectedOrder.customer.name}</p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.customer.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.customer.phone}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Order Items
                </h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-right font-medium"
                        >
                          Subtotal
                        </TableCell>
                        <TableCell className="text-right">
                          $
                          {selectedOrder.items
                            .reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0,
                            )
                            .toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-right font-medium"
                        >
                          Shipping
                        </TableCell>
                        <TableCell className="text-right">
                          ${selectedOrder.shipping.cost.toFixed(2)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-right font-medium"
                        >
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          ${selectedOrder.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Shipping Information
                  </h3>
                  <p className="font-medium">{selectedOrder.shipping.method}</p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {selectedOrder.shipping.address}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Payment Information
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Badge className="bg-blue-100 text-blue-800 mr-2">
                        {selectedOrder.payment.method}
                      </Badge>
                      {selectedOrder.payment.method === "Credit Card" && (
                        <Badge variant="outline">
                          **** **** **** {selectedOrder.payment.last4}
                        </Badge>
                      )}
                    </div>

                    {selectedOrder.payment.method === "Credit Card" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Card ending in:</span>
                        <span className="font-medium">
                          {selectedOrder.payment.last4}
                        </span>
                      </div>
                    )}

                    {selectedOrder.payment.method === "PayPal" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">PayPal account:</span>
                        <span className="font-medium">
                          {selectedOrder.payment.email}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">Payment status:</span>
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>

                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">Transaction date:</span>
                      <span className="font-medium">{selectedOrder.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowOrderDetails(false)}
                >
                  Close
                </Button>
                {selectedOrder.status === "processing" && (
                  <Button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, "shipped");
                      setShowOrderDetails(false);
                    }}
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Mark as Shipped
                  </Button>
                )}
                {selectedOrder.status === "shipped" && (
                  <Button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, "completed");
                      setShowOrderDetails(false);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
