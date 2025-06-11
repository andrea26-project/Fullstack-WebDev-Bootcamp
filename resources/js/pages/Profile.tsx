import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Head } from "@inertiajs/react";

export default function Profile() {
  const tab = new URLSearchParams(window.location.search).get("tab");

  return (
    <>
      <Head title="Profile" />
      <DashboardLayout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
          <p>This is the profile page.</p>
        </div>
      </DashboardLayout>
    </>
  );
}
