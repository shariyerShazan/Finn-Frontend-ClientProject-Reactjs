"use client";
// import React from "react";
import ItemDetailsImage from "./_components/ItemDetailsImage";
import ItemSpecification from "./_components/ItemSpecification";
import DescriptionAndSellerInfo from "./_components/DescriptionAndSellerInfo";
import ChatWithItemOwner from "./_components/ChatWithItemOwner";
import MoreItemOfSeller from "./_components/MoreItemOfSeller";
import ItemDetailsMap from "./_components/ItemDetailsMap";
import {
  Calendar as CalendarIcon,
  Vote,
  Share2,
  Flag,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function ItemDetailsPage() {
  return (
    <div className="min-h-screen  pb-20">
      {/* 🔝 Floating Header / Breadcrumb Area */}
      <div className="bg-white border-b sticky top-15 z-50">
        <div className=" mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#0064AE] hover:bg-[#0064AE] uppercase text-[10px]">
                Verified Ad
              </Badge>
              <span className="text-[12px] text-slate-400 font-medium tracking-tight">
                Posted 20 min ago
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              2017 Honda Civic EX –{" "}
              <span className="text-[#0064AE]">72K Miles</span>, Clean Title
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 text-slate-600 border-slate-200"
            >
              <Share2 size={16} /> Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 text-rose-500 border-rose-100 hover:bg-rose-50"
            >
              <Flag size={16} /> Flag
            </Button>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 🛡️ LEFT COLUMN: Main Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
            <section className="bg-white rounded-[2rem] p-2 shadow-sm border">
              <ItemDetailsImage />
            </section>

            <div className="grid grid-cols-1 gap-12">
              <ItemSpecification />
              <div className="h-[1px] bg-slate-200 w-full" />
              <DescriptionAndSellerInfo />
            </div>
          </div>

          {/* ⚡ RIGHT COLUMN: Sticky Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-28">
            {/* Map Section */}
            <ItemDetailsMap />

            {/* Chat Section with Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Zap size={18} className="text-amber-500 fill-amber-500" />{" "}
                  Instant Chat
                </h3>
                <span className="text-[10px] text-green-500 animate-pulse font-black uppercase">
                  Direct Connect
                </span>
              </div>
              <ChatWithItemOwner />
            </div>

            {/* Event & Poll Card (Fancy Design) */}
            <div className="relative overflow-hidden rounded-[2.5rem] p-8 bg-slate-900 text-white shadow-2xl space-y-8">
              {/* Decoration Circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0064AE] rounded-full blur-[60px] opacity-40" />

              {/* Event Calendar View */}
              <div className="relative z-10 space-y-4">
                <h3 className="font-bold flex items-center gap-3 text-lg">
                  <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                    <CalendarIcon size={20} className="text-[#0064AE]" />
                  </div>
                  Schedule Viewing
                </h3>
                <div className="p-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm group hover:border-[#0064AE]/50 transition-colors cursor-pointer">
                  <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">
                    Available slots
                  </p>
                  <p className="text-sm font-medium">
                    Monday, Feb 09 - Friday, Feb 13
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full" />

              {/* Poll Section */}
              <div className="relative z-10 space-y-4">
                <h3 className="font-bold flex items-center gap-3 text-lg">
                  <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                    <Vote size={20} className="text-amber-500" />
                  </div>
                  Community Poll
                </h3>
                <p className="text-sm font-medium text-slate-300">
                  How likely are you to visit our Denver showroom?
                </p>
                <div className="space-y-3">
                  {["Definitely", "Maybe Next Week", "Just Browsing"].map(
                    (opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="poll"
                          className="w-4 h-4 accent-[#0064AE] cursor-pointer"
                        />{" "}
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                          {opt}
                        </span>
                      </label>
                    ),
                  )}
                </div>
                <Button className="w-full cursor-pointer bg-[#0064AE] hover:bg-[#004f8b] text-white py-6 rounded-2xl text-sm font-black shadow-lg shadow-[#0064AE]/20 transition-transform active:scale-95">
                  Submit Vote
                </Button>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
              <ShieldCheck size={32} className="text-green-600 shrink-0" />
              <p className="text-[11px] text-green-800 font-medium">
                Your transactions are protected. Never send money before seeing
                the item in person.
              </p>
            </div>
          </div>
        </div>

        {/* Full Width Section for Recommendations */}
        <div className="mt-6">
          <div className="flex items-center gap-4 mb-8">
            
          
          </div>
          <MoreItemOfSeller />
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;
