import { DataTable } from "@/components/ui/table-data/table-data";
import { useNavigate } from "react-router";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import { useFetchBrands } from "../../../hooks/prouducts/useBrands";
import { brandColumns } from "@/columns/products/brand";

export default function Brands() {
  const { data } = useFetchBrands();
  const naviagate = useNavigate();
  const brands: any = data || [];

  return (
    <>
      <PageMeta
        title="Brands Management | Dashboard"
        description="Manage your product brands in the system."
      />
      <PageBreadcrumb pageTitle="Brands" />

      <div className="space-y-4">
        <ComponentCard title="Brand">
          <DataTable columns={brandColumns} data={brands} />
        </ComponentCard>
      </div>
    </>
  );
}
