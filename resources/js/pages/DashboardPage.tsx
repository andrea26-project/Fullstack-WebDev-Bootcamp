import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Head, router } from "@inertiajs/react";

export default function DashboardPage() {
  const handleNavigation = () => {
    router.visit("/profile", {
      method: "get",
      data: {
        tab: "settings",
      },
      onSuccess: () => {
        console.log("Berhasil berpindah halaman!");
      },
      onError: (errors) => {
        console.log("Terjadi kesalahan:", errors);
      },
    });
  };

  return (
    <>
      <Head title="Dashboard Assignment" />
      <DashboardLayout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Assignment Dashboard</h1>
          <button
  onClick={handleNavigation}
  className="bg-orange-300 text-black px-4 py-2 rounded"
>
  Go to Profile
</button>

        </div>
      </DashboardLayout>
    </>
  );
}
