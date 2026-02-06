/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Plus, Command, Save, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SpecFieldItem } from "./SpecFieldItem";

export function SubCategorySheet({ open, onOpenChange, categories }: any) {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    specFields: [] as any[],
  });

  const addField = () => {
    setFormData((p) => ({
      ...p,
      specFields: [
        ...p.specFields,
        { label: "", key: "", type: "text", required: true },
      ],
    }));
  };

  const updateField = (index: number, key: string, value: any) => {
    const fields = [...formData.specFields];
    fields[index][key] = value;
    if (key === "label")
      fields[index].key = value.toLowerCase().replace(/\s+/g, "_");
    setFormData({ ...formData, specFields: fields });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* FIX 1: h-screen ebong flex-col ensure kora hoyeche jate content baire na jay.
         FIX 2: max-w barano hoyeche enterprise feel er jonno.
      */}
      <SheetContent className="w-full sm:max-w-[600px] p-0 flex flex-col h-screen border-l border-slate-200 shadow-2xl overflow-hidden">
        {/* Fixed Header */}
        <SheetHeader className="p-8 border-b border-slate-100 space-y-2 shrink-0 bg-white">
          <div className="flex items-center gap-2 text-slate-400">
            <Command size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Schema Engine
            </span>
          </div>
          <SheetTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Sub-Category Blueprint
          </SheetTitle>
          <SheetDescription className="text-slate-500 text-xs">
            Defining technical specifications for dynamic product forms.
          </SheetDescription>
        </SheetHeader>

        {/* FIX 3: ScrollArea ke 'flex-1' deoa hoyeche jate eita Header ar Footer er majhkhaner puro jaiga ta ney.
           'h-full' and 'overflow-y-auto' ensures internal scrolling.
        */}
        <ScrollArea className="flex-1 overflow-y-auto bg-[#fcfcfc]">
          <div className="p-8 space-y-10 pb-20">
            {" "}
            {/* pb-20 added for extra breathing room at bottom */}
            {/* Base Configuration */}
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Parent Hierarchy
                </Label>
                <Select
                  onValueChange={(v) =>
                    setFormData({ ...formData, categoryId: v })
                  }
                >
                  <SelectTrigger className="h-11 rounded-md border-slate-200 bg-white shadow-sm focus:ring-0 focus:border-slate-900 transition-all">
                    <SelectValue placeholder="Select Parent Group" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-2xl border-slate-100">
                    {categories.map((c: any) => (
                      <SelectItem
                        key={c.id}
                        value={c.id}
                        className="text-sm cursor-pointer"
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Sub-Category Identity
                </Label>
                <Input
                  className="h-11 rounded-md border-slate-200 bg-white shadow-sm focus:ring-0 focus:border-slate-900 placeholder:text-slate-300 text-sm font-medium"
                  placeholder="e.g. Mirrorless Cameras"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Dynamic Attribute Builder */}
            <div className="space-y-6">
              {/* FIX 4: Sticky title with background prevents text overlap during scroll */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 sticky top-0 bg-[#fcfcfc] py-2 z-20">
                <Label className="text-[11px] font-bold uppercase text-slate-900 tracking-wider">
                  Technical Specifications
                </Label>
                <Button
                  onClick={addField}
                  size="sm"
                  className="h-8 text-[10px] font-bold uppercase bg-slate-900 hover:bg-slate-800 text-white rounded-md shadow-md transition-transform active:scale-95"
                >
                  <Plus size={14} className="mr-1" strokeWidth={3} /> Add
                  Attribute
                </Button>
              </div>

              {/* Attributes List */}
              <div className="space-y-4">
                {formData.specFields.map((field, idx) => (
                  <SpecFieldItem
                    key={idx}
                    index={idx}
                    field={field}
                    onUpdate={updateField}
                    onRemove={(i: number) =>
                      setFormData((p) => ({
                        ...p,
                        specFields: p.specFields.filter((_, idx) => idx !== i),
                      }))
                    }
                  />
                ))}

                {formData.specFields.length === 0 && (
                  <div className="h-40 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center flex-col text-slate-400 gap-3 bg-white/50">
                    <PlusCircle
                      size={32}
                      strokeWidth={1}
                      className="opacity-20"
                    />
                    <p className="text-[11px] font-bold uppercase tracking-widest opacity-60">
                      No attributes defined
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Fixed Footer */}
        <SheetFooter className="p-6 bg-white border-t border-slate-200 shrink-0 z-30">
          <div className="flex w-full items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-slate-400 font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900"
            >
              Discard
            </Button>
            <Button className="flex-1 h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all active:scale-95">
              <Save size={16} className="mr-2" /> Save & Deploy
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
