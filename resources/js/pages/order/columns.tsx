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
import Swal from "sweetalert2";

export type Order = {
  id: string;
  user: {
    name: string;
    email: string;
  };
  total: number;
  status: string;
  created_at: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (row.getValue("id") as string).slice(0, 8) + "..."
  },
  {
    accessorKey: "user.name",
    header: "Customer",
    cell: ({ row }) => row.original.user?.name ?? "Unknown"
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => `Rp ${Number(row.getValue("total")).toLocaleString()}`
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const badgeColor =
        status === "paid" ? "text-green-700" :
        status === "pending" ? "text-yellow-600" :
        status === "cancelled" ? "text-red-600" : "text-gray-700";

      return <span className={`capitalize font-semibold ${badgeColor}`}>{status}</span>;
    }
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleDateString("id-ID")
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      const handleView = () => {
        Swal.fire({
          title: `Order ${order.id}`,
          html: `
            <p><strong>Customer:</strong> ${order.user?.name}</p>
            <p><strong>Email:</strong> ${order.user?.email}</p>
            <p><strong>Total:</strong> Rp ${order.total.toLocaleString()}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          `,
          confirmButtonColor: "#809080"
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleView}>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
