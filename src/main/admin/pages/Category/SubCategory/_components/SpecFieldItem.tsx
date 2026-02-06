/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2, ShieldCheck} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const SpecFieldItem = ({ field, index, onUpdate, onRemove }: any) => {
  return (
    <div className="relative p-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-slate-400 transition-all">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
            Attribute Label
          </label>
          <Input
            value={field.label}
            onChange={(e) => onUpdate(index, "label", e.target.value)}
            className="h-9 rounded-md bg-slate-50/50 border-slate-100 text-sm focus:bg-white transition-colors"
            placeholder="e.g. Memory Clock"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
            Data Type
          </label>
          <Select
            value={field.type}
            onValueChange={(v) => onUpdate(index, "type", v)}
          >
            <SelectTrigger className="h-9 rounded-md bg-slate-50/50 border-slate-100 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg shadow-2xl">
              <SelectItem value="text">String</SelectItem>
              <SelectItem value="number">Numeric</SelectItem>
              <SelectItem value="select">Enumerated (List)</SelectItem>
              <SelectItem value="boolean">Boolean (Toggle)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
          <Button
            variant="ghost"
            className={`h-7 px-3 rounded-md text-[10px] font-bold uppercase tracking-widest gap-2 ${
              field.required
                ? "text-slate-900 bg-slate-100"
                : "text-slate-400 hover:bg-slate-50"
            }`}
            onClick={() => onUpdate(index, "required", !field.required)}
          >
            <ShieldCheck
              size={12}
              className={field.required ? "text-slate-900" : "text-slate-300"}
            />
            {field.required ? "Required Attribute" : "Optional Field"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            className="h-7 w-7 p-0 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 size={14} />
          </Button>
        </div>

        {field.type === "select" && (
          <div className="col-span-2 mt-2 space-y-1.5">
            <label className="text-[9px] font-black uppercase text-blue-600 tracking-widest italic">
              Enum Options (CSV)
            </label>
            <Input
              className="h-9 rounded-md border-dashed border-blue-200 bg-blue-50/20 text-xs text-blue-900 focus:border-blue-500"
              placeholder="Option 1, Option 2, ..."
              onChange={(e) => onUpdate(index, "options", e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
