import { useNavigate } from "react-router";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Table from "../../../components/tables/BasicTables/BasicTableOne";
import { useFetchBrands } from "../../../hooks/prouducts/useBrands";
import { ColDef } from "ag-grid-community";

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

  interface RowData {
    id: number;
    name: string;
    age: number;
    country: string;
  }
  
  const rowData: RowData[] = [
    { id: 1, name: "Alice", age: 25, country: "USA" },
    { id: 2, name: "Bob", age: 30, country: "Canada" },
    { id: 3, name: "Charlie", age: 35, country: "UK" },
  ];
  
  const columnDefs: ColDef<RowData>[] = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    {
      headerName: "Age",
      field: "age",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
    { headerName: "Country", field: "country", sortable: true, filter: true },
  ];
  
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
          <Table rowData={rowData} columnDefs={columnDefs} />
        </ComponentCard>
      </div>
    </>
  );
}
