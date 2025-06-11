import { ColumnDef } from "@tanstack/react-table"
import { ProductVariant } from "./index"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { router } from "@inertiajs/react"
import Swal from "sweetalert2"

export const columns = (productId: string): ColumnDef<ProductVariant>[] => [
  {
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const variant = row.original
      const imageUrl = variant.image
        ? `/storage/${variant.image}`
        : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
      return (
        <img
          src={imageUrl}
          className="aspect-square w-16 object-cover rounded-lg border border-[#d6a89e]"
          alt={variant.variant_name}
        />
      )
    },
  },
  {
    accessorKey: "variant_name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Variant Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const variant = row.original

      const handleDelete = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "This will permanently delete the variant.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#809080",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            router.delete(`/dashboard/products/${productId}/variants/${variant.id}`)
          }
        })
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem onClick={() => router.visit(`/dashboard/products/${productId}/variants/${variant.id}/edit`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              Delete
            </DropdownMenuItem> */}

            <DropdownMenuItem onClick={() => router.visit(route('products.variants.edit', [productId, variant.id]))}>
  Edit
</DropdownMenuItem>

<DropdownMenuItem onClick={() => {
  Swal.fire({
    title: "Are you sure?",
    text: "This will permanently delete the variant.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#809080",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      router.delete(route('products.variants.destroy', [productId, variant.id]))
    }
  })
}}>
  Delete
</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

