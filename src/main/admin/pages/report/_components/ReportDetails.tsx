import DangerActions from "@/main/admin/_components/viewUser/DangerActions";
import InfoRow from "@/main/admin/_components/viewUser/InfoRow";
import {
  Mail,
  Phone,
  Camera,
  ShieldAlert,
  ArrowUpRight,
  MapPin,
  ExternalLink,
  Calendar,
} from "lucide-react";

// 1. Sharp Professional Badge
const PriorityBadge = ({ level }: { level: "High" | "Medium" | "Low" }) => {
  const styles = {
    High: "bg-red-600 text-white",
    Medium: "bg-orange-500 text-white",
    Low: "bg-emerald-600 text-white",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm ${styles[level]}`}
    >
      {level} Priority
    </span>
  );
};

// 2. Data-Centric Insight
const MarketStatus = () => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
    <ArrowUpRight size={14} className="text-emerald-600" />
    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">
      Market Verified Price
    </span>
  </div>
);

const ReportDetails = () => {
  return (
    <div className=" mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-8 text-slate-900">
      {/* LEFT COLUMN: Admin Audit Section */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Subtle Accent Header */}
          <div className="h-2 bg-[#0064AE]" />

          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div className="relative group">
                <img
                  src="https://i.pravatar.cc/150?u=etta"
                  className="w-24 h-24 rounded-2xl border border-slate-100 object-cover shadow-md"
                />
                <button className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-1.5 rounded-lg hover:bg-[#0064AE] transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <PriorityBadge level="High" />
            </div>

            <div className="mb-8 pb-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold tracking-tight">Etta Park</h2>
              <p className="text-sm font-medium text-slate-500 flex items-center gap-2 mt-1">
                User ID:{" "}
                <span className="text-slate-900 font-mono text-xs">
                  #USR-99210
                </span>
              </p>
            </div>

            {/* Profile Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Account Status
                </p>
                <p className="text-sm font-bold text-emerald-600 mt-0.5">
                  Verified
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Reports Recieved
                </p>
                <p className="text-sm font-bold text-rose-600 mt-0.5">
                  03 Total
                </p>
              </div>
            </div>

            <div className="space-y-4 text-left">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Primary Contact
              </h4>
              <InfoRow label="Email" value="etta@gmail.com" />
              <InfoRow label="Phone" value="+1 123 456 789" />
              <InfoRow label="Address" value="Denver, CO 80122" />
            </div>

            {/* Admin Audit Message */}
            <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-white relative">
              <div className="flex items-center gap-2 mb-3 text-slate-400">
                <ShieldAlert size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.1em]">
                  Incident Report
                </span>
              </div>
              <p className="text-sm leading-relaxed font-light text-slate-200">
                "The seller is unresponsive and the item description doesn't
                match the condition in photos. Flagged as high-risk listing."
              </p>
              <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-500 pt-4 border-t border-slate-800">
                <span>INCIDENT ID: 88A-02</span>
                <span className="flex items-center gap-1">
                  <Calendar size={10} /> 24 MAY, 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Listing Analysis */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
          {/* Listing Metadata */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 leading-none">
                2017 Honda Civic EX
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <p className="text-sm text-slate-500 flex items-center gap-1 font-medium">
                  <MapPin size={14} className="text-slate-400" /> Forest Hills,
                  NY
                </p>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <p className="text-sm text-slate-500 font-medium">72K Miles</p>
              </div>
            </div>
            <MarketStatus />
          </div>

          {/* Professional Gallery Layout */}
          <div className="grid grid-cols-12 gap-4 h-[400px]">
            <div className="col-span-8 h-full">
              <img
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover rounded-2xl border border-slate-200 grayscale-[20%] hover:grayscale-0 transition-all"
              />
            </div>
            <div className="col-span-4 grid grid-rows-3 gap-4 h-full">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl border border-slate-200 group"
                >
                  <img
                    src={`https://via.placeholder.com/300?text=View+Image+${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Financials & Action Section */}
          <div className="mt-10 pt-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Highest Bid Evaluation
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl font-black text-slate-900">$13,200</h2>
                <span className="text-sm font-bold text-slate-400">USD</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium tracking-tight">
                  Listing Reference
                </span>
                <span className="font-bold text-slate-900">RF-651011</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium tracking-tight">
                  Market Average
                </span>
                <span className="font-bold text-slate-900">$14,800</span>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-900 text-slate-900 rounded-xl text-xs font-bold uppercase hover:bg-slate-900 hover:text-white transition-all">
                <ExternalLink size={14} /> View Original Listing
              </button>
            </div>
          </div>

          {/* Seller Snapshot Overlay */}
          <div className="mt-8 flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/150?u=annette"
                className="w-12 h-12 rounded-xl border border-white shadow-sm"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Annette Black
                </h4>
                <p className="text-[11px] font-medium text-slate-500 tracking-tight">
                  Business Seller • Rating: 4.8 / 5.0
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-slate-400">
                <Mail size={16} />
              </button>
              <button className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-slate-400">
                <Phone size={16} />
              </button>
            </div>
          </div>

          {/* Admin Command Zone */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <DangerActions label="Listing" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
