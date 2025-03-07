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
  Edit,
  Trash2,
  UserPlus,
  Download,
  Eye,
  Calendar,
  Mail,
  Phone,
  ShoppingBag,
  Tag,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock customer data
const mockCustomers = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    phone: "+1 (555) 123-4567",
    registrationDate: "2023-01-15",
    totalPurchases: 12,
    totalSpent: 845.75,
    status: "active",
    segment: "vip",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    lastPurchase: "2023-06-10",
    address: "123 Main St, Anytown, CA 12345",
  },
  {
    id: "2",
    name: "Michael Smith",
    email: "michael.s@example.com",
    phone: "+1 (555) 987-6543",
    registrationDate: "2023-02-22",
    totalPurchases: 8,
    totalSpent: 523.5,
    status: "active",
    segment: "regular",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    lastPurchase: "2023-05-28",
    address: "456 Oak Ave, Somewhere, NY 54321",
  },
  {
    id: "3",
    name: "Sophia Williams",
    email: "sophia.w@example.com",
    phone: "+1 (555) 456-7890",
    registrationDate: "2023-03-10",
    totalPurchases: 15,
    totalSpent: 1245.3,
    status: "active",
    segment: "vip",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    lastPurchase: "2023-06-15",
    address: "789 Pine Ln, Elsewhere, TX 67890",
  },
  {
    id: "4",
    name: "James Brown",
    email: "james.b@example.com",
    phone: "+1 (555) 789-0123",
    registrationDate: "2023-01-05",
    totalPurchases: 5,
    totalSpent: 312.25,
    status: "inactive",
    segment: "regular",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    lastPurchase: "2023-04-02",
    address: "321 Elm St, Nowhere, WA 13579",
  },
  {
    id: "5",
    name: "Olivia Davis",
    email: "olivia.d@example.com",
    phone: "+1 (555) 321-6547",
    registrationDate: "2023-04-18",
    totalPurchases: 3,
    totalSpent: 189.99,
    status: "active",
    segment: "new",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    lastPurchase: "2023-06-01",
    address: "654 Maple Dr, Anywhere, FL 97531",
  },
  {
    id: "6",
    name: "Daniel Wilson",
    email: "daniel.w@example.com",
    phone: "+1 (555) 654-9870",
    registrationDate: "2023-02-28",
    totalPurchases: 7,
    totalSpent: 478.5,
    status: "active",
    segment: "regular",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    lastPurchase: "2023-05-15",
    address: "987 Cedar Rd, Someplace, GA 24680",
  },
  {
    id: "7",
    name: "Ava Martinez",
    email: "ava.m@example.com",
    phone: "+1 (555) 234-5678",
    registrationDate: "2023-03-15",
    totalPurchases: 10,
    totalSpent: 732.75,
    status: "active",
    segment: "regular",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
    lastPurchase: "2023-06-08",
    address: "246 Birch St, Othertown, IL 35791",
  },
  {
    id: "8",
    name: "Ethan Taylor",
    email: "ethan.t@example.com",
    phone: "+1 (555) 876-5432",
    registrationDate: "2023-05-05",
    totalPurchases: 2,
    totalSpent: 145.5,
    status: "active",
    segment: "new",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    lastPurchase: "2023-06-02",
    address: "135 Walnut Ave, Lastplace, OH 86420",
  },
];

const CustomerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [customers, setCustomers] = useState(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showAddCustomerDialog, setShowAddCustomerDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={statusClasses[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Get segment badge
  const getSegmentBadge = (segment: string) => {
    const segmentClasses = {
      vip: "bg-purple-100 text-purple-800",
      regular: "bg-blue-100 text-blue-800",
      new: "bg-yellow-100 text-yellow-800",
    };

    return (
      <Badge className={segmentClasses[segment] || "bg-gray-100 text-gray-800"}>
        {segment === "vip"
          ? "VIP"
          : segment.charAt(0).toUpperCase() + segment.slice(1)}
      </Badge>
    );
  };

  // Handle customer deletion
  const handleDeleteCustomer = (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  // View customer details
  const viewCustomerDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  // Add new customer
  const handleAddCustomer = () => {
    const newCustomerId = (customers.length + 1).toString();
    const currentDate = new Date().toISOString().split("T")[0];

    const customerToAdd = {
      id: newCustomerId,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      registrationDate: currentDate,
      totalPurchases: 0,
      totalSpent: 0,
      status: "active",
      segment: "new",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newCustomer.name.replace(" ", "")}_${newCustomerId}`,
      lastPurchase: "",
      address: newCustomer.address,
    };

    setCustomers([...customers, customerToAdd]);
    setShowAddCustomerDialog(false);
    setNewCustomer({ name: "", email: "", phone: "", address: "" });
  };

  // Filter customers based on search term, status filter, and segment filter
  const filteredCustomers = customers.filter(
    (customer) =>
      (statusFilter === "all" || customer.status === statusFilter) &&
      (segmentFilter === "all" || customer.segment === segmentFilter) &&
      (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowAddCustomerDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={segmentFilter} onValueChange={setSegmentFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
              <SelectItem value="new">New</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Purchases</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-8 h-8 rounded-full"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">{customer.email}</div>
                    <div className="text-xs text-gray-500">
                      {customer.phone}
                    </div>
                  </TableCell>
                  <TableCell>{customer.registrationDate}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {customer.totalPurchases} orders
                    </div>
                    <div className="text-xs text-gray-500">
                      R$ {customer.totalSpent.toFixed(2).replace(".", ",")}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>{getSegmentBadge(customer.segment)}</TableCell>
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
                        <DropdownMenuItem
                          onClick={() => viewCustomerDetails(customer)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
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

      {/* Customer Details Modal */}
      {showCustomerDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Customer Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCustomerDetails(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-col md:flex-row items-start mb-6">
                <img
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  className="w-20 h-20 rounded-full mr-6 mb-4 md:mb-0"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                  <div className="flex flex-wrap items-center mt-1 space-x-2">
                    {getStatusBadge(selectedCustomer.status)}
                    {getSegmentBadge(selectedCustomer.segment)}
                  </div>
                  <div className="flex items-center mt-3 text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      Customer since {selectedCustomer.registrationDate}
                    </span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="info">Contact Info</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">
                          Email Address
                        </h4>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">
                          Phone Number
                        </h4>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Address
                      </h4>
                      <p className="text-gray-700">
                        {selectedCustomer.address}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="py-4">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h4 className="font-medium">Order Summary</h4>
                        <p className="text-sm text-gray-500">
                          Customer's order history
                        </p>
                      </div>
                      <div className="text-left sm:text-right mt-2 sm:mt-0">
                        <div className="font-medium">
                          {selectedCustomer.totalPurchases} orders
                        </div>
                        <div className="text-sm text-gray-500">
                          R${" "}
                          {selectedCustomer.totalSpent
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                          total spent
                        </div>
                      </div>
                    </div>

                    {selectedCustomer.totalPurchases > 0 ? (
                      <div className="border rounded-md p-4">
                        <div className="flex items-center">
                          <ShoppingBag className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="font-medium">
                            Last purchase on {selectedCustomer.lastPurchase}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          View detailed order history in the Orders section
                        </p>
                      </div>
                    ) : (
                      <div className="border rounded-md p-4 text-center">
                        <p className="text-gray-500">No orders yet</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="py-4">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h4 className="font-medium mb-2 sm:mb-0">
                        Customer Activity
                      </h4>
                      <Button variant="outline" size="sm">
                        View Full Activity Log
                      </Button>
                    </div>

                    <div className="border rounded-md p-4 text-center">
                      <p className="text-gray-500">
                        Activity tracking will be available soon
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCustomerDetails(false)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
                <Button className="w-full sm:w-auto">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Customer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Dialog */}
      <Dialog
        open={showAddCustomerDialog}
        onOpenChange={setShowAddCustomerDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter the customer's information below to create a new account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="Enter customer name"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                placeholder="Enter phone number"
                value={newCustomer.phone}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                placeholder="Enter address"
                value={newCustomer.address}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, address: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowAddCustomerDialog(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCustomer}
              disabled={!newCustomer.name || !newCustomer.email}
              className="w-full sm:w-auto"
            >
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManagement;
