import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  ModuleRegistry,
  NumberFilterModule,
  SideBarDef,
  TextFilterModule,
  ValidationModule,
  createGrid,
  type ColumnMenuTab,
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  PivotModule,
  SetFilterModule,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";

ModuleRegistry.registerModules([
  NumberFilterModule,
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  PivotModule,
  SetFilterModule,
  TextFilterModule,
  ValidationModule,
]);

const BasicTableOne = ({
  data,
  isLoading,
  onEdit,
}: {
  data: any;
  isLoading: boolean;
  onEdit: (brand: any) => void;
}) => {
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "500px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const columnDefs: ColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 150,
      enableRowGroup: true,
      enablePivot: true,
      filter: true,
      menuTabs: ["generalMenuTab", "filterMenuTab"] as ColumnMenuTab[],
    },
    {
      field: "brand_name_en",
      headerName: "Brand Name",
      minWidth: 150,
      enableRowGroup: true,
      enablePivot: true,
      menuTabs: ["generalMenuTab", "filterMenuTab"] as ColumnMenuTab[],
    },
    {
      field: "description_en",
      headerName: "Description",
      minWidth: 150,
      enableRowGroup: true,
      enablePivot: true,
      menuTabs: ["generalMenuTab", "filterMenuTab"] as ColumnMenuTab[],
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
      resizable: true,
      menuTabs: ["generalMenuTab", "filterMenuTab"] as ColumnMenuTab[],
    }),
    []
  );

  if (isLoading) return <>loading...</>;

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          pagination={true}
          enableRangeSelection={true} // تم إزالة suppressHeaderHover هنا
        />
      </div>
    </div>
  );
};

export default BasicTableOne;
