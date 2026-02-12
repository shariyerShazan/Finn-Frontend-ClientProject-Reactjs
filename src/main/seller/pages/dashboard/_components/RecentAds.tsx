

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Column } from "@/main/user/_components/CustomTable";
import CommonTable from "@/main/user/_components/CustomTable";
import CommonPagination from "@/main/user/_components/CommonPagination";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// --- Fake Data Generator ---
const GENERATED_FAKE_DATA: AdData[] = Array.from({ length: 25 }).map(
  (_, i) => ({
    id: `uuid-${i + 1}`,
    title:
      i % 2 === 0 ? `Luxury Villa ${i + 1}` : `Tesla Model ${i + 1} Edition`,
    price: 15000 + i * 1000,
    createdAt: new Date(2025, 6, i + 1).toISOString(),
    isSold: i % 3 === 0,
    images: [{ url: `https://picsum.photos/seed/${i + 40}/200` }],
    category: { name: i % 2 === 0 ? "Real Estate" : "Vehicles" },
  }),
);

interface AdData {
  id: string;
  title: string;
  price: number;
  createdAt: string;
  isSold: boolean;
  images: { url: string }[];
  category: { name: string };
}

const RecentAds = () => {
  const navigate = useNavigate();

  // --- States ---
  const [allAds, setAllAds] = useState<AdData[]>(GENERATED_FAKE_DATA);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  // --- Logic: Search & Filter ---
  const filteredAds = useMemo(() => {
    return allAds.filter((ad) =>
      ad.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, allAds]);

  // --- Logic: Pagination ---
  const totalPages = Math.ceil(filteredAds.length / limit);
  const paginatedAds = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredAds.slice(start, start + limit);
  }, [page, filteredAds]);

  // --- Delete Logic (Fake) ---
  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    setAllAds((prev) => prev.filter((ad) => ad.id !== id));
    toast.success("Ad deleted (Fake)");
  };

  const columns: Column<AdData>[] = [
    {
      header: "Serial ID",
      render: (item) => (
        <span className="text-xs text-slate-400 font-mono">
          #{item.id.slice(-6).toUpperCase()}
        </span>
      ),
    },
    {
      header: "Ads Title",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.images[0]?.url}
            alt=""
            className="w-10 h-10 rounded-md object-cover border shadow-sm"
          />
          <span className="font-medium truncate max-w-[150px] text-slate-700">
            {item.title}
          </span>
        </div>
      ),
    },
    {
      header: "Price",
      render: (item) => (
        <span className="font-semibold text-slate-900">
          ${item.price.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Published",
      render: (item) => (
        <span className="text-slate-500">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <Badge
          className={
            !item.isSold
              ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-emerald-100 shadow-none"
              : "bg-slate-100 text-slate-500 hover:bg-slate-100 border-none shadow-none"
          }
        >
          {!item.isSold ? "Active" : "Closed"}
        </Badge>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/ads/${item.id}`)}
            className="p-1.5 text-slate-400 hover:text-[#0064AE] hover:bg-blue-50 border border-slate-200 rounded-md transition-all cursor-pointer"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => navigate(`/seller/dashboard/ads/edit/${item.id}`)}
            className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 border border-slate-200 rounded-md transition-all cursor-pointer"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200 rounded-md transition-all cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header & Controls */}
      <div className="p-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-50">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Recent Ads
          </h2>

          <div className="hidden sm:flex border rounded-lg overflow-hidden ml-2 shadow-sm border-slate-200">
            <Button
              variant="ghost"
              className="rounded-none border-r bg-slate-50 text-slate-500 h-9 text-xs hover:bg-slate-100"
            >
              Filter
            </Button>
            <Button
              variant="ghost"
              className="rounded-none h-9 text-xs font-bold text-[#0064AE] bg-blue-50/50"
            >
              Ads
            </Button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <Input
              placeholder="Search by title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-2 focus-visible:ring-[#0064AE]/20 focus-visible:border-[#0064AE]"
            />
          </div>
        </div>

        <Button
          onClick={() => navigate("/seller/dashboard/ads/create")}
          className="bg-[#0064AE] hover:bg-[#004e8a] cursor-pointer text-white px-6 py-5 rounded-xl flex items-center gap-2 font-bold transition-all active:scale-95 shadow-lg shadow-blue-100"
        >
          Post New <Plus size={20} strokeWidth={2.5} />
        </Button>
      </div>

      {/* Table Section */}
      <div className="min-h-[400px]">
        <CommonTable columns={columns} data={paginatedAds} />
      </div>

      {/* Pagination Section */}
      <div className="p-4 bg-slate-50/30 border-t border-slate-100">
        <CommonPagination
          currentPage={page}
          totalPages={totalPages || 1}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default RecentAds;
