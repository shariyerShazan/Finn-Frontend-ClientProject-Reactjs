/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import CommonPagination from "@/main/user/_components/CommonPagination";
import CommonTable from "@/main/user/_components/CustomTable";
import { Eye, Mail, Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ----------------------------------
 Mock Data (realistic & scalable)
----------------------------------- */
const REPORTS = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  user: {
    name: `User ${i + 1}`,
    image: `https://i.pravatar.cc/150?u=${i + 1}`,
  },
  ad: {
    title: "2BR Condo with Huge Balcony",
    price: `$${(12000 + i * 250).toLocaleString()}`,
    image:
      "https://play-lh.googleusercontent.com/AViRY0huu7udMnyxtCsk0xUlpCbABp3zH-kf1Pcyi8LKV3vOtLIY78K5YmuhR8dnVcc=w240-h480-rw",
  },
  message: "Hey! I want to report this ad for misleading info.",
  createdAt: new Date(Date.now() - i * 86400000), // date diff
}));

const PAGE_SIZE = 5;

const AdminReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"new" | "old">("new");
const navigate = useNavigate()
  /* ----------------------------------
   Filter + Sort + Search
  ----------------------------------- */
  const processedData = useMemo(() => {
    let data = [...REPORTS];

    if (search) {
      data = data.filter(
        (r) =>
          r.user.name.toLowerCase().includes(search.toLowerCase()) ||
          r.ad.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    data.sort((a, b) =>
      sort === "new"
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime(),
    );

    return data;
  }, [search, sort]);

  const totalPages = Math.ceil(processedData.length / PAGE_SIZE);
  const paginatedData = processedData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  /* ----------------------------------
   Table Columns
  ----------------------------------- */
  const columns = [
    {
      header: "Name",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <img
            src={item.user.image}
            className="w-10 h-10 rounded-full border border-slate-100 object-cover"
          />
          <span className="text-sm font-bold text-slate-700">
            {item.user.name}
          </span>
        </div>
      ),
    },
    {
      header: "Ads",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <img
            src={
              item.ad.image ||
              "https://play.google.com/store/apps/details?id=be.persgroep.red.mobile.android.adn"
            }
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <p className="text-xs font-bold text-slate-800 line-clamp-1">
              {item.ad.title}
            </p>
            <p className="text-[11px] font-bold text-[#0064AE]">
              {item.ad.price}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Message",
      render: (item: any) => (
        <span className="text-xs font-semibold text-[#0064AE] hover:underline cursor-pointer">
          {item.message}
        </span>
      ),
    },
    {
      header: "Date",
      render: (item: any) => (
        <div>
          <p className="text-xs font-bold text-slate-600">
            {item.createdAt.toLocaleDateString()}
          </p>
          <p className="text-[10px] font-medium text-slate-400">
            {item.createdAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ),
    },
    {
      header: "Action",
      render: () => (
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("ksfj")} className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-[#0064AE] transition">
            <Eye size={16} strokeWidth={2.5} />
          </button>
          <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-600 transition">
            <Mail size={16} strokeWidth={2.5} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
        {/* Header / Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500">Filter</span>

            <button
              onClick={() => {
                setSort(sort === "new" ? "old" : "new");
                setCurrentPage(1);
              }}
              className="flex items-center gap-4 px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              {sort === "new" ? "Newest" : "Oldest"}
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search reports..."
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Table */}
        <CommonTable columns={columns} data={paginatedData} />

        {/* Pagination */}
        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">

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

export default AdminReport;
