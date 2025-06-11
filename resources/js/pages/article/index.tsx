import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Head } from "@inertiajs/react";

interface Article {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

interface Props {
    article: Article[]
}

export default function OrderPage({article}: Props) {

  return (
     <>
   <Head title="Articles" />
    <DashboardLayout>
        <h1>Hello Article</h1>
        </DashboardLayout>
        </>
)
}
