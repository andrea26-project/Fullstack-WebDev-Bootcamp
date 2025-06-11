import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { DataTable } from "./data-table";
import { columns, Product } from "./columns";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  products: Product[];
}

export default function ProductPage({ products }: Props) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head title="Products" />
      <DashboardLayout>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Products</h1>
            <Link
              href={route('products.create')}
              className="bg-[#d6a89e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c6958d]"
            >
              + New Product
            </Link>
          </div>

          <div className="mb-4 max-w-xs">
            <Input
              type="text"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-[#809080] text-[#7a6e5f]"
            />
          </div>

          <DataTable columns={columns} data={filteredProducts} />
        </div>
      </DashboardLayout>
    </>
  );
}

