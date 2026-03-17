import {
  LayoutGrid,
  // CheckCircle2,
  Eye,
  Loader2,
  // TrendingUp,
  PackageCheck,
  Zap,
} from "lucide-react";
import { useGetSellerStatsQuery } from "@/redux/fetures/users.api";

const SellerStats = () => {
  const { data, isLoading } = useGetSellerStatsQuery();

  if (isLoading) {
    return (
      <div className="h-40 flex items-center justify-center bg-slate-50/50 rounded-[32px] border-2 border-dashed border-slate-200">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin text-[#0064AE]" size={32} />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Loading Your Stats...
          </p>
        </div>
      </div>
    );
  }

  const statsData = data?.data || {};

  const stats = [
    {
      label: "Total Ads",
      val: statsData.totalAds || 0,
      gradient: "from-emerald-50 to-white",
      iconBg: "bg-emerald-600",
      icon: LayoutGrid,
    },
    {
      label: "Items Sold",
      val: statsData.itemSold || 0,
      gradient: "from-blue-50 to-white",
      iconBg: "bg-blue-600",
      icon: PackageCheck,
    },
    {
      label: "Ads Views",
      val: (statsData.totalAdsViewed || 0).toLocaleString(),
      gradient: "from-purple-50 to-white",
      iconBg: "bg-purple-600",
      icon: Eye,
    },
    {
      label: "Active Boosts",
      val: statsData.activeBoosts || 0, // আপনার API অনুযায়ী ফিল্ড নেম চেক করে নিন
      gradient: "from-orange-50 to-white",
      iconBg: "bg-orange-500",
      icon: Zap,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`bg-gradient-to-br ${stat.gradient} p-6 rounded-[28px] border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden`}
        >
          {/* Background Decorative Icon */}
          <stat.icon
            className="absolute -right-4 -bottom-4 text-slate-200/30 rotate-12 group-hover:rotate-0 transition-transform duration-500"
            size={90}
          />

          <div className="flex items-center gap-5 relative z-10">
            <div
              className={`${stat.iconBg} text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
            >
              <stat.icon size={26} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1.5">
                {stat.val}
              </h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                {stat.label}
              </p>
            </div>
          </div>

          {/* Progress Mini-indicator */}
          <div className="mt-4 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div
              className={`h-full ${stat.iconBg} opacity-20 w-2/3 animate-pulse`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerStats;
