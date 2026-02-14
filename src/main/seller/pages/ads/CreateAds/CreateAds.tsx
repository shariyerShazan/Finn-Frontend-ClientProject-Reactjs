/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2, Upload, X, MapPin, ShieldCheck } from "lucide-react";

// Types matching your Category API
interface SpecField {
  label: string;
  key: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface SubCategory {
  id: string;
  name: string;
  specFields: SpecField[];
}

interface Category {
  id: string;
  name: string;
  subCategories?: SubCategory[];
}

// Added Type for Form Data to fix TypeScript errors
interface AdFormData {
  title: string;
  description: string;
  type: string;
  price: string;
  propertyFor: string;
  state: string;
  city: string;
  zipCode: string;
  country: string;
  categoryId: string;
  subCategoryId: string;
  showAddress: boolean;
  allowPhone: boolean;
  allowEmail: boolean;
  [key: `spec_${string}`]: any; // Allows dynamic spec fields without type error
}

const CreateAds = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCat, setSelectedSubCat] = useState<SubCategory | null>(
    null,
  );
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // Using the defined interface here
  const { register, handleSubmit, setValue, watch } = useForm<AdFormData>({
    defaultValues: {
      type: "FIXED",
      propertyFor: "SALE",
      showAddress: true,
      allowPhone: true,
      allowEmail: true,
      country: "Bangladesh",
      categoryId: "",
      subCategoryId: "",
    },
  });

  const showAddress = watch("showAddress");
  const allowPhone = watch("allowPhone");
  const allowEmail = watch("allowEmail");

  useEffect(() => {
    fetch("https://shazan-ad-marketplace-project.onrender.com/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => toast.error("Categories failed to load"));
  }, []);

  const handleCategoryChange = async (categoryId: string) => {
    setValue("categoryId", categoryId);
    setSelectedSubCat(null);
    try {
      const res = await fetch(
        `https://shazan-ad-marketplace-project.onrender.com/categories/${categoryId}`,
      );
      const data = await res.json();
      setSubCategories(data.subCategories || []);
    } catch {
      toast.error("Sub-categories failed to load");
    }
  };

  const handleSubCategoryChange = (id: string) => {
    const sub = subCategories.find((s) => s.id === id);
    setSelectedSubCat(sub || null);
    setValue("subCategoryId", id);
  };

  const onSubmit = async (data: AdFormData) => {
    setLoading(true);
    const formData = new FormData();

    const fields: (keyof AdFormData)[] = [
      "title",
      "description",
      "type",
      "price",
      "propertyFor",
      "state",
      "city",
      "zipCode",
      "country",
      "categoryId",
      "subCategoryId",
      "showAddress",
      "allowPhone",
      "allowEmail",
    ];

    fields.forEach((field) => {
      if (data[field] !== undefined)
        formData.append(field as string, data[field] as any);
    });

    const specs: Record<string, any> = {};
    selectedSubCat?.specFields.forEach((f) => {
      const val = data[`spec_${f.key}`];
      if (val) specs[f.key] = f.type === "number" ? Number(val) : val;
    });
    formData.append("specifications", JSON.stringify(specs));

    images.forEach((file) => formData.append("images", file));

    try {
      const response = await fetch(
        "https://shazan-ad-marketplace-project.onrender.com/ads",
        {
          method: "POST",
          body: formData,
        },
      );
      if (response.ok) {
        toast.success("Ad posted successfully!");
        navigate("/seller/dashboard/ads");
      } else {
        const errData = await response.json();
        toast.error(errData.message || "Failed to post ad");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    Ad Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register("title", { required: true })}
                    placeholder="Modern Villa in Gulshan"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={handleCategoryChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Sub Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={handleSubCategoryChange}
                      disabled={!subCategories.length}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {subCategories.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ad Type</Label>
                    <Select
                      onValueChange={(v) => setValue("type", v)}
                      defaultValue="FIXED"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FIXED">Fixed Price</SelectItem>
                        <SelectItem value="AUCTION">Auction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Property For</Label>
                    <Select
                      onValueChange={(v) => setValue("propertyFor", v)}
                      defaultValue="SALE"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SALE">For Sale</SelectItem>
                        <SelectItem value="RENT">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    Price ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="50000"
                  />
                </div>
              </CardContent>
            </Card>

            {selectedSubCat && selectedSubCat.specFields.length > 0 && (
              <Card className="bg-slate-50 border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">Specifications</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {selectedSubCat.specFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label>
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </Label>
                      {field.type === "select" ? (
                        <Select
                          onValueChange={(v) =>
                            setValue(`spec_${field.key}`, v)
                          }
                        >
                          <SelectTrigger className="bg-white w-full">
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((o) => (
                              <SelectItem key={o} value={o}>
                                {o}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          className="bg-white"
                          type={field.type === "number" ? "number" : "text"}
                          {...register(`spec_${field.key}`, {
                            required: field.required,
                          })}
                        />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  {...register("description")}
                  rows={6}
                  placeholder="Describe the condition, features etc..."
                />
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-100 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <MapPin size={18} className="text-[#0064AE]" />
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input {...register("country")} />
                </div>
                <div className="space-y-2">
                  <Label>
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Input {...register("state", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label>
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input {...register("city", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label>
                    Zip Code <span className="text-red-500">*</span>
                  </Label>
                  <Input {...register("zipCode", { required: true })} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <ShieldCheck size={18} className="text-green-600" />
                <CardTitle className="text-lg">Privacy & Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Show Address</Label>
                  <Switch
                    checked={showAddress}
                    onCheckedChange={(checked) =>
                      setValue("showAddress", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Allow Phone</Label>
                  <Switch
                    checked={allowPhone}
                    onCheckedChange={(checked) =>
                      setValue("allowPhone", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Allow Email</Label>
                  <Switch
                    checked={allowEmail}
                    onCheckedChange={(checked) =>
                      setValue("allowEmail", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square border rounded-lg overflow-hidden group"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                        }
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-slate-50">
                    <Upload size={20} className="text-slate-400" />
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) =>
                        e.target.files &&
                        setImages((p) => [...p, ...Array.from(e.target.files!)])
                      }
                    />
                  </label>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0064AE] h-12 text-lg"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Publish Ad"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAds;
