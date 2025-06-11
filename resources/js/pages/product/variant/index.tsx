import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Head, Link } from "@inertiajs/react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"

export interface ProductVariant {
  id: string
  variant_name: string
  stock: number
  image: string | null
}

interface Props {
  product: {
    id: string
    name: string
  }
  variants: ProductVariant[]
}

export default function VariantIndex({ product, variants }: Props) {
  return (
    <>
      <Head title={`Variants for ${product.name}`} />
      <DashboardLayout>
        <div className="px-6 py-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#7a6e5f]">
                Variants for: {product.name}
              </h2>
              <p className="text-sm text-[#7a6e5f]">Manage product variants below.</p>
            </div>
            <Link href={route('products.variants.create', [product.id])}>
              <Button className="bg-[#809080] hover:bg-[#7a6e5f] text-white">
                + Add Variant
              </Button>
            </Link>
          </div>
          <DataTable columns={columns(product.id)} data={variants} />
        </div>
      </DashboardLayout>
    </>
  )
}
