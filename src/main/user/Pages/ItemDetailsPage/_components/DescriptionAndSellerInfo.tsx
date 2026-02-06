"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  Globe,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Verified,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DescriptionAndSellerInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-12">
      {/* 📝 Ads Description Section */}
      <div className="relative group">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-8 bg-[#0064AE] rounded-full inline-block"></span>
            Description
          </h3>
          <Badge
            variant="outline"
            className="text-[#0064AE] border-[#0064AE]/20 bg-[#0064AE]/5"
          >
            Updated 2 days ago
          </Badge>
        </div>

        <div
          className={`relative transition-all duration-500 overflow-hidden ${!isExpanded ? "max-h-22" : "max-h-[1000px]"}`}
        >
          <p className="text-[15px] text-slate-600 leading-relaxed text-justify italic font-light">
            Enhance your drive with our{" "}
            <span className="text-slate-900 font-semibold uppercase tracking-wider">
              Carrara White 2015 Audi Q7 3.0T Premium quattro
            </span>
            . Motivated by a Super Charged 3.0 Liter V6 producing 280hp coupled
            to an 8 Speed Automatic transmission to send you to 60mph in 7.7
            seconds. This luxury All Wheel Drive SUV shows off nearly 22mpg on
            the highway in addition to its impeccable ride and impressive
            maneuverability. The interior is crafted with premium leather and
            walnut wood inlays, ensuring every journey feels like a first-class
            experience. Equipped with a panoramic sunroof, Bose premium audio,
            and advanced safety features, this Audi is ready for family to an 8
            Speed Automatic transmission to send you to 60mph in 7.7 seconds.
            This luxury All Wheel Drive SUV shows off nearly 22mpg on the
            highway in addition to its impeccable ride and impressive
            maneuverability. The interior is crafted with premium leather and
            walnut wood inlays, ensuring every journey feels like a first-class
            experience. Equipped with a panoramic sunroof, Bose premium audio,
            and advanced safety features, this Audi is ready for family
            adventures. adventures.
          </p>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white via-white/80 to-transparent" />
          )}
        </div>

        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-[#0064AE] hover:text-[#004f8b] p-0 h-auto font-bold flex items-center gap-1 group"
        >
          {isExpanded ? (
            <>
              Show Less{" "}
              <ChevronUp
                size={18}
                className="group-hover:-translate-y-1 transition-transform"
              />
            </>
          ) : (
            <>
              Read Full Description{" "}
              <ChevronDown
                size={18}
                className="group-hover:translate-y-1 transition-transform"
              />
            </>
          )}
        </Button>
      </div>

      {/* 👤 Seller Information Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-8 bg-amber-500 rounded-full inline-block"></span>
          Seller Information
        </h3>

        <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50">
          {/* Subtle Accent Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0064AE]/5 rounded-full -mr-32 -mt-32 blur-3xl" />

          <div className="relative p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Column 1: Brand & Address */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-[#0064AE] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#0064AE]/30">
                  <Verified size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-800 leading-tight uppercase tracking-tighter">
                    Family Trucks <br /> & Vans
                  </h4>
                  <p className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                    <ShieldCheck size={12} /> VERIFIED DEALERSHIP
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin size={18} className="text-[#0064AE] shrink-0 mt-0.5" />
                <span className="font-medium">
                  2400 S Broadway, Denver, CO 80210-5009
                </span>
              </div>
            </div>

            {/* Column 2: Quick Contacts */}
            <div className="lg:col-span-1 grid grid-cols-1 gap-3 py-6 lg:py-0 lg:border-x border-slate-100 px-0 lg:px-8">
              <a
                href="tel:3037336675"
                className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-[#0064AE] hover:text-white transition-all group"
              >
                <Phone
                  size={20}
                  className="text-[#0064AE] group-hover:text-white"
                />
                <span className="text-sm font-bold tracking-wider">
                  (303) 733-6675
                </span>
              </a>
              <a
                href="mailto:FamilyTandV@gmail.com"
                className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-[#0064AE] hover:text-white transition-all group"
              >
                <Mail
                  size={20}
                  className="text-[#0064AE] group-hover:text-white"
                />
                <span className="text-sm font-medium">
                  FamilyTandV@gmail.com
                </span>
              </a>
              <a
                href="#"
                target="_blank"
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#0064AE]/10 text-[#0064AE] hover:bg-[#0064AE] hover:text-white transition-all group"
              >
                <Globe size={20} />
                <span className="text-sm font-black underline decoration-2">
                  Visit Website
                </span>
              </a>
            </div>

            {/* Column 3: Working Hours Table */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                  <Clock size={14} className="text-amber-500" /> Business Hours
                </h5>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-slate-400">Mon-Fri</span>
                    <span className="font-bold">08:00 AM - 08:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-slate-400">Saturday</span>
                    <span className="font-bold">08:00 AM - 08:00 PM</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-rose-400">Sunday</span>
                    <span className="font-bold text-rose-400 uppercase">
                      Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionAndSellerInfo;
