import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Plus,
  Upload,
  Image as ImageIcon,
  Save,
  ArrowLeft,
} from "lucide-react";

// Form schema
const productFormSchema = z.object({
  name: z.string().min(2, { message: "Nome do produto é obrigatório" }),
  description: z
    .string()
    .min(10, { message: "Descrição deve ter pelo menos 10 caracteres" }),
  category: z.string().min(1, { message: "Categoria é obrigatória" }),
  subcategory: z.string().optional(),
  brand: z.string().min(1, { message: "Marca é obrigatória" }),
  sku: z.string().min(1, { message: "SKU é obrigatório" }),
  barcode: z.string().optional(),
  regularPrice: z.coerce
    .number()
    .min(0, { message: "Preço deve ser um número positivo" }),
  salePrice: z.coerce
    .number()
    .min(0, { message: "Preço promocional deve ser um número positivo" })
    .optional(),
  cost: z.coerce
    .number()
    .min(0, { message: "Custo deve ser um número positivo" })
    .optional(),
  stock: z.coerce
    .number()
    .min(0, { message: "Estoque deve ser um número positivo" }),
  lowStockThreshold: z.coerce.number().min(0).optional(),
  weight: z.coerce.number().min(0).optional(),
  dimensions: z
    .object({
      length: z.coerce.number().min(0).optional(),
      width: z.coerce.number().min(0).optional(),
      height: z.coerce.number().min(0).optional(),
    })
    .optional(),
  taxable: z.boolean().default(true),
  status: z.enum(["active", "draft", "archived"]),
  featured: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData?: ProductFormValues;
  isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<
    { name: string; values: string[] }[]
  >([]);
  const [newVariant, setNewVariant] = useState({ name: "", value: "" });
  const [activeTab, setActiveTab] = useState("general");

  // Default form values
  const defaultValues: Partial<ProductFormValues> = {
    name: "",
    description: "",
    category: "",
    subcategory: "",
    brand: "",
    sku: "",
    barcode: "",
    regularPrice: 0,
    salePrice: undefined,
    cost: undefined,
    stock: 0,
    lowStockThreshold: 5,
    weight: undefined,
    dimensions: {
      length: undefined,
      width: undefined,
      height: undefined,
    },
    taxable: true,
    status: "draft",
    featured: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ...initialData,
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Form submitted:", data);
    console.log("Images:", images);
    console.log("Variants:", variants);

    // In a real app, you would send this data to your API
    alert("Produto salvo com sucesso!");
    navigate("/admin/products");
  };

  const handleImageUpload = () => {
    // In a real app, this would open a file picker and upload the image
    // For now, we'll just add a placeholder image
    const newImage = `https://source.unsplash.com/random/300x300/?makeup&${Date.now()}`;
    setImages([...images, newImage]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addVariant = () => {
    if (!newVariant.name || !newVariant.value) return;

    const existingVariantIndex = variants.findIndex(
      (v) => v.name === newVariant.name,
    );

    if (existingVariantIndex >= 0) {
      // Add value to existing variant
      const updatedVariants = [...variants];
      if (
        !updatedVariants[existingVariantIndex].values.includes(newVariant.value)
      ) {
        updatedVariants[existingVariantIndex].values.push(newVariant.value);
      }
      setVariants(updatedVariants);
    } else {
      // Create new variant
      setVariants([
        ...variants,
        { name: newVariant.name, values: [newVariant.value] },
      ]);
    }

    setNewVariant({ name: "", value: "" });
  };

  const removeVariantValue = (variantName: string, valueToRemove: string) => {
    const updatedVariants = variants
      .map((variant) => {
        if (variant.name === variantName) {
          return {
            ...variant,
            values: variant.values.filter((value) => value !== valueToRemove),
          };
        }
        return variant;
      })
      .filter((variant) => variant.values.length > 0);

    setVariants(updatedVariants);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/products")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? "Editar Produto" : "Adicionar Novo Produto"}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => form.reset()}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full sm:w-auto"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Produto
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="general"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="images">Imagens</TabsTrigger>
            <TabsTrigger value="variants">Variantes</TabsTrigger>
            <TabsTrigger value="inventory">Estoque</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* General Tab */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome do produto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU*</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o SKU" {...field} />
                      </FormControl>
                      <FormDescription>
                        Código único para identificar este produto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="barcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código de Barras / UPC</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o código de barras"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marca*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a marca" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="glossier">Glossier</SelectItem>
                          <SelectItem value="fenty">Fenty Beauty</SelectItem>
                          <SelectItem value="rare">Rare Beauty</SelectItem>
                          <SelectItem value="charlotte">
                            Charlotte Tilbury
                          </SelectItem>
                          <SelectItem value="mac">MAC Cosmetics</SelectItem>
                          <SelectItem value="nars">NARS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="face">Rosto</SelectItem>
                          <SelectItem value="eyes">Olhos</SelectItem>
                          <SelectItem value="lips">Lábios</SelectItem>
                          <SelectItem value="cheeks">Bochechas</SelectItem>
                          <SelectItem value="skincare">Skincare</SelectItem>
                          <SelectItem value="brushes">Pincéis</SelectItem>
                          <SelectItem value="sets">Kits</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a subcategoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="foundation">Base</SelectItem>
                          <SelectItem value="concealer">Corretivo</SelectItem>
                          <SelectItem value="powder">Pó</SelectItem>
                          <SelectItem value="mascara">Máscara</SelectItem>
                          <SelectItem value="eyeliner">Delineador</SelectItem>
                          <SelectItem value="lipstick">Batom</SelectItem>
                          <SelectItem value="lipgloss">Gloss</SelectItem>
                          <SelectItem value="blush">Blush</SelectItem>
                          <SelectItem value="highlighter">
                            Iluminador
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite a descrição do produto"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="regularPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Regular*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5">R$</span>
                          <Input type="number" className="pl-7" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Promocional</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5">R$</span>
                          <Input type="number" className="pl-7" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5">R$</span>
                          <Input type="number" className="pl-7" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Seu custo (não mostrado aos clientes)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="draft">Rascunho</SelectItem>
                          <SelectItem value="archived">Arquivado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
                  <FormField
                    control={form.control}
                    name="taxable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Tributável</FormLabel>
                          <FormDescription>
                            Este produto está sujeito a impostos
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Destaque</FormLabel>
                          <FormDescription>
                            Mostrar este produto em seções de destaque
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Images Tab */}
            <TabsContent value="images" className="space-y-6">
              <div className="border rounded-md p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                  <h3 className="text-lg font-medium">Imagens do Produto</h3>
                  <div className="flex flex-wrap gap-2">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Button type="button" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Selecionar Arquivos
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <Button type="button" onClick={handleImageUpload}>
                      <Upload className="h-4 w-4 mr-2" />
                      Carregar Exemplo
                    </Button>
                  </div>
                </div>

                {images.length === 0 ? (
                  <div className="border-2 border-dashed rounded-md p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500 font-medium">
                        Arraste e solte suas imagens aqui
                      </p>
                      <p className="text-sm text-gray-400 mt-1 mb-4">
                        Suporta: JPG, PNG, GIF (Máx 5MB cada)
                      </p>
                      <label
                        htmlFor="file-upload-drop"
                        className="cursor-pointer"
                      >
                        <Button type="button" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Procurar Arquivos
                        </Button>
                        <input
                          id="file-upload-drop"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative border rounded-md overflow-hidden group"
                        >
                          <img
                            src={image}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          {index === 0 && (
                            <Badge className="absolute top-2 left-2 bg-blue-500">
                              Principal
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-4 gap-3">
                      <div className="text-sm text-gray-500">
                        {images.length} imagem{images.length !== 1 ? "s" : ""}{" "}
                        carregada{images.length !== 1 ? "s" : ""}
                      </div>
                      <label
                        htmlFor="add-more-images"
                        className="cursor-pointer"
                      >
                        <Button type="button" variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Mais Imagens
                        </Button>
                        <input
                          id="add-more-images"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Variants Tab */}
            <TabsContent value="variants" className="space-y-6">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">
                  Variantes do Produto
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Tipo de Variante
                    </label>
                    <Select
                      value={newVariant.name}
                      onValueChange={(value) =>
                        setNewVariant({ ...newVariant, name: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de variante" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="color">Cor</SelectItem>
                        <SelectItem value="size">Tamanho</SelectItem>
                        <SelectItem value="material">Material</SelectItem>
                        <SelectItem value="style">Estilo</SelectItem>
                        <SelectItem value="shade">Tom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Valor da Variante
                    </label>
                    <Input
                      value={newVariant.value}
                      onChange={(e) =>
                        setNewVariant({ ...newVariant, value: e.target.value })
                      }
                      placeholder="Digite o valor da variante"
                    />
                  </div>

                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={addVariant}
                      disabled={!newVariant.name || !newVariant.value}
                      className="w-full sm:w-auto"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Variante
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                {variants.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-gray-500">
                      Nenhuma variante adicionada ainda
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Adicione variantes como cor, tamanho ou estilo
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {variants.map((variant, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <h4 className="font-medium capitalize mb-2">
                          {variant.name === "color"
                            ? "Cor"
                            : variant.name === "size"
                              ? "Tamanho"
                              : variant.name === "material"
                                ? "Material"
                                : variant.name === "style"
                                  ? "Estilo"
                                  : variant.name === "shade"
                                    ? "Tom"
                                    : variant.name}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {variant.values.map((value, valueIndex) => (
                            <Badge
                              key={valueIndex}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {value}
                              <button
                                type="button"
                                onClick={() =>
                                  removeVariantValue(variant.name, value)
                                }
                                className="ml-1 text-gray-500 hover:text-gray-700"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade em Estoque*</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Nível atual de estoque</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lowStockThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limite de Estoque Baixo</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Receba alertas quando o estoque ficar abaixo deste nível
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="text-lg font-medium mt-6">Informações de Envio</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso (g)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dimensions.length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comprimento (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dimensions.width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Largura (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dimensions.height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o meta título" {...field} />
                    </FormControl>
                    <FormDescription>
                      Título que aparece nos resultados de busca
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Digite a meta descrição"
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Descrição que aparece nos resultados de busca
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Palavras-chave</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite palavras-chave separadas por vírgulas"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Palavras-chave relacionadas ao seu produto (separadas por
                      vírgula)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </form>
        </Form>
      </Tabs>

      {/* Mobile tab navigation buttons */}
      <div className="flex justify-between mt-6 md:hidden">
        <Button
          variant="outline"
          onClick={() => {
            const tabs = ["general", "images", "variants", "inventory", "seo"];
            const currentIndex = tabs.indexOf(activeTab);
            if (currentIndex > 0) {
              setActiveTab(tabs[currentIndex - 1]);
            }
          }}
          disabled={activeTab === "general"}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const tabs = ["general", "images", "variants", "inventory", "seo"];
            const currentIndex = tabs.indexOf(activeTab);
            if (currentIndex < tabs.length - 1) {
              setActiveTab(tabs[currentIndex + 1]);
            }
          }}
          disabled={activeTab === "seo"}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
