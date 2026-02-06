/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Plus, Edit2, Trash2, Box, Search, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import CommonTable from "@/main/user/_components/CustomTable";
import { SubCategorySheet } from "./_components/SubCategorySheet";
// import { SubCategorySheet } from "./_components/SubCategorySheet";
const mockSubCategories = [
  {
    id: "sub_101",
    name: "Mechanical Keyboards",
    slug: "mechanical-keyboards",
    category: {
      id: "cat_1",
      name: "Computing",
    },
    specFields: [
      {
        label: "Switch Type",
        key: "switch_type",
        type: "select",
        required: true,
        options: ["Blue", "Red", "Brown", "Silver"],
      },
      {
        label: "Backlight",
        key: "backlight",
        type: "boolean",
        required: false,
      },
      {
        label: "Layout",
        key: "layout",
        type: "select",
        required: true,
        options: ["ANSI", "ISO"],
      },
    ],
  },
  {
    id: "sub_102",
    name: "Smartphones",
    slug: "smartphones",
    category: {
      id: "cat_2",
      name: "Mobile & Tablets",
    },
    specFields: [
      {
        label: "Processor",
        key: "processor",
        type: "text",
        required: true,
      },
      {
        label: "RAM Capacity",
        key: "ram_capacity",
        type: "select",
        required: true,
        options: ["4GB", "8GB", "12GB", "16GB"],
      },
      {
        label: "5G Support",
        key: "5g_support",
        type: "boolean",
        required: true,
      },
    ],
  },
  {
    id: "sub_103",
    name: "Gaming Monitors",
    slug: "gaming-monitors",
    category: {
      id: "cat_1",
      name: "Computing",
    },
    specFields: [
      {
        label: "Refresh Rate",
        key: "refresh_rate",
        type: "number",
        required: true,
      },
      {
        label: "Panel Type",
        key: "panel_type",
        type: "select",
        required: true,
        options: ["IPS", "VA", "TN", "OLED"],
      },
    ],
  },
];

const SubCategory = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const columns = [
    {
      header: "Sub-Category",
      render: (item: any) => (
        <div className="flex items-center gap-3 py-1">
          <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-inner">
            <Box size={18} strokeWidth={2} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm tracking-tight">
              {item.name}
            </p>
            <p className="text-[11px] text-slate-400 font-mono tracking-tighter italic">
              /{item.slug}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Parent Category",
      render: (item: any) => (
        <div className="flex items-center gap-2 border w-fit px-2 py-1 rounded-md bg-slate-50 border-slate-200">
          <Hash size={12} className="text-slate-400" />
          <span className="text-[12px] font-bold text-slate-600 uppercase tracking-tight">
            {item.category?.name}
          </span>
        </div>
      ),
    },
    {
      header: "Schema Attributes",
      render: (item: any) => (
        <div className="flex flex-wrap gap-1.5">
          {item.specFields?.map((field: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600 shadow-sm"
            >
              <span className="w-1 h-1 rounded-full bg-slate-400" />{" "}
              {field.label}
            </div>
          ))}
        </div>
      ),
    },
    {
      header: "",
      render: () => (
        <div className="flex justify-end gap-1 px-4">
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
          <h1 className="text-3xl font-bold tracking-tighter text-slate-900">
            Taxonomy Manager
          </h1>
          <p className="text-slate-500 text-[13px] font-medium">
            Create and manage dynamic schemas for product specifications.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <Input
              className="w-[300px] h-10 bg-white border-slate-200 rounded-lg pl-9 text-sm focus:ring-0 focus:ring-offset-0 focus:border-slate-900"
              placeholder="Filter schemas..."
            />
          </div>
          <Button
            onClick={() => setIsSheetOpen(true)}
            className="h-10 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all"
          >
            <Plus size={16} className="mr-2" strokeWidth={3} /> New Sub-Category
          </Button>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <CommonTable columns={columns} data={mockSubCategories} />
      </div>

      <SubCategorySheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        categories={[{ id: "1", name: "Computing" }]}
      />
    </div>
  );
};

export default SubCategory;
