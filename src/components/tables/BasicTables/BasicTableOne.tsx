import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
  RowSelectionModule,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";

ModuleRegistry.registerModules([RowSelectionModule, ClientSideRowModelModule]);

const BasicTableOne = ({ data, isLoading, onEdit }: { data: any, isLoading: boolean,  onEdit: (brand: any) => void }) => {
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "500px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  
  const columnDefs: ColDef[] = [
    { field: "name", headerName: "Brand Name", minWidth: 150 },
    { field: "category", headerName: "Category", minWidth: 150 },
    { field: "country", headerName: "Country", minWidth: 120 },
    { field: "createdAt", headerName: "Created At", minWidth: 130 },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: (params) => (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          onClick={() => onEdit(params.data)}
        >
          Edit
        </button>
      ),
      minWidth: 100,
      maxWidth: 120,
      sortable: false,
      filter: false,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
      resizable: true,
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
          enableRangeSelection={true}
        />
      </div>
    </div>
  );
};


export default BasicTableOne;
