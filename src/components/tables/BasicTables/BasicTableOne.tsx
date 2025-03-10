import { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import * as XLSX from "xlsx";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { MdPrint } from "react-icons/md"; // أيقونة الطباعة
import { AiOutlineFileExcel } from "react-icons/ai"; // أيقونة التصدير
import { ExportIcon } from "../../../icons";

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
    if (!gridRef.current) return;

    const headerRow = visibleColumns
      .map(
        (col) =>
          `<th>${
            columnDefs.find((c) => c.field === col)?.headerName || col
          }</th>`
      )
      .join("");

    const bodyRows = rowData
      .map((row: any) => {
        const rowDataHtml = visibleColumns
          .map((col) => `<td>${row[col] ?? ""}</td>`)
          .join("");
        return `<tr>${rowDataHtml}</tr>`;
      })
      .join("");

    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <table>
            <thead><tr>${headerRow}</tr></thead>
            <tbody>${bodyRows}</tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
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
      <div className="flex gap-4 justify-end mb-2 relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="px-4 py-2 bg-gray-500 text-white rounded flex items-center gap-2 cursor-pointer transition duration-300 hover:bg-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4 6h16M4 12h16m-7 6h7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          manage Column
        </button>

        {/* bg-[#575db1] hover:bg-[#474ca1] */}
        <button
          onClick={exportToExcel}
          className="p-1.5 bg-[#474ca1] text-white rounded-lg flex items-center justify-center gap-2 cursor-pointer transition duration-300 hover:bg-[#474ca1]"
          title="Export to Excel"
        >
          <ExportIcon className="w-7 h-7" />
          Export
        </button>

        <button
          onClick={printTable}
          className="p-1.5 bg-[#474ca1] text-white rounded-lg flex items-center justify-center cursor-pointer transition duration-300 hover:bg-[#474ca1]"
          title="طباعة الجدول"
        >
          <MdPrint className="w-6 h-6" />
          Print
        </button>

        {/* زر إدارة الأعمدة */}
        <div className="relative" ref={menuRef}>
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

      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact<T>
          ref={gridRef}
          rowData={rowData}
          columnDefs={filteredColumnDefs}
          defaultColDef={defaultColDef}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default Table;
