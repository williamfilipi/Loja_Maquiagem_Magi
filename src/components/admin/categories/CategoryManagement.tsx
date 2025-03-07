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
  Plus,
  X,
  Save,
  Tag,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock category data
const mockCategories = [
  {
    id: "1",
    name: "Face",
    slug: "face",
    description: "Products for face makeup and skincare",
    productCount: 42,
    subcategories: [
      { id: "1-1", name: "Foundation", slug: "foundation", productCount: 12 },
      { id: "1-2", name: "Concealer", slug: "concealer", productCount: 8 },
      { id: "1-3", name: "Powder", slug: "powder", productCount: 6 },
      { id: "1-4", name: "Blush", slug: "blush", productCount: 10 },
      { id: "1-5", name: "Bronzer", slug: "bronzer", productCount: 6 },
    ],
  },
  {
    id: "2",
    name: "Eyes",
    slug: "eyes",
    description: "Products for eye makeup",
    productCount: 38,
    subcategories: [
      { id: "2-1", name: "Eyeshadow", slug: "eyeshadow", productCount: 15 },
      { id: "2-2", name: "Eyeliner", slug: "eyeliner", productCount: 8 },
      { id: "2-3", name: "Mascara", slug: "mascara", productCount: 10 },
      { id: "2-4", name: "Eyebrows", slug: "eyebrows", productCount: 5 },
    ],
  },
  {
    id: "3",
    name: "Lips",
    slug: "lips",
    description: "Products for lip makeup",
    productCount: 30,
    subcategories: [
      { id: "3-1", name: "Lipstick", slug: "lipstick", productCount: 12 },
      { id: "3-2", name: "Lip Gloss", slug: "lip-gloss", productCount: 8 },
      { id: "3-3", name: "Lip Liner", slug: "lip-liner", productCount: 6 },
      { id: "3-4", name: "Lip Balm", slug: "lip-balm", productCount: 4 },
    ],
  },
  {
    id: "4",
    name: "Skincare",
    slug: "skincare",
    description: "Products for skin care and treatment",
    productCount: 45,
    subcategories: [
      { id: "4-1", name: "Cleansers", slug: "cleansers", productCount: 10 },
      {
        id: "4-2",
        name: "Moisturizers",
        slug: "moisturizers",
        productCount: 12,
      },
      { id: "4-3", name: "Serums", slug: "serums", productCount: 8 },
      { id: "4-4", name: "Masks", slug: "masks", productCount: 9 },
      { id: "4-5", name: "Sunscreen", slug: "sunscreen", productCount: 6 },
    ],
  },
  {
    id: "5",
    name: "Brushes",
    slug: "brushes",
    description: "Makeup brushes and tools",
    productCount: 25,
    subcategories: [
      {
        id: "5-1",
        name: "Face Brushes",
        slug: "face-brushes",
        productCount: 8,
      },
      { id: "5-2", name: "Eye Brushes", slug: "eye-brushes", productCount: 10 },
      { id: "5-3", name: "Lip Brushes", slug: "lip-brushes", productCount: 3 },
      { id: "5-4", name: "Brush Sets", slug: "brush-sets", productCount: 4 },
    ],
  },
];

const CategoryManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(mockCategories);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false);
  const [showEditCategoryDialog, setShowEditCategoryDialog] = useState(false);
  const [showAddSubcategoryDialog, setShowAddSubcategoryDialog] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    slug: "",
  });

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  // Handle category deletion
  const handleDeleteCategory = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  // Handle subcategory deletion
  const handleDeleteSubcategory = (
    categoryId: string,
    subcategoryId: string,
  ) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      setCategories(
        categories.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              subcategories: category.subcategories.filter(
                (subcategory) => subcategory.id !== subcategoryId,
              ),
            };
          }
          return category;
        }),
      );
    }
  };

  // Open edit category dialog
  const openEditCategoryDialog = (category: any) => {
    setSelectedCategory(category);
    setNewCategory({
      name: category.name,
      slug: category.slug,
      description: category.description,
    });
    setShowEditCategoryDialog(true);
  };

  // Open add subcategory dialog
  const openAddSubcategoryDialog = (category: any) => {
    setSelectedCategory(category);
    setNewSubcategory({
      name: "",
      slug: "",
    });
    setShowAddSubcategoryDialog(true);
  };

  // Add new category
  const handleAddCategory = () => {
    const newCategoryId = (categories.length + 1).toString();
    const categoryToAdd = {
      id: newCategoryId,
      name: newCategory.name,
      slug:
        newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, "-"),
      description: newCategory.description,
      productCount: 0,
      subcategories: [],
    };

    setCategories([...categories, categoryToAdd]);
    setShowAddCategoryDialog(false);
    setNewCategory({ name: "", slug: "", description: "" });
  };

  // Update category
  const handleUpdateCategory = () => {
    setCategories(
      categories.map((category) => {
        if (category.id === selectedCategory.id) {
          return {
            ...category,
            name: newCategory.name,
            slug:
              newCategory.slug ||
              newCategory.name.toLowerCase().replace(/\s+/g, "-"),
            description: newCategory.description,
          };
        }
        return category;
      }),
    );
    setShowEditCategoryDialog(false);
  };

  // Add new subcategory
  const handleAddSubcategory = () => {
    const newSubcategoryId = `${selectedCategory.id}-${selectedCategory.subcategories.length + 1}`;
    const subcategoryToAdd = {
      id: newSubcategoryId,
      name: newSubcategory.name,
      slug:
        newSubcategory.slug ||
        newSubcategory.name.toLowerCase().replace(/\s+/g, "-"),
      productCount: 0,
    };

    setCategories(
      categories.map((category) => {
        if (category.id === selectedCategory.id) {
          return {
            ...category,
            subcategories: [...category.subcategories, subcategoryToAdd],
          };
        }
        return category;
      }),
    );
    setShowAddSubcategoryDialog(false);
    setNewSubcategory({ name: "", slug: "" });
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some((subcategory) =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button size="sm" onClick={() => setShowAddCategoryDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search categories..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <React.Fragment key={category.id}>
                <TableRow className="bg-gray-50">
                  <TableCell>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-6 w-6 mr-2"
                        onClick={() => toggleCategoryExpansion(category.id)}
                      >
                        {expandedCategories.includes(category.id) ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-right">
                    {category.productCount}
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
                        <DropdownMenuItem
                          onClick={() => openEditCategoryDialog(category)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openAddSubcategoryDialog(category)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Subcategory
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>

                {/* Subcategories */}
                {expandedCategories.includes(category.id) &&
                  category.subcategories.map((subcategory) => (
                    <TableRow key={subcategory.id}>
                      <TableCell>
                        <div className="flex items-center pl-8">
                          <Tag className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{subcategory.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{subcategory.slug}</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right">
                        {subcategory.productCount}
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
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() =>
                                handleDeleteSubcategory(
                                  category.id,
                                  subcategory.id,
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Category Dialog */}
      <Dialog
        open={showAddCategoryDialog}
        onOpenChange={setShowAddCategoryDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Enter the category details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Name*</label>
              <Input
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <Input
                placeholder="Enter slug (optional)"
                value={newCategory.slug}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, slug: e.target.value })
                }
              />
              <p className="text-xs text-gray-500">
                Leave empty to generate automatically from name
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Enter category description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddCategoryDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddCategory} disabled={!newCategory.name}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog
        open={showEditCategoryDialog}
        onOpenChange={setShowEditCategoryDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Name*</label>
              <Input
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <Input
                placeholder="Enter slug (optional)"
                value={newCategory.slug}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, slug: e.target.value })
                }
              />
              <p className="text-xs text-gray-500">
                Leave empty to generate automatically from name
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Enter category description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditCategoryDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateCategory} disabled={!newCategory.name}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Subcategory Dialog */}
      <Dialog
        open={showAddSubcategoryDialog}
        onOpenChange={setShowAddSubcategoryDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Subcategory</DialogTitle>
            <DialogDescription>
              Add a subcategory to {selectedCategory?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subcategory Name*</label>
              <Input
                placeholder="Enter subcategory name"
                value={newSubcategory.name}
                onChange={(e) =>
                  setNewSubcategory({
                    ...newSubcategory,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <Input
                placeholder="Enter slug (optional)"
                value={newSubcategory.slug}
                onChange={(e) =>
                  setNewSubcategory({
                    ...newSubcategory,
                    slug: e.target.value,
                  })
                }
              />
              <p className="text-xs text-gray-500">
                Leave empty to generate automatically from name
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddSubcategoryDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddSubcategory}
              disabled={!newSubcategory.name}
            >
              Add Subcategory
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
