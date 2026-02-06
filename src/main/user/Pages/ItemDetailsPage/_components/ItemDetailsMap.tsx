"use client";
// import React from "react";
import { MapPin, Navigation, Maximize2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ItemDetailsMap = () => {
  // Real dealership data for Family Trucks and Vans
  const address = "2400 S Broadway, Denver, CO 80210";
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Family+Trucks+and+Vans+Denver";
  // const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}`;

  return (
    <div className="space-y-4">
      {/* Header with Location info */}
      <div className="flex items-center justify-between px-1 ">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#0064AE]/10 rounded-md">
            <MapPin size={18} className="text-[#0064AE]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Item Location</h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Denver, Colorado
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-green-50 text-green-700 border-green-100"
        >
          Dealer Site
        </Badge>
      </div>

      {/* --- Map Container --- */}
      <div className="group relative border-4 border-white rounded-md overflow-hidden shadow-2xl shadow-slate-200 aspect-square md:aspect-video lg:h-64 transition-all duration-500 hover:shadow-[#0064AE]/10 bg-slate-100 w-full">
        {/* Actual Google Map Embed Iframe */}
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
          className="absolute inset-0 grayscale-[20%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
        ></iframe>

        {/* Custom Price Marker Overlay (Kept for Visual Flare) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative flex flex-col items-center animate-bounce duration-[3s]">
            <div className="bg-[#0064AE] text-white px-4 py-2 rounded-2xl font-black text-sm shadow-[0_10px_20px_rgba(0,100,174,0.4)] flex items-center gap-2 border-2 border-white">
              $28,900
            </div>
            <div className="w-3 h-3 bg-[#0064AE] rotate-45 -mt-1.5 border-r-2 border-b-2 border-white"></div>
          </div>
        </div>

        {/* Floating Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-xl shadow-md h-9 w-9 bg-white/90 backdrop-blur-md"
            onClick={() => window.open(mapUrl, "_blank")}
          >
            <Maximize2 size={16} />
          </Button>
        </div>

        {/* Bottom Floating Interaction Card */}
        <div className="absolute bottom-4 left-4 ml-10 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-[1.5rem] border border-white shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <Navigation size={20} className="text-[#0064AE]" />
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Get Directions
                </p>
                <p className="text-xs font-bold text-slate-800 truncate max-w-[150px]">
                  Family Trucks and Vans
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-[#0064AE] hover:bg-[#004f8b] cursor-pointer rounded-xl text-[11px] font-bold h-9 px-4 flex items-center gap-2"
              onClick={() => window.open(mapUrl, "_blank")}
            >
              Open Maps <ExternalLink size={14} />
            </Button>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-center text-slate-400 font-medium italic">
        * Exact location provided after booking an appointment
      </p>
    </div>
  );
};

export default ItemDetailsMap;
