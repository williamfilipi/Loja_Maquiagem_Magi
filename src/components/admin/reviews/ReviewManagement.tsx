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
  CheckCircle,
  XCircle,
  Star,
  Calendar,
  MessageSquare,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock review data
const mockReviews = [
  {
    id: "REV-001",
    customer: {
      name: "Emma Johnson",
      email: "emma.j@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    product: {
      id: "1",
      name: "Luminous Matte Foundation",
      image:
        "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=100&q=80",
    },
    rating: 5,
    comment:
      "This foundation is amazing! It gives a perfect matte finish without drying out my skin. The coverage is buildable and it lasts all day. Definitely my new go-to foundation.",
    date: "2023-06-15",
    status: "published",
  },
  {
    id: "REV-002",
    customer: {
      name: "Michael Smith",
      email: "michael.s@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    product: {
      id: "2",
      name: "Velvet Lip Stain",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&q=80",
    },
    rating: 4,
    comment:
      "Bought this for my wife and she loves it. The color is beautiful and it stays on for hours. Only giving 4 stars because it can be a bit drying after a full day of wear.",
    date: "2023-06-14",
    status: "published",
  },
  {
    id: "REV-003",
    customer: {
      name: "Sophia Williams",
      email: "sophia.w@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    },
    product: {
      id: "3",
      name: "Radiant Skin Illuminator",
      image:
        "https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?w=100&q=80",
    },
    rating: 5,
    comment:
      "This highlighter gives the most beautiful glow! It's not glittery at all, just a natural-looking radiance. A little goes a long way, so the bottle will last forever.",
    date: "2023-06-13",
    status: "published",
  },
  {
    id: "REV-004",
    customer: {
      name: "James Brown",
      email: "james.b@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    product: {
      id: "4",
      name: "Volumizing Mascara",
      image:
        "https://images.unsplash.com/photo-1591360236480-9c6a4cb3a6de?w=100&q=80",
    },
    rating: 2,
    comment:
      "This mascara clumps a lot and smudges under my eyes throughout the day. Not worth the price. I've used drugstore mascaras that perform much better.",
    date: "2023-06-12",
    status: "pending",
  },
  {
    id: "REV-005",
    customer: {
      name: "Olivia Davis",
      email: "olivia.d@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    },
    product: {
      id: "5",
      name: "Hydrating Face Primer",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80",
    },
    rating: 1,
    comment:
      "Terrible product! Made my skin break out immediately. I have sensitive skin and this was way too harsh. Returning it ASAP.",
    date: "2023-06-11",
    status: "pending",
  },
  {
    id: "REV-006",
    customer: {
      name: "Daniel Wilson",
      email: "daniel.w@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    },
    product: {
      id: "6",
      name: "Creamy Blush Stick",
      image:
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=100&q=80",
    },
    rating: 5,
    comment:
      "This blush is so easy to apply and blend! The color is gorgeous and gives a natural flush. I love that it's buildable too. Will definitely purchase more colors.",
    date: "2023-06-10",
    status: "published",
  },
  {
    id: "REV-007",
    customer: {
      name: "Ava Martinez",
      email: "ava.m@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
    },
    product: {
      id: "7",
      name: "Precision Brow Pencil",
      image:
        "https://images.unsplash.com/photo-1625093742435-6fa192b6fb1a?w=100&q=80",
    },
    rating: 4,
    comment:
      "Great brow pencil! The color matches perfectly and it's easy to create natural-looking brows. The spoolie on the end is a nice touch. Only wish it was a bit more long-lasting.",
    date: "2023-06-09",
    status: "published",
  },
  {
    id: "REV-008",
    customer: {
      name: "Ethan Taylor",
      email: "ethan.t@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    },
    product: {
      id: "8",
      name: "Matte Eyeshadow Palette",
      image:
        "https://images.unsplash.com/photo-1583241800698-e8ab01c85b27?w=100&q=80",
    },
    rating: 3,
    comment:
      "The colors in this palette are beautiful, but there's quite a bit of fallout. The shadows blend well though. It's decent for the price, but not the best I've used.",
    date: "2023-06-08",
    status: "rejected",
  },
];

const ReviewManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [reviews, setReviews] = useState(mockReviews);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [showReviewDetails, setShowReviewDetails] = useState(false);

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      published: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={statusClasses[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  // Update review status
  const updateReviewStatus = (reviewId: string, newStatus: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, status: newStatus } : review,
      ),
    );
  };

  // View review details
  const viewReviewDetails = (review: any) => {
    setSelectedReview(review);
    setShowReviewDetails(true);
  };

  // Filter reviews based on search term, status filter, and rating filter
  const filteredReviews = reviews.filter(
    (review) =>
      (statusFilter === "all" || review.status === statusFilter) &&
      (ratingFilter === "all" || review.rating === parseInt(ratingFilter)) &&
      (review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Review Management</h1>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            Export Reviews
          </Button>
          <Button size="sm">Generate Report</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search reviews..."
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
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
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
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <img
                        src={review.customer.avatar}
                        alt={review.customer.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <div className="font-medium">
                          {review.customer.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {review.customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <img
                        src={review.product.image}
                        alt={review.product.name}
                        className="w-8 h-8 rounded-md mr-2 object-cover"
                      />
                      <span className="text-sm">{review.product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{renderStars(review.rating)}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate">{review.comment}</div>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
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
                          onClick={() => viewReviewDetails(review)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {review.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() =>
                                updateReviewStatus(review.id, "published")
                              }
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateReviewStatus(review.id, "rejected")
                              }
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {review.status === "published" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateReviewStatus(review.id, "rejected")
                            }
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Unpublish
                          </DropdownMenuItem>
                        )}
                        {review.status === "rejected" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateReviewStatus(review.id, "published")
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Publish
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
      </div>

      {/* Review Details Modal */}
      {showReviewDetails && selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Review Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowReviewDetails(false)}
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <img
                      src={selectedReview.customer.avatar}
                      alt={selectedReview.customer.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="font-medium">
                        {selectedReview.customer.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedReview.customer.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">
                        {selectedReview.date}
                      </span>
                    </div>
                    <div className="mt-1">
                      {getStatusBadge(selectedReview.status)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-3">
                  <img
                    src={selectedReview.product.image}
                    alt={selectedReview.product.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium">
                      {selectedReview.product.name}
                    </h3>
                    <div className="mt-1">
                      {renderStars(selectedReview.rating)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{selectedReview.comment}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowReviewDetails(false)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
                {selectedReview.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto"
                      onClick={() => {
                        updateReviewStatus(selectedReview.id, "rejected");
                        setShowReviewDetails(false);
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => {
                        updateReviewStatus(selectedReview.id, "published");
                        setShowReviewDetails(false);
                      }}
                      className="w-full sm:w-auto"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </>
                )}
                {selectedReview.status === "published" && (
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto"
                    onClick={() => {
                      updateReviewStatus(selectedReview.id, "rejected");
                      setShowReviewDetails(false);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Unpublish
                  </Button>
                )}
                {selectedReview.status === "rejected" && (
                  <Button
                    onClick={() => {
                      updateReviewStatus(selectedReview.id, "published");
                      setShowReviewDetails(false);
                    }}
                    className="w-full sm:w-auto"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Publish
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

export default ReviewManagement;
