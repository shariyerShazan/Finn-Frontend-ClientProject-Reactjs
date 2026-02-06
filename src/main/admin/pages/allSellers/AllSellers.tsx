import { useState, useMemo } from "react";
import CommonPagination from "@/main/user/_components/CommonPagination";
import CommonTable, { type Column } from "@/main/user/_components/CustomTable";
import { Eye, Ban, Mail, Search } from "lucide-react";
// import ViewUser from "../overview/_components/ViewUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface SellerData {
  id: number;
  name: string;
  accountType: string;
  phone: string;
  email: string;
  bids: number;
  image: string;
}

const ITEMS_PER_PAGE = 5; // Ek page-e koyta data dekhabe

const AllSellers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
//   const [selectedUser, setSelectedUser] = useState<SellerData | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
const navigate = useNavigate()

  // Sample Data (14 items for testing pagination)
  const data: SellerData[] = Array.from({ length: 14 }).map((_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? "Sam Abid" : "Avah Shelton",
    accountType: "Seller",
    phone: "+123456709",
    email: i % 2 === 0 ? `abid${i}@email.com` : `avah${i}@email.com`,
    bids: 20 + i,
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  }));

  // 1. Functional Search Logic
  const filteredData = useMemo(() => {
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, data]);

  // 2. Functional Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  const columns: Column<SellerData>[] = [
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            className="w-10 h-10 rounded-full border border-slate-200 object-cover"
            alt=""
          />
          <span className="font-medium text-slate-700">{item.name}</span>
        </div>
      ),
    },
    { header: "Account Type", key: "accountType" },
    { header: "Phone", key: "phone" },
    { header: "Email", key: "email" },
    { header: "Listings/Ads", key: "bids" },
    {
      header: "Action",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate(`/admin/dashboard/sellers/${item.id}`)
            }
            className="p-2 rounded-full border border-slate-100 text-slate-400 hover:text-[#0064AE] hover:bg-blue-50 transition-all"
          >
            <Eye size={18} strokeWidth={1.5} />
          </button>
          <button className="p-2 rounded-full border border-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
            <Ban size={18} strokeWidth={1.5} />
          </button>
          <button className="p-2 rounded-full border border-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all">
            <Mail size={18} strokeWidth={1.5} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-6  mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          All Sellers
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Functional Toolbar */}
        <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Status:
              </span>
              <Select defaultValue="Active">
                <SelectTrigger className="!h-8 px-2 text-sm font-semibold text-slate-700 border-none shadow-none bg-transparent focus:ring-0">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent align="end">
                  <SelectItem value="Active">Active Sellers</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0064AE] transition-colors"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm w-full md:w-80 outline-none focus:ring-2 focus:ring-[#0064AE]/10 focus:bg-white transition-all text-slate-700 font-medium"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Search korle 1st page-e niye jabe
              }}
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <CommonTable columns={columns} data={paginatedData} />
        </div>

        {/* Functional Footer with Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Modal Integration */}

    </div>
  );
};

export default AllSellers;
