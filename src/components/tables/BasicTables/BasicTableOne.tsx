import jsPDF from "jspdf";
import "jspdf-autotable";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { FaFilePdf, FaPrint } from "react-icons/fa";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: { images: ["/images/user/user-22.jpg", "/images/user/user-23.jpg"] },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: { images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"] },
    budget: "24.9K",
    status: "Pending",
  },
];

const columns = [
  {
    name: "User",
    selector: (row: Order) => row.user.name,
    cell: (row: Order) => (
      <div className="flex items-center gap-2">
        <img
          src={row.user.image}
          alt={row.user.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{row.user.name}</p>
          <p className="text-sm text-gray-500">{row.user.role}</p>
        </div>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Project Name",
    selector: (row: Order) => row.projectName,
    sortable: true,
  },
  {
    name: "Team",
    selector: (row: Order) => row.team.images.length.toString(),
    cell: (row: Order) => (
      <div className="flex -space-x-2">
        {row.team.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Team ${index}`}
            className="w-6 h-6 rounded-full border-2 border-white"
          />
        ))}
      </div>
    ),
  },
  {
    name: "Status",
    selector: (row: Order) => row.status,
    cell: (row: Order) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold ${
          row.status === "Active"
            ? "bg-green-200 text-green-800"
            : row.status === "Pending"
            ? "bg-yellow-200 text-yellow-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
  {
    name: "Budget",
    selector: (row: Order) => row.budget,
    sortable: true,
  },
];

const exportToPDF = () => {
  const doc = new jsPDF();
  doc.text("Orders Table", 14, 10);
  const tableColumn = ["User", "Project Name", "Team Size", "Status", "Budget"];
  const tableRows: any[] = [];

  tableData.forEach((order) => {
    const rowData = [
      order.user.name,
      order.projectName,
      order.team.images.length,
      order.status,
      order.budget,
    ];
    tableRows.push(rowData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("orders_table.pdf");
};

const printTable = () => {
  window.print();
};

const dataTableData = {
  columns,
  data: tableData,
  exportHeaders: true,
};

export default function OrdersTable() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Orders Table
      </h2>

      {/* أزرار الطباعة والتصدير */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-200"
        >
          <FaFilePdf className="size-5" />
          Export as PDF
        </button>

        <button
          onClick={printTable}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          <FaPrint className="size-5" />
          Print Table
        </button>
      </div>

      {/* جدول البيانات */}
      <DataTableExtensions {...dataTableData}>
        <DataTable
          columns={columns}
          data={tableData}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
}
