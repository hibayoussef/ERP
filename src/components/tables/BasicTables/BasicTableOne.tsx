import {
  ClientSideRowModelModule,
  ColDef,
  GridOptions,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  ValidationModule,
  CsvExportModule,
  type ColumnMenuTab,
  type GridApi,
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  PivotModule,
  SetFilterModule,
  ExcelExportModule,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef } from "react";

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
  CsvExportModule,
  ExcelExportModule
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
      filter: true,
      menuTabs: ["generalMenuTab", "filterMenuTab"],
    },
    {
      field: "brand_name_en",
      headerName: "Brand Name",
      minWidth: 150,
      menuTabs: ["generalMenuTab", "filterMenuTab"],
    },
    {
      field: "description_en",
      headerName: "Description",
      minWidth: 150,
      menuTabs: ["generalMenuTab", "filterMenuTab"],
    },
  ];

  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
    menuTabs: ["generalMenuTab", "filterMenuTab"] as ColumnMenuTab[],
  };


  const gridOptions: GridOptions = {
    rowSelection: "multiple",
    enableRangeSelection: true,
    pagination: true,
    paginationPageSize: 10,
  };

  let gridApi: GridApi<any>;

  function onBtExport() {
    gridApi!.exportDataAsExcel();
  }

    const gridRef = useRef<any>(null);

    const exportToCSV = () => {
      gridRef.current.api.exportDataAsCsv();
    };

    const exportToExcel = () => {
      gridRef.current.api.exportDataAsExcel();
    };

  if (isLoading) return <>loading...</>;

  return (
    <div style={containerStyle}>
      <div>
        <button
          onClick={exportToCSV}
          className="bg-blue-500 text-white p-2 m-2"
        >
          Export CSV
        </button>
        <button
          onClick={exportToExcel}
          className="bg-green-500 text-white p-2 m-2"
        >
          Export Excel
        </button>
      </div>
      <div style={gridStyle}>
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
          pagination={true}
          paginationPageSize={10}
          enableRangeSelection={true}
          gridOptions={gridOptions}
        />
      </div>
    </div>
  );
};

export default BasicTableOne;
