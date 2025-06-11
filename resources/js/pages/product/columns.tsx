import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { router, Link } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Category } from "../category/columns";

export type Product = {
  id: string;
  name: string;
  price: number;
  created_at: string;
  image: string | null;
  category: Category;
};

export const columns: ColumnDef<Product & {
  category: Category;
}>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const product = row.original;
      const imageUrl = product.image
        ? `http://127.0.0.1:8000/storage/${product.image}`
        : 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';

      return (
        <img
          src={imageUrl}
          className="aspect-square w-[100px] object-cover rounded-lg border border-[#d6a89e]"
          alt={product.name}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "category",
    header: "Category",
    cell: ({ row }) => {
      const product = row.original;
      return product.category.name;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `Rp ${row.getValue("price")}`,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleDateString("id-ID"),
  },
  {
    id: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link href={route('products.variants.index', [product.id])}>
          <Button
            variant="outline"
            className="text-[#7a6e5f] border-[#809080] text-xs"
          >
            Manage Variants
          </Button>
        </Link>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      const handleDelete = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      router.delete(route("products.destroy", product.id), {
        onSuccess: () => {
          Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success",
          });
        },
        onError: (err) => {
          Swal.fire({
            title: "Error!",
            text:
              err?.message ??
              "Product cannot be deleted. It may have existing variants.",
            icon: "error",
          });
        },
      });
    }
  });
};

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={route('products.edit', [product.id])}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


