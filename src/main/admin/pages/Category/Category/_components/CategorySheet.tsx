/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  Save, UploadCloud } from "lucide-react";

export function CategorySheet({ open, onOpenChange }: any) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[450px] p-0 flex flex-col border-l border-slate-200">
        <SheetHeader className="p-8 border-b border-slate-100">
          <SheetTitle className="text-xl font-bold tracking-tight text-slate-900">
            New Category
          </SheetTitle>
          <SheetDescription className="text-slate-500 text-xs">
            Add a top-level category to the system. This will affect global
            routing.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30">
          {/* Identity Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Display Name
              </Label>
              <Input
                placeholder="e.g. Electronics"
                className="h-11 rounded-md border-slate-200 bg-white focus:ring-0 focus:border-slate-900"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                URL Slug
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-mono text-xs">
                  /
                </span>
                <Input
                  placeholder="electronics"
                  className="h-11 pl-6 rounded-md border-slate-200 bg-white font-mono text-xs focus:ring-0 focus:border-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Asset Section */}
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Cover Asset
            </Label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center bg-white hover:border-slate-400 transition-all cursor-pointer group">
              <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors">
                <UploadCloud size={24} />
              </div>
              <p className="mt-4 text-[11px] font-bold text-slate-900">
                Click to upload or drag and drop
              </p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">
                SVG, PNG, JPG (max. 800x400px)
              </p>
            </div>
          </div>
        </div>

        <SheetFooter className="p-6 bg-white border-t border-slate-200 flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900"
          >
            Discard
          </Button>
          <Button className="flex-1 h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-slate-200">
            <Save size={16} className="mr-2" /> Save Category
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
