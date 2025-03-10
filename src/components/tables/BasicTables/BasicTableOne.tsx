import { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import * as XLSX from "xlsx";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface TableProps<T> {
  rowData: T[];
  columnDefs: ColDef<T>[];
}

const Table = <T,>({ rowData, columnDefs }: TableProps<T>) => {
  const gridRef = useRef<AgGridReact<T>>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    columnDefs.map((col) => col.field as string)
  );

  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
  };

  const exportToExcel = () => {
    const rowData: any[] = [];
    gridRef.current?.api.forEachNode((node) => {
      const filteredData = Object.fromEntries(
        Object.entries(node?.data || {}).filter(([key]) =>
          visibleColumns.includes(key)
        )
      );
      rowData.push(filteredData);
    });

    const worksheet = XLSX.utils.json_to_sheet(rowData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  const printTable = () => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: "print",
      columnKeys: visibleColumns,
    });
    setTimeout(() => window.print(), 1000);
  };

  const toggleColumnVisibility = (field: string) => {
    setVisibleColumns((prev) =>
      prev.includes(field)
        ? prev.filter((col) => col !== field)
        : [...prev, field]
    );
  };

  const filteredColumnDefs = useMemo(
    () =>
      columnDefs.filter((col) => visibleColumns.includes(col.field as string)),
    [columnDefs, visibleColumns]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="w-full p-4">
      <div className="flex gap-2 mb-2 relative">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Export to Excel
        </button>
        <button
          onClick={printTable}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Print
        </button>

        {/* Column Visibility Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Manage Columns
          </button>

          {menuOpen && (
            <div className="absolute left-0 mt-2 bg-white border rounded shadow-md p-2 w-48 z-10">
              {columnDefs.map((col) => (
                <label
                  key={col.field}
                  className="flex items-center gap-2 px-2 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.field as string)}
                    onChange={() => toggleColumnVisibility(col.field as string)}
                  />
                  {col.headerName}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="ag-theme-alpine w-full h-[500px]">
        <AgGridReact<T>
          ref={gridRef}
          rowData={rowData}
          columnDefs={filteredColumnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default Table;
