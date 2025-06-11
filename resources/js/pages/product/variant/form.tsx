import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useForm, router } from "@inertiajs/react"
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

export interface Product {
  id: string
  name: string
}

interface Variant {
  id?: string
  variant_name: string
  stock: number
  image: File | null
}

interface Props {
  product: Product
  variant?: Variant & { image: string }
}

export default function VariantForm({ product, variant }: Props) {
  const { data, setData, processing, errors } = useForm({
    variant_name: variant?.variant_name || "",
    stock: variant?.stock || 0,
    image: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (variant) {
      router.post(
        route('products.variants.update', [product.id, variant.id]),
        {
        ...data,
        _method: variant ? "put" : undefined,
      }, {
        onSuccess: () => Swal.fire("Success!", `Variant ${variant ? "updated" : "created"} successfully.`, "success"),
        onError: () => Swal.fire("Error!", "Please check the form for errors.", "error"),
      })

    } else {
      router.post(
        route('products.variants.store', [product.id]),
        {
        ...data,
        _method: variant ? "put" : undefined,
      }, {
        onSuccess: () => Swal.fire("Success!", `Variant ${variant ? "updated" : "created"} successfully.`, "success"),
        onError: () => Swal.fire("Error!", "Please check the form for errors.", "error"),
      })
    }

  }

  return (
    <DashboardLayout>
      <div className="px-6 py-10 bg-white border border-[#d6a89e] rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-[#7a6e5f] mb-1">
          {variant ? "Edit Variant" : "Create Variant"}
        </h2>
        <p className="text-sm text-[#7a6e5f] mb-8">
          for <strong>{product.name}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl w-full">
          <div>
            <Label className="text-[#7a6e5f]">Variant Name</Label>
            {/* <Input
              value={data.variant_name}
              onChange={(e) => setData("variant_name", e.target.value)}
              className="mt-1 w-full border-[#d6a89e] bg-[#fef8f5] focus:border-[#7a6e5f]"
            /> */}

            <Input
  type="text"
  name="variant_name"
  value={data.variant_name}
  onChange={(e) => setData("variant_name", e.target.value)}
  className="mt-1 border-[#d6a89e] focus:border-[#7a6e5f] bg-[#fef8f5] w-full"
/>
            {errors.variant_name && <p className="text-red-500 text-sm mt-1">{errors.variant_name}</p>}
          </div>

          <div>
            <Label className="text-[#7a6e5f]">Stock</Label>
            <Input
              type="number"
              value={data.stock}
              onChange={(e) => setData("stock", Number(e.target.value))}
              className="mt-1 w-full border-[#d6a89e] bg-[#fef8f5] focus:border-[#7a6e5f]"
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>

          <div className="space-y-3">
  <Label className="text-[#7a6e5f]">Image (optional)</Label>

  <FileUpload
    name="image"
    maxFiles={1}
    accept="image/*"
    maxSize={2 * 1024 * 1024}
    className="w-full"
    value={data.image ? [data.image] : undefined}
    onValueChange={(files) => setData("image", files[0])}
  >
    <FileUploadDropzone className="bg-[#fef8f5] border-[#d6a89e]">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center rounded-full border p-2.5 border-[#809080]">
          <Upload className="size-6 text-[#809080]" />
        </div>
        <p className="font-medium text-sm text-[#7a6e5f]">Drag & drop files here</p>
        <p className="text-xs text-[#809080]">Or click to browse (max 2MB)</p>
      </div>
      <FileUploadTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2 text-[#7a6e5f] border-[#809080]">
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

  {/* ✅ Show existing image if editing and no new image uploaded */}
  {variant?.image && !data.image && (
    <div className="p-3 border border-[#d6a89e] bg-[#fef8f5] rounded-lg w-full max-w-2xl">
      <div className="flex items-center gap-5">
        <img
          className="aspect-square object-cover w-20 rounded-2xl"
          src={`/storage/${variant.image}`}
          alt="Current variant"
        />
        <p className="truncate max-w-full text-sm text-[#7a6e5f]">
          {variant.image.replace("variant/", "")}
        </p>
      </div>
    </div>
  )}

  {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
</div>

          <Button
            disabled={processing}
            className="bg-[#809080] hover:bg-[#7a6e5f] text-white px-6 py-2 rounded-lg shadow-sm"
          >
            {variant ? "Update Variant" : "Create Variant"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}
