// import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid, CheckCircle2, Eye } from "lucide-react";
import { MdPayments } from "react-icons/md";

const stats = [
  {
    label: "125",
    subLabel: "Total Ads",
    icon: LayoutGrid,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "10500",
    subLabel: "Total Income",
    icon: MdPayments,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "208",
    subLabel: "Item sold",
    icon: CheckCircle2,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    label: "1230",
    subLabel: "Total Ads Viewed",
    icon: Eye,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

const SellerStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="flex items-center p-6 gap-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">
                {stat.label}
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                {stat.subLabel}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SellerStats;
