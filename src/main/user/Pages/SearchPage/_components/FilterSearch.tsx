/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Search,
  ArrowUpNarrowWide,
  CheckCircle2,
  XCircle,
  Layers,
  FilterIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FilterProps {
  filters: {
    search: string;
    isSold: string;
    sortByPrice: string;
    category: string;
    subCategory: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const FilterSearch = ({ filters, setFilters }: FilterProps) => {
  const handleUpdate = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value, page: 1 }));
  };

  return (
    <div className="sticky top-15 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100  transition-all duration-300">
      <div className=" mx-auto px-6 py-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* 🔍 Search Input Group */}
          <div className="relative flex-1 group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0064AE] transition-colors">
              <Search size={19} strokeWidth={2.5} />
            </div>
            <Input
              placeholder="Discover something amazing..."
              className="pl-10 h-11 border-slate-200 bg-slate-50/50 focus-visible:ring-[#0064AE] rounded-xl text-[15px] transition-all duration-200 hover:bg-white"
              value={filters.search}
              onChange={(e) => handleUpdate("search", e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Separator
              orientation="vertical"
              className="hidden lg:block h-8 mx-2 bg-slate-200"
            />

            {/* 💰 Sort By Price */}
            <Select
              value={filters.sortByPrice}
              onValueChange={(val) => handleUpdate("sortByPrice", val)}
            >
              <SelectTrigger className="w-[180px] h-11 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all font-medium">
                <div className="flex items-center gap-2">
                  <ArrowUpNarrowWide size={16} className="text-[#0064AE]" />
                  <SelectValue placeholder="Sort by price" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* ✅ Availability Status */}
            <Select
              value={filters.isSold}
              onValueChange={(val) => handleUpdate("isSold", val)}
            >
              <SelectTrigger className="w-[170px] h-11 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all font-medium">
                <div className="flex items-center gap-2">
                  {filters.isSold === "true" ? (
                    <XCircle size={16} className="text-rose-500" />
                  ) : (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  )}
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                <SelectItem value="false">Available</SelectItem>
                <SelectItem value="true">Sold Out</SelectItem>
              </SelectContent>
            </Select>

            {/* 📂 Category */}
            <Select
              value={filters.category}
              onValueChange={(val) => handleUpdate("category", val)}
            >
              <SelectTrigger className="w-[160px] h-11 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all font-medium">
                <div className="flex items-center gap-2">
                  <Layers size={16} className="text-slate-500" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="vehicles">Vehicles</SelectItem>
              </SelectContent>
            </Select>

            {/* 🏷️ SubCategory (Fancy Conditional Label) */}
            <div className="relative">
              <Select
                value={filters.subCategory}
                onValueChange={(val) => handleUpdate("subCategory", val)}
                disabled={!filters.category || filters.category === "all"}
              >
                <SelectTrigger className="w-[180px] h-11 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all font-medium disabled:opacity-50">
                  <div className="flex items-center gap-2">
                    <FilterIcon size={14} className="text-slate-400" />
                    <SelectValue placeholder="Sub-Category" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                </SelectContent>
              </Select>
              {filters.category && (
                <Badge className="absolute -top-2 -right-2 bg-[#0064AE] hover:bg-[#0064AE] px-1.5 py-0 text-[10px] animate-in fade-in zoom-in duration-300">
                  Active
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
