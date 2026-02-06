"use client";
import { useState } from "react";
import { LayoutGrid, Map as MapIcon } from "lucide-react";
import FilterSearch from "./_components/FilterSearch";
import AdCard from "../HomePage/_components/AdCard";
import CommonPagination from "../../_components/CommonPagination";

const SearchPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [filters, setFilters] = useState({
    search: "",
    isSold: "false",
    sortByPrice: "asc",
    category: "",
    subCategory: "",
    page: 1,
    limit: 12,
  });

  const dummyAds = Array.from({ length: 30 }).map((_, i) => ({
    id: `${i + 1}`,
    title:
      i % 2 === 0 ? "Brooklyn Brownstone 4 Bedroom" : "Schwinn Hybrid Bike",
    price: 28900,
    city: i % 3 === 0 ? "Manhattan" : "Astoria",
    state: "NY",
    zipCode: "10089",
    images: [
      {
        url:
          i % 2 === 0
            ? "https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
            : "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
      },
    ],
  }));

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Top Filter Bar */}
      <FilterSearch filters={filters} setFilters={setFilters} />

      <div className=" mx-auto ">
        {/* 📊 Header: Count + View Toggle */}
        <div className="sticky top-30 z-50 py-2 px-6 bg-white/80 backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 ">
            <div>
              <h2 className="text-gray-800 text-base font-semibold flex items-center gap-2">
                Found <span className="text-[#0064AE] text-xl">48</span> Ads for
                your search
              </h2>
            </div>

            {/* 🔄 View Switcher Buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-[#0064AE] shadow-md"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid
                  size={18}
                  strokeWidth={viewMode === "grid" ? 2.5 : 2}
                />
              </button>

              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                  viewMode === "map"
                    ? "bg-white text-[#0064AE] shadow-md"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <MapIcon size={18} strokeWidth={viewMode === "map" ? 2.5 : 2} />
              </button>
            </div>
          </div>
        </div>

        {/* 📦 Main Content Area */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 animate-in fade-in duration-500">
            {dummyAds.map((add, i) => (
              <AdCard key={i} ad={add} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[600px] bg-slate-200/50 rounded-3xl border-2 border-dashed border-slate-300 flex items-center justify-center animate-in zoom-in duration-300">
            <div className="text-center">
              <div className="bg-white p-4 rounded-full shadow-lg mb-4 inline-block">
                <MapIcon size={40} className="text-[#0064AE]" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Map Interface Ready
              </h3>
              <p className="text-slate-500 text-sm">
                Bhai, ekhane map render korle visual-ta pura joss lagbe!
              </p>
            </div>
          </div>
        )}

        {/* Pagination Section */}
        <CommonPagination
          currentPage={filters.page}
          totalPages={5}
          onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </div>
    </div>
  );
};

export default SearchPage;
