/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Globe,
  Search,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTable from "@/main/user/_components/CustomTable";
import CommonPagination from "@/main/user/_components/CommonPagination";
import { CategorySheet } from "./_components/CategorySheet";

const categories = [
  {
    id: "CAT-9001",
    name: "Automotive & Vehicles",
    slug: "automotive-vehicles",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=100&h=100&fit=crop",
    status: "active",
    itemCount: 142,
  },
  {
    id: "CAT-9002",
    name: "Real Estate & Property",
    slug: "real-estate-property",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop",
    status: "active",
    itemCount: 85,
  },
  {
    id: "CAT-9003",
    name: "Consumer Electronics",
    slug: "electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop",
    status: "active",
    itemCount: 230,
  },
  {
    id: "CAT-9004",
    name: "Industrial Machinery",
    slug: "industrial-machinery",
    image: null, // Test case for placeholder icon
    status: "draft",
    itemCount: 0,
  },
  {
    id: "CAT-9005",
    name: "Personal Care & Beauty",
    slug: "beauty-personal-care",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop",
    status: "active",
    itemCount: 56,
  },
];

const Category = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      header: "Identity",
      render: (item: any) => (
        <div className="flex items-center gap-4 py-2">
          <div className="h-10 w-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
            {item.image ? (
              <img
                src={item.image}
                alt=""
                className="object-cover w-full h-full opacity-90"
              />
            ) : (
              <ImageIcon size={16} className="text-slate-400" />
            )}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm tracking-tight leading-none">
              {item.name}
            </p>
            <p className="text-[10px] text-slate-400 font-mono mt-1.5 uppercase tracking-widest">
              ID: {item.id}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Route Path",
      render: (item: any) => (
        <div className="flex items-center gap-2 px-2 py-1 rounded bg-slate-50 border border-slate-200 w-fit">
          <Globe size={12} className="text-slate-400" />
          <span className="text-[11px] font-mono font-medium text-slate-600 tracking-tight">
            /{item.slug}
          </span>
        </div>
      ),
    },
    {
      header: "",
      render: () => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <Edit2 size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 mx-auto space-y-10 ">
      <header className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Command size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              System Architecture
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-slate-900">
            Parent Categories
          </h1>
          <p className="text-slate-500 text-[13px] font-medium">
            Manage the core taxonomy and top-level directory paths.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <Input
              className="w-[280px] h-10 bg-white border-slate-200 rounded-md pl-9 text-xs focus:ring-0 focus:border-slate-900"
              placeholder="Search categories..."
            />
          </div>
          <Button
            onClick={() => setIsSheetOpen(true)}
            className="h-10 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-bold text-[11px] uppercase tracking-widest transition-all active:scale-95"
          >
            <Plus size={16} className="mr-2" strokeWidth={3} /> Create Category
          </Button>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
        <CommonTable columns={columns} data={categories} />
        <div className="p-4 border-t border-slate-50 bg-slate-50/50">
          <CommonPagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <CategorySheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </div>
  );
};

export default Category;
