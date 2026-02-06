/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import CommonPagination from "@/main/user/_components/CommonPagination";
import CommonTable, { type Column } from "@/main/user/_components/CustomTable";
import { Eye, Ban, Mail, Search } from "lucide-react";
import AdminStat from "./_components/AdminStats";
import ViewUser from "./_components/ViewUser";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserData {
  id: number;
  name: string;
  accountType: "Seller" | "Buyer";
  phone: string;
  email: string;
  bids: number;
  image: string;
}

const ITEMS_PER_PAGE = 5;

const AdminOverview = () => {
  // --- States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Seller" | "Buyer">(
    "All",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Raw Data ---
  const rawData: UserData[] = [
    {
      id: 1,
      name: "Sam Abid",
      accountType: "Seller",
      phone: "+123456709",
      email: "abid@email.com",
      bids: 65,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    },
    {
      id: 2,
      name: "Avah Shelton",
      accountType: "Seller",
      phone: "+123456709",
      email: "avah@email.com",
      bids: 26,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Avah",
    },
    {
      id: 3,
      name: "Eliza Boone",
      accountType: "Buyer",
      phone: "+123456709",
      email: "eliza@email.com",
      bids: 39,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eliza",
    },
    {
      id: 4,
      name: "Lian Morrow",
      accountType: "Buyer",
      phone: "+123456709",
      email: "lian@email.com",
      bids: 55,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lian",
    },
    {
      id: 5,
      name: "Rey Hardy",
      accountType: "Buyer",
      phone: "+123456709",
      email: "rey@email.com",
      bids: 49,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rey",
    },
    {
      id: 6,
      name: "Zora Barr",
      accountType: "Buyer",
      phone: "+123456709",
      email: "zora@email.com",
      bids: 103,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zora",
    },
    {
      id: 7,
      name: "Mathew Soto",
      accountType: "Seller",
      phone: "+123456709",
      email: "mathew@email.com",
      bids: 258,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mathew",
    },
  ];

  // --- Logic: Search & Filter ---
  const filteredData = useMemo(() => {
    return rawData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterType === "All" || user.accountType === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  // --- Logic: Pagination ---
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleViewDetails = (user: UserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const columns: Column<UserData>[] = [
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt=""
            className="w-10 h-10 rounded-full border border-slate-200"
          />
          <span className="font-medium text-slate-700">{item.name}</span>
        </div>
      ),
    },
    { header: "Account Type", key: "accountType" },
    { header: "Phone", key: "phone" },
    { header: "Email", key: "email" },
    { header: "Bid/Auction", key: "bids" },
    {
      header: "Action",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewDetails(item)}
            className="p-1.5 rounded-full border border-slate-200 text-slate-400 hover:text-[#0064AE] hover:bg-blue-50 transition-all"
          >
            <Eye size={18} strokeWidth={1.5} />
          </button>
          <button className="p-1.5 rounded-full border border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
            <Ban size={18} strokeWidth={1.5} />
          </button>
          <button className="p-1.5 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 transition-all">
            <Mail size={18} strokeWidth={1.5} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-6 mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        Hello, Annette Black!
      </h1>

      <AdminStat />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* --- Functional Toolbar --- */}
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
          <div className="text-[#0064AE] font-bold border-b-2 border-[#0064AE] pb-4 -mb-4 z-10">
            Recently Registered
          </div>

          <div className="flex items-center gap-3 self-end">
            {/* Filter Dropdown */}
            <Select
              value={filterType}
              onValueChange={(value) => {
                setFilterType(value as any);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[160px] h-9 text-sm font-medium border-slate-200 focus:ring-2 focus:ring-[#0064AE]/10">
                <SelectValue placeholder="Filter users" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="All">All Users</SelectItem>
                <SelectItem value="Seller">Sellers</SelectItem>
                <SelectItem value="Buyer">Buyers</SelectItem>
              </SelectContent>
            </Select>

            {/* Functional Search */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0064AE]/10 transition-all">
              <Search size={14} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent outline-none text-sm w-48 text-slate-700 placeholder:text-slate-400"
              />
            </div>

            {/* <button className="bg-[#0064AE] text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-[#004f8b] shadow-sm active:scale-95 transition-all">
              Add Manually +
            </button> */}
          </div>
        </div>

        <CommonTable columns={columns} data={paginatedData} />

        <div className="p-4 bg-slate-50/30 border-t border-slate-100 flex justify-between items-center">
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      </div>

      {/* Modal - Make sure this component uses shadcn Dialog correctly */}
      <ViewUser
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdminOverview;
