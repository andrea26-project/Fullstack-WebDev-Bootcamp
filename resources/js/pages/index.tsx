import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Head, router } from "@inertiajs/react";

export default function Page() {
const handleOrder = () => {
    router.visit('/categories', {
        method: "get",
        data: {
            page: "1"
        },
onSuccess: () => {
    console.log("Selamat order Anda berhasil dibuat")
},
onError: () => {
    console.log("Terjadi kesalahan");
}

    });
}

  return (
    <>
   <Head title="Dashboard" />
    <DashboardLayout>
        <button onClick={handleOrder}>Order Now</button>
        </DashboardLayout>
        </>
  )
}
