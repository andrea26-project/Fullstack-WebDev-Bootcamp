import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@inertiajs/react"
import Swal from "sweetalert2"
import React from "react"

interface Category {
  id: string
  name: string
  created_at: Date
  updated_at: Date
}

interface Props {
  category?: Category
}

export default function CategoryForm({ category }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: category ? category.name : "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const action = category
      ? put(route('categories.update', category.id), {
          onSuccess: () =>
            Swal.fire("Success!", "Category has been updated.", "success"),
          onError: () =>
            Swal.fire("Error!", "Please check the form for errors.", "error"),
        })
      : post(route('categories.store'), {
          onSuccess: () =>
            Swal.fire("Success!", "Category has been created.", "success"),
          onError: () =>
            Swal.fire("Error!", "Please check the form for errors.", "error"),
        })
  }

  return (
    <DashboardLayout>
      <div className="px-6 py-10">
        <h2 className="text-2xl font-semibold text-[#7a6e5f]">
          {category ? "Edit Category" : "Create Category"}
        </h2>
        <p className="text-sm text-[#7a6e5f] mb-6">
          {category
            ? "Update this category’s details."
            : "Add a new category below."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-md">
          <div>
            <Label className="text-[#7a6e5f]">Name</Label>
            <Input
              name="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="mt-1 border-[#d6a89e] focus:border-[#7a6e5f] bg-[#fef8f5] w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <Button
            disabled={processing}
            className="bg-[#809080] hover:bg-[#7a6e5f] text-white px-6 py-2 rounded-lg shadow-sm"
          >
            {category ? "Update Category" : "Create Category"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}
