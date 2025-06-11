import { Head } from "@inertiajs/react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { DataTable } from "./data-table";
import { columns, Category } from "./columns";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "@inertiajs/react";

interface Props {
  categories: Category[];
}

export default function CategoryPage({ categories }: Props) {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head title="Categories" />
      <DashboardLayout>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Categories</h1>
            <Link
              href={route('categories.create')}
              className="bg-[#d6a89e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c6958d]"
            >
              + New Category
            </Link>
          </div>

          <div className="mb-4 max-w-xs">
            <Input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-[#809080] text-[#7a6e5f]"
            />
          </div>

          <DataTable columns={columns} data={filteredCategories} />
        </div>
      </DashboardLayout>
    </>
  );
}
