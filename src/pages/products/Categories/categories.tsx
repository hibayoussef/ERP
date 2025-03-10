import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import { useFetchCategories } from "../../../hooks/prouducts/useCategories";

export default function Categories() {
  //   const [selectedBrand, setSelectedBrand] = useState(null);
  const { data, isLoading } = useFetchCategories();

  const categories: any = data || [];

  const handleEdit = (brand: any) => {
    // setSelectedBrand(brand);
    console.log("Editing category:", brand);
  };

  return (
    <>
      <PageMeta
        title="Categories Management | Dashboard"
        description="Manage your product categories in the system."
      />
      <PageBreadcrumb pageTitle="Categories" />

      <div className="space-y-4">
        <BasicTableOne
          rowData={categories}
          columnDefs={[]}
          // isLoading={isLoading}
          // onEdit={handleEdit}
        />
      </div>
    </>
  );
}
