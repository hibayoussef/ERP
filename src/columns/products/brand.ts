import { ColDef } from "ag-grid-community";

export const columnBrandDefs: ColDef<any>[] = [
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
  {
    headerName: "Actions",
    field: "actions",
    cellRenderer: "actionCellRenderer", 
  },
];
