import { Head } from "@inertiajs/react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { DataTable } from "./data-table";
import { columns, Order } from "./columns";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/orders").then((res) => {
      setOrders(res.data.data);
    });
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head title="Orders" />
      <DashboardLayout>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-[#7a6e5f]">Orders</h1>
          </div>

          <div className="mb-4 max-w-xs">
            <Input
              type="text"
              placeholder="Search order or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-[#809080] text-[#7a6e5f]"
            />
          </div>

          <DataTable columns={columns} data={filteredOrders} />
        </div>
      </DashboardLayout>
    </>
  );
}
