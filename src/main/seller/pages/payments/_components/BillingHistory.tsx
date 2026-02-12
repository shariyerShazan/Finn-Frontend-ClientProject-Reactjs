import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, Download, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Column } from "@/main/user/_components/CustomTable";
import CommonTable from "@/main/user/_components/CustomTable";
import CommonPagination from "@/main/user/_components/CommonPagination";

interface BillingData {
  id: string;
  invoiceId: string;
  details: string;
  image: string;
  charges: number;
  date: string;
  status: "Complete" | "Pending" | "Faild";
}

// --- Fake Data Generator ---
const BILLING_DATA: BillingData[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `${i + 1}`,
  invoiceId: `INV${600000 + Math.floor(Math.random() * 90000)}`,
  details:
    i % 2 === 0 ? "2BR Condo with Huge Balcony" : "Tesla Model 3 – Long Range",
  image:
    i % 2 === 0
      ? "https://picsum.photos/seed/house/200"
      : "https://picsum.photos/seed/car/200",
  charges: 19.23,
  date: "06/04/19 1:18 PM",
  status: i % 3 === 0 ? "Complete" : i % 3 === 1 ? "Pending" : "Faild",
}));

const BillingHistory = () => {
  // --- States ---
  const [data] = useState<BillingData[]>(BILLING_DATA);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  // --- Search Logic ---
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
        item.details.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, data]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredData.length / limit);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredData.slice(start, start + limit);
  }, [page, filteredData]);

  const columns: Column<BillingData>[] = [
    {
      header: "SL",
      render: (item) => (
        <span className="text-slate-400 font-medium">{item.id}</span>
      ),
    },
    {
      header: "Invoice ID",
      render: (item) => (
        <span className="font-medium text-slate-700">{item.invoiceId}</span>
      ),
    },
    {
      header: "Details",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt=""
            className="w-10 h-10 rounded-md object-cover border border-slate-100"
          />
          <span className="text-sm font-medium text-slate-600 truncate max-w-[180px]">
            {item.details}
          </span>
        </div>
      ),
    },
    {
      header: "Charges",
      render: (item) => (
        <span className="font-bold text-slate-900">
          ${item.charges.toFixed(2)}
        </span>
      ),
    },
    {
      header: "Date",
      render: (item) => (
        <span className="text-slate-500 text-sm">{item.date}</span>
      ),
    },
    {
      header: "Status",
      render: (item) => {
        const statusStyles = {
          Complete: "bg-emerald-50 text-emerald-600 border-emerald-100",
          Pending: "bg-blue-50 text-blue-600 border-blue-100",
          Faild: "bg-red-50 text-red-500 border-red-100",
        };
        return (
          <Badge
            className={`shadow-none font-semibold ${statusStyles[item.status]}`}
          >
            {item.status}
          </Badge>
        );
      },
    },
    {
      header: "Action",
      render: () => (
        <div className="flex items-center gap-2">
          <button className="p-2 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer">
            <Download size={16} />
          </button>
          <button className="p-2 text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
            <Printer size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header with Search */}
      <div className="p-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-50">
        <h2 className="text-xl font-bold text-slate-800">Billing History</h2>

        <div className="relative w-full sm:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <Input
            placeholder="Search by invoice or title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-[#0064AE]/20"
          />
        </div>
      </div>

      {/* Custom Table Component */}
      <div className="min-h-[450px]">
        <CommonTable columns={columns} data={paginatedData} />
      </div>

      {/* Pagination Footer */}
      <div className="p-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
        <CommonPagination
          currentPage={page}
          totalPages={totalPages || 1}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default BillingHistory;
