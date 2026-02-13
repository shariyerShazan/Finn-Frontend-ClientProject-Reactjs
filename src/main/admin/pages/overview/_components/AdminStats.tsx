// import React from "react";
import {
  Users,
  UserCheck,
  DollarSign,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

interface StatItem {
  label: string;
  val: string;
  // Ekhon amra gradient classes pathacchi
  gradient: string;
  iconBg: string;
  iconColor: string;
  icon: LucideIcon;
}

const AdminStat = () => {
  const stats: StatItem[] = [
    {
      label: "Total Users",
      val: "1,250",
      gradient: "from-[#E6F9F0] to-[#F1FDF7]", // Soft Emerald
      iconBg: "bg-[#22C55E]",
      iconColor: "text-white",
      icon: Users,
    },
    {
      label: "Total Sellers",
      val: "1,689",
      gradient: "from-[#EEF2FF] to-[#F5F7FF]", // Soft Indigo
      iconBg: "bg-[#6366F1]",
      iconColor: "text-white",
      icon: UserCheck,
    },
    {
      label: "Net Income",
      val: "$54,230",
      gradient: "from-[#FFF1F2] to-[#FFF8F8]", // Soft Rose
      iconBg: "bg-[#F43F5E]",
      iconColor: "text-white",
      icon: DollarSign,
    },
    {
      label: "Total Transactions",
      val: "3.35m",
      gradient: "from-[#E0F7FA] to-[#F0FDFF]", // Soft Cyan
      iconBg: "bg-[#06B6D4]",
      iconColor: "text-white",
      icon: ArrowUpRight,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} p-6 rounded-[24px] border border-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1 group`}
        >
          {/* Decorative subtle circle for a pro look */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl" />

          <div className="flex items-center gap-5 relative z-10">
            {/* Vivid Icon Box */}
            <div
              className={`${stat.iconBg} ${stat.iconColor} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 transition-transform group-hover:rotate-6`}
            >
              <stat.icon size={26} strokeWidth={2} />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-1.5">
                {stat.val}
              </h3>
              <p className="text-[13px] font-bold text-slate-500/80 tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStat;
