import { useState, useMemo } from "react";
import CommonPagination from "@/main/user/_components/CommonPagination";
import CommonTable, { type Column } from "@/main/user/_components/CustomTable";
import { Eye, Ban, Mail, Search, SlidersHorizontal } from "lucide-react";
// import ViewUser from "../overview/_components/ViewUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface BuyerData {
  id: number;
  name: string;
  accountType: string;
  phone: string;
  email: string;
  bids: number;
  image: string;
}

const ITEMS_PER_PAGE = 8;

const AllBuyers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("New");
  const [currentPage, setCurrentPage] = useState(1);
//   const [selectedUser, setSelectedUser] = useState<BuyerData | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
const navigate = useNavigate()
  // Expanded Mock Data for Pagination Testing
  const data: BuyerData[] = useMemo(
    () => [
      {
        id: 1,
        name: "Leia Hurley",
        accountType: "Buyer",
        phone: "+9876543210",
        email: "leia@email.com",
        bids: 56,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leia",
      },
      {
        id: 2,
        name: "Zaid Dennis",
        accountType: "Buyer",
        phone: "+9876543210",
        email: "zaid@email.com",
        bids: 148,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zaid",
      },
      {
        id: 3,
        name: "Maisie Patterson",
        accountType: "Buyer",
        phone: "+9876543210",
        email: "maisie@email.com",
        bids: 33,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maisie",
      },
      {
        id: 4,
        name: "Ella Clements",
        accountType: "Buyer",
        phone: "+9876543210",
        email: "ella@email.com",
        bids: 85,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ella",
      },
      {
        id: 5,
        name: "Abdiel Doyle",
        accountType: "Buyer",
        phone: "+9876543210",
        email: "abdiel@email.com",
        bids: 45,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdiel",
      },
      {
        id: 6,
        name: "Zaniyah York",
        accountType: "Buyer",
        phone: "+9876543210",
        email: "zaniyah@email.com",
        bids: 56,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zaniyah",
      },
      {
        id: 7,
        name: "Porter Hogan",
        accountType: "Buyer",
        phone: "+9876543210",
        email: "porter@email.com",
        bids: 180,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Porter",
      },
      {
        id: 8,
        name: "Kiaan Flowers",
        accountType: "Buyer",
        phone: "+9876543210",
        email: "kiaan@email.com",
        bids: 44,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kiaan",
      },
      {
        id: 9,
        name: "Jessica Best",
        accountType: "Buyer",
        phone: "+9876543210",
        email: "jessica@email.com",
        bids: 39,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      },
    ],
    [],
  );

  // 1. Search Logic
  const filteredData = useMemo(() => {
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, data]);

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const columns: Column<BuyerData>[] = [
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            className="w-10 h-10 rounded-full border border-slate-200 shadow-sm"
            alt=""
          />
          <span className="font-medium text-slate-700">{item.name}</span>
        </div>
      ),
    },
    { header: "Account Type", key: "accountType" },
    { header: "Phone", key: "phone" },
    { header: "Email", key: "email" },
    { header: "Bids/Auction", key: "bids" },
    {
      header: "Action",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/dashboard/users/${item.id}`)}
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
    <div className="p-4 space-y-6 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          All Buyers
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
        {/* Toolbar */}
        <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2 group">
              <SlidersHorizontal size={14} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase">
                Filter:
              </span>
              <Select
                value={filterStatus}
                onValueChange={(value) => setFilterStatus(value)}
              >
                <SelectTrigger className="!h-8 px-2 text-sm font-semibold text-slate-800 border-none shadow-none bg-transparent focus:ring-0">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent align="end">
                  <SelectItem value="New">Newest First</SelectItem>
                  <SelectItem value="Old">Oldest First</SelectItem>
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
              className="bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm w-full md:w-80 outline-none focus:ring-4 focus:ring-[#0064AE]/5 focus:bg-white focus:border-[#0064AE]/20 transition-all text-slate-700 font-medium"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <CommonTable columns={columns} data={paginatedData} />
        </div>

        {/* Footer */}
        <div className="p-4 px-6 flex flex-col sm:flex-row justify-between border-t border-slate-50 items-center bg-slate-50/20 gap-4">
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

 
    </div>
  );
};

export default AllBuyers;
