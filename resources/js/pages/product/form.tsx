import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { router, useForm } from "@inertiajs/react"
import Swal from "sweetalert2"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload"
import { Upload, X } from "lucide-react"
import React from "react"

interface Category {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  category_id: string
  description: string
  company: string
  price: string
  created_at: Date
  updated_at: Date
  image: string | null
}

interface Props {
  product?: Product
  categories: Category[]
}

export default function ProductForm({ product, categories }: Props) {
  const { data, setData, post, processing, errors } = useForm<{
    name: string
    category_id: string
    description?: string
    company: string
    price: string
    image: File | null
  }>({
    name: product ? product.name : "",
    category_id: product ? product.category_id : "",
    description: product ? product.description : "",
    company: product ? product.company : "",
    price: product ? product.price : "",
    image: null,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (product) {
  router.post(
    route('products.update', product.id),
    {
      ...data,
      _method: "put",
    },
    {
      preserveScroll: true,
      onSuccess: () =>
        Swal.fire("Success!", "Product has been updated.", "success"),
      onError: () =>
        Swal.fire("Error!", "Please check the form for errors.", "error"),
    }
  )
} else {
      post(route('products.store'), {
        onSuccess: () =>
          Swal.fire("Success!", "Product has been created.", "success"),
        onError: () =>
          Swal.fire("Error!", "Please check the form for errors.", "error"),
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="px-6 py-10 bg-white border border-[#d6a89e] rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-[#7a6e5f] mb-1">
          {product ? "Edit Product" : "Create Product"}
        </h2>
        <p className="text-sm text-[#7a6e5f] mb-8">
          {product ? "Update your product details below." : "Add a new product."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl w-full">
          {/* Name */}
          <div>
            <Label className="text-[#7a6e5f]">Name</Label>
            <Input
              name="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="mt-1 border-[#d6a89e] focus:border-[#7a6e5f] bg-[#fef8f5] w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <Label className="text-[#7a6e5f]">Category</Label>
            <select
              name="category_id"
              value={data.category_id}
              onChange={(e) => setData("category_id", e.target.value)}
              className="mt-1 w-full border border-[#d6a89e] p-2 rounded-md focus:border-[#7a6e5f] bg-[#fef8f5]"
            >
              <option value="">-- Select Category --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>
            )}
          </div>

          {/* Description */}
<div>
  <Label className="text-[#7a6e5f]">Description</Label>
  <textarea
    name="description"
    value={data.description}
    onChange={(e) => setData("description", e.target.value)}
    className="mt-1 w-full border border-[#d6a89e] p-2 rounded-md focus:border-[#7a6e5f] bg-[#fef8f5] min-h-[100px]"
  />
  {errors.description && (
    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
  )}
</div>

          {/* Price */}
          <div>
            <Label className="text-[#7a6e5f]">Price</Label>
            <Input
              name="price"
              type="number"
              value={data.price}
              onChange={(e) => setData("price", e.target.value)}
              className="mt-1 border-[#d6a89e] focus:border-[#7a6e5f] bg-[#fef8f5] w-full"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <Label className="text-[#7a6e5f]">Product Image</Label>
            <FileUpload
              name="image"
              maxFiles={1}
              accept="image/*"
              maxSize={5 * 1024 * 1024}
              className="w-full"
              value={data.image ? [data.image] : undefined}
              onValueChange={(e) => setData("image", e[0])}
            >
              <FileUploadDropzone className="bg-[#fef8f5] border-[#d6a89e]">
                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="flex items-center justify-center rounded-full border p-2.5 border-[#809080]">
                    <Upload className="size-6 text-[#809080]" />
                  </div>
                  <p className="font-medium text-sm text-[#7a6e5f]">
                    Drag & drop files here
                  </p>
                  <p className="text-xs text-[#809080]">
                    Or click to browse (max 1 file, 5MB)
                  </p>
                </div>
                <FileUploadTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-[#7a6e5f] border-[#809080]"
                  >
                    Browse files
                  </Button>
                </FileUploadTrigger>
              </FileUploadDropzone>

              <FileUploadList>
                {data.image && (
                  <FileUploadItem value={data.image}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant="ghost" size="icon" className="size-7 text-[#7a6e5f]">
                        <X />
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                )}
              </FileUploadList>
            </FileUpload>

            {/* Existing image preview if editing and not uploading new one */}
            {product?.image && !data.image && (
              <div className="p-4 border border-[#d6a89e] bg-[#fef8f5] rounded-lg w-full max-w-2xl">
                <div className="flex items-center gap-5">
                  <img
                    className="aspect-square object-cover w-20 rounded-2xl"
                    src={`http://127.0.0.1:8000/storage/${product.image}`}
                    alt="Current product"
                  />
                  <p className="truncate max-w-full text-sm text-[#7a6e5f]">
                    {product.image.replace("product/", "")}
                  </p>
                </div>
              </div>
            )}

            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          {/* Submit */}
          <Button
            disabled={processing}
            className="bg-[#809080] hover:bg-[#7a6e5f] text-white px-6 py-2 rounded-lg shadow-sm"
          >
            {product ? "Update Product" : "Create Product"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}
