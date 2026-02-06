"use client";
import React, { useState } from "react";

import { Download, Printer, Search, ChevronDown, Filter } from "lucide-react";
import CommonTable, { type Column } from "@/main/user/_components/CustomTable";
import CommonPagination from "@/main/user/_components/CommonPagination";

// --- Types ---
interface Transaction {
  id: string;
  name: string;
  avatar: string;
  invoiceId: string;
  details: string;
  charges: string;
  date: string;
  status: "Complete" | "Pending" | "Failed";
}

const AdminTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // --- Data Table Columns ---
  const columns: Column<Transaction>[] = [
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.avatar}
            className="w-9 h-9 rounded-lg border border-slate-200"
            alt=""
          />
          <span className="font-bold text-slate-900">{item.name}</span>
        </div>
      ),
    },
    { header: "Invoice ID", key: "invoiceId" },
    {
      header: "Details",
      render: (item) => (
        <span className="text-slate-500 font-medium truncate max-w-[150px] inline-block">
          {item.details}
        </span>
      ),
    },
    {
      header: "Charges",
      render: (item) => (
        <span className="font-bold text-slate-900">{item.charges}</span>
      ),
    },
    {
      header: "Date",
      render: (item) => (
        <div className="leading-tight">
          <p className="font-semibold text-slate-700">{item.date}</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold">
            12:30 PM
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-2.5 py-1 rounded text-[11px] font-bold border ${
            item.status === "Complete"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : item.status === "Pending"
                ? "bg-amber-50 text-amber-700 border-amber-100"
                : "bg-rose-50 text-rose-700 border-rose-100"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      render: () => (
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#0064AE] hover:border-blue-100 transition-all active:scale-90 cursor-pointer">
            <Download size={14} />
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 transition-all active:scale-90 cursor-pointer">
            <Printer size={14} />
          </button>
        </div>
      ),
    },
  ];

  // --- Mock Data ---
  const data: Transaction[] = [
    {
      id: "1",
      name: "Sam Abid",
      avatar: "https://i.pravatar.cc/150?u=sam",
      invoiceId: "INV619253",
      details: "2BR Condo with Hu...",
      charges: "$19.23",
      date: "24/05/2026",
      status: "Complete",
    },
    {
      id: "2",
      name: "Avah Shelton",
      avatar: "https://i.pravatar.cc/150?u=avah",
      invoiceId: "INV967315",
      details: "Tesla Model 3 – Lon...",
      charges: "$19.23",
      date: "24/05/2026",
      status: "Pending",
    },
    {
      id: "3",
      name: "Lian Morrow",
      avatar: "https://i.pravatar.cc/150?u=lian",
      invoiceId: "INV618987",
      details: "Modern Apartment...",
      charges: "$19.23",
      date: "22/05/2026",
      status: "Failed",
    },
  ];

  return (
    <div className="p-4">
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm  mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Transactions History
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Audit Log Management
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Professional Search Input */}
            <div className="relative group flex-1 md:flex-none">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0064AE] transition-colors"
                size={16}
              />
              <input
                placeholder="Search by ID or Name..."
                className="pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#0064AE40] focus:bg-white transition-all"
              />
            </div>

            {/* Subtle Filter Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
              <Filter size={14} />
              Filter <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Main Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-100">
          <CommonTable columns={columns} data={data} />
        </div>

        {/* Pagination Footer */}
        <div className="mt-4 border-t border-slate-50 pt-4">
          <CommonPagination
            currentPage={currentPage}
            totalPages={4}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminTransactions;
