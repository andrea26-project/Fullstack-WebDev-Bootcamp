import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import { router } from "@inertiajs/react"
import Swal from "sweetalert2"

export default function HomePage() {
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#809080",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        router.visit("/dashboard/logout", {
          method: "post",
        })
      }
    })
  }

  return (
    <DashboardLayout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-[#fef8f5] p-8 rounded-xl border border-[#d6a89e] shadow-sm max-w-3xl w-full">
          <h1 className="text-3xl font-semibold text-[#7a6e5f] mb-2">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-[#7a6e5f] mb-6">
            Manage your products, categories, and orders all in one place.
          </p>

          <div className="flex items-center gap-4">
            <Button
              className="bg-[#809080] hover:bg-[#7a6e5f] text-white px-6 py-2 rounded-lg shadow"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


