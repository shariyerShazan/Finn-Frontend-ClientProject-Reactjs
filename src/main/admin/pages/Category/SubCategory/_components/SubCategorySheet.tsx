/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Command, Save, Plus, Loader2, PlusCircle } from "lucide-react";
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
// import { ScrollArea } from "@/components/ui/scroll-area";
import { SpecFieldItem } from "./SpecFieldItem";
import {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "@/redux/fetures/admin/admin-category.api";
import { toast } from "react-toastify";

export function SubCategorySheet({
  open,
  onOpenChange,
  categories,
  editData,
}: any) {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    specFields: [] as any[],
  });

  const [createSub, { isLoading: isCreating }] = useCreateSubCategoryMutation();
  const [updateSub, { isLoading: isUpdating }] = useUpdateSubCategoryMutation();

  useEffect(() => {
    if (editData && open) {
      const formattedFields =
        editData.specFields?.map((f: any) => ({
          ...f,
          options: Array.isArray(f.options)
            ? f.options.join(", ")
            : f.options || "",
        })) || [];

      setFormData({
        name: editData.name || "",
        categoryId: editData.categoryId || "",
        specFields: formattedFields,
      });
    } else if (open) {
      setFormData({ name: "", categoryId: "", specFields: [] });
    }
  }, [editData, open]);

  const addField = () => {
    setFormData((p) => ({
      ...p,
      specFields: [
        ...p.specFields,
        { label: "", key: "", type: "text", required: true, options: "" },
      ],
    }));
  };

  const updateField = (index: number, key: string, value: any) => {
    setFormData((prev) => {
      const updatedFields = [...prev.specFields];
      updatedFields[index] = { ...updatedFields[index], [key]: value };
      if (key === "label")
        updatedFields[index].key = value.toLowerCase().replace(/\s+/g, "_");
      return { ...prev, specFields: updatedFields };
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.categoryId)
      return toast.error("Required fields missing");

    const processedPayload = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      categoryId: formData.categoryId,
      specFields: formData.specFields.map((field) => ({
        ...field,
        options:
          field.type === "select"
            ? typeof field.options === "string"
              ? field.options
                  .split(",")
                  .map((o: any) => o.trim())
                  .filter(Boolean)
              : field.options
            : [],
      })),
    };

    try {
      if (editData) {
        await updateSub({ id: editData.id, data: processedPayload }).unwrap();
        toast.success("Blueprint updated");
      } else {
        await createSub(processedPayload).unwrap();
        toast.success("Blueprint deployed");
      }
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* CRITICAL FIX: 
         1. h-full and flex flex-col makes the sheet fill the side.
         2. overflow-hidden on the SheetContent prevents the WHOLE sheet from scrolling.
      */}
      <SheetContent className="w-full sm:max-w-[600px] p-0 flex flex-col h-full overflow-hidden">
        {/* Header Section (Fixed - No scroll) */}
        <div className="p-6 border-b shrink-0 bg-white">
          <SheetHeader>
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Command size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Schema Engine
              </span>
            </div>
            <SheetTitle className="text-xl font-bold">
              {editData ? "Edit Blueprint" : "New Blueprint"}
            </SheetTitle>
            <SheetDescription>
              Set up attributes for this sub-category.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Scrollable Body (The Magic happens here)
           flex-1 tells this div to take all the space between header and footer.
        */}
        <div className="flex-1 overflow-y-auto bg-slate-50/30">
          <div className="p-6 space-y-8 pb-10">
            {/* Base Config */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase text-slate-500">
                  Parent Category
                </Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(v) =>
                    setFormData({ ...formData, categoryId: v })
                  }
                >
                  <SelectTrigger className="bg-white border-slate-200">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c: any) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase text-slate-500">
                  Sub-Category Name
                </Label>
                <Input
                  className="bg-white border-slate-200"
                  placeholder="e.g. Smart Watches"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Attributes List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <Label className="font-bold text-slate-900">Attributes</Label>
                <Button
                  onClick={addField}
                  size="sm"
                  variant="outline"
                  className="h-7 text-[10px] uppercase font-bold border-slate-300"
                >
                  <Plus size={12} className="mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-3">
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
                  <div className="py-10 border border-dashed rounded-lg flex flex-col items-center justify-center text-slate-400 gap-2 bg-white/50">
                    <PlusCircle size={20} className="opacity-20" />
                    <p className="text-[10px] uppercase font-bold tracking-widest">
                      Add your first attribute
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section (Fixed - No scroll) */}
        <div className="p-6 border-t shrink-0 bg-white">
          <SheetFooter>
            <Button
              onClick={handleSave}
              disabled={isCreating || isUpdating}
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold"
            >
              {isCreating || isUpdating ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              {editData ? "Update Changes" : "Create Blueprint"}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
