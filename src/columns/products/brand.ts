import { ColDef } from "ag-grid-community";
import { IBrand } from "../../types/products/brand";

export const columnBrandDefs: ColDef<IBrand>[] = [
  { headerName: "ID", field: "id", sortable: true, filter: true },
  {
    headerName: "brand_name_en",
    field: "brand_name_en",
    sortable: true,
    filter: true,
  },
  {
    headerName: "description_en",
    field: "description_en",
    sortable: true,
    filter: true,
  },
];
