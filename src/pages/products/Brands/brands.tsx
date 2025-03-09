import { useNavigate } from "react-router";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import { useFetchBrands } from "../../../hooks/prouducts/useBrands";

export default function Brands() {
  //   const [selectedBrand, setSelectedBrand] = useState(null);
  const { data, isLoading, refetch } = useFetchBrands();
  const naviagate = useNavigate();
  const brands = data || [];

  const handleEdit = (brand: any) => {
    // setSelectedBrand(brand);
    console.log("Editing brand:", brand);
  };

  const handleCreate = async () => {
    await refetch();
  };

  return (
    <>
      <PageMeta
        title="Brands Management | Dashboard"
        description="Manage your product brands in the system."
      />
      <PageBreadcrumb pageTitle="Brands" />

      <div className="space-y-4">
        <ComponentCard
          title="Brand"
          onCreate={() => naviagate("/brands/create")}
        >
          <BasicTableOne
            data={brands}
            isLoading={isLoading}
            onEdit={handleEdit}
          />{" "}
        </ComponentCard>
      </div>
    </>
  );
}
