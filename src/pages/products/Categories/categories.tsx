import { categoryColumns } from "@/columns/products/category";
import { DataTable } from "@/components/ui/table-data/table-data";
import { useFetchCategories } from "@/hooks/prouducts/useCategories";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";

export default function Categories() {
  const { data } = useFetchCategories();
  const categories: any = data || [];

  return (
    <>
      <PageMeta
        title="Categories Management | Dashboard"
        description="Manage your product categories in the system."
      />
      <PageBreadcrumb pageTitle="Categories" />

      <div className="space-y-4">
        <ComponentCard title="Categories">
          <DataTable
            columns={categoryColumns}
            data={categories}
            createPath="/categories/create"
          />
        </ComponentCard>
      </div>
    </>
  );
}
