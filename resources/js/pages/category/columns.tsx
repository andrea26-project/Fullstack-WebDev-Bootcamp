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

export type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) =>
      new Date(row.getValue("updated_at")).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;

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
      router.delete(route("categories.destroy", category.id), {
        onSuccess: () => {
          Swal.fire({
            title: "Deleted!",
            text: "Category has been deleted.",
            icon: "success",
          });
        },
        onError: (err) => {
          Swal.fire({
            title: "Error!",
            text: err?.message ?? "Failed to delete category.",
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
              <Link href={route('categories.edit', category.id)}>
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

