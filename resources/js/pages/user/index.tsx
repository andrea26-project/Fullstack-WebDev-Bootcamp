import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Head } from "@inertiajs/react";

interface User {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

interface Props {
    user: User[]
}

export default function OrderPage({user}: Props) {

  return (
    <>
   <Head title="Users" />
    <DashboardLayout>
      <h1>Hello Article</h1>
    </DashboardLayout>
    </>
)
}
