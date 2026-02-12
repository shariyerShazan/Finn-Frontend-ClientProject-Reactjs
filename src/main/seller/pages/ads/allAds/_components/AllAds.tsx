import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Eye, Edit, Trash2, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Column } from "@/main/user/_components/CustomTable";
import CommonTable from "@/main/user/_components/CustomTable";
import CommonPagination from "@/main/user/_components/CommonPagination";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface AdData {
  id: string;
  title: string;
  price: number;
  createdAt: string;
  isSold: boolean;
  images: { url: string }[];
  category: { name: string };
}

// --- Dummy Data ---
const ALL_ADS_DATA: AdData[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `ad-${i + 1}`,
  title: i % 2 === 0 ? `Modern Apartment ${i + 1}` : `SUV Car Model ${i + 1}`,
  price: 20000 + i * 500,
  createdAt: new Date(2025, 5, i + 1).toISOString(),
  isSold: i % 4 === 0,
  images: [{ url: `https://picsum.photos/seed/ad-${i}/200` }],
  category: { name: i % 2 === 0 ? "Real Estate" : "Vehicles" },
}));

const AllAds = () => {
  const navigate = useNavigate();

  // --- States ---
  const [allAds, setAllAds] = useState<AdData[]>(ALL_ADS_DATA);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 8;

  // --- Logic: Search & Status Filter ---
  const filteredAds = useMemo(() => {
    return allAds.filter((ad) => {
      const matchesSearch = ad.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
            ? !ad.isSold
            : ad.isSold;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, allAds]);

  // --- Logic: Pagination ---
  const totalPages = Math.ceil(filteredAds.length / limit);
  const paginatedAds = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredAds.slice(start, start + limit);
  }, [page, filteredAds]);

  const handleDelete = (id: string) => {
    if (!window.confirm("Permanent delete? This cannot be undone.")) return;
    setAllAds((prev) => prev.filter((ad) => ad.id !== id));
    toast.error("Ad removed from listings");
  };

  const columns: Column<AdData>[] = [
    {
      header: "Serial ID",
      render: (item) => (
        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
          #{item.id.toUpperCase()}
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
            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 line-clamp-1">
              {item.title}
            </span>
            <span className="text-[10px] text-blue-600 font-medium uppercase tracking-wider">
              {item.category.name}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Price/Rent",
      render: (item) => (
        <span className="font-bold text-slate-900">
          ${item.price.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Published",
      render: (item) => (
        <span className="text-slate-500 text-sm">
          {new Date(item.createdAt).toLocaleDateString("en-GB")}
        </span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <Badge
          className={`px-3 py-1 border-none shadow-none ${
            !item.isSold
              ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
              : "bg-orange-100 text-orange-700 hover:bg-orange-100"
          }`}
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
            className="p-2 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-full transition-colors border border-slate-100"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => navigate(`/seller/dashboard/ads/edit/${item.id}`)}
            className="p-2 bg-slate-50 hover:bg-green-50 text-slate-400 hover:text-green-600 rounded-full transition-colors border border-slate-100"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors border border-slate-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Top Controls */}
        <div className="p-6 border-b border-slate-50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Manage All Ads
              </h1>
              <p className="text-sm text-slate-500">
                View and manage your entire inventory of ads.
              </p>
            </div>

            <Button
              onClick={() => navigate("/seller/dashboard/ads/create")}
              className="bg-[#0064AE] hover:bg-[#005596] cursor-pointer text-white px-8 h-12 rounded-2xl font-bold shadow-lg shadow-blue-100 flex gap-2"
            >
              <Plus size={20} strokeWidth={3} /> Post New Ad
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[300px]">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                placeholder="Search ads by title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-12 h-12 bg-slate-50 border-slate-200 rounded-2xl focus-visible:ring-blue-600/20"
              />
            </div>

            {/* Status Select */}
            <div className="flex items-center gap-2">
              <div className="bg-slate-100 p-3 rounded-xl">
                <Filter size={18} className="text-slate-600" />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[180px] !h-12 rounded-2xl bg-white border-slate-200 font-medium">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="closed">Closed Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white">
          <CommonTable columns={columns} data={paginatedAds} />

          {filteredAds.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                <Search size={32} className="text-slate-200" />
              </div>
              <p className="text-slate-400 font-medium">
                No ads found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Pagination Section */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <CommonPagination
              currentPage={page}
              totalPages={totalPages || 1}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAds;
