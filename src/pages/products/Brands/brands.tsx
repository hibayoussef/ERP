import { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import { useFetchBrands } from "../../../hooks/useProducts";

export default function Brands() {
//   const [selectedBrand, setSelectedBrand] = useState(null);
  const { data, isLoading } = useFetchBrands();

  console.log("daa: ", data);
  const brands = data || [];

  const handleEdit = (brand: any) => {
    // setSelectedBrand(brand);
    console.log("Editing brand:", brand);
  };

  return (
    <>
      <PageMeta
        title="Brands Management | Dashboard"
        description="Manage your product brands in the system."
      />
      <PageBreadcrumb pageTitle="Brands" />

      <div className="space-y-4">
        <BasicTableOne
          data={brands}
          isLoading={isLoading}
          onEdit={handleEdit}
        />
      </div>
    </>
  );
}
