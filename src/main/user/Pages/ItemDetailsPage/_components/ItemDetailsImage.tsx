"use client";
import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
];

const ItemDetailsImage = () => {
  const [mainImg, setMainImg] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState({
    display: "none",
    transformOrigin: "center",
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Zoom Logic: specific point focus ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setZoomStyle({
      display: "block",
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none", transformOrigin: "center" });
  };

  // --- Carousel Navigation ---
  const navigate = (direction: "prev" | "next") => {
    const currentIndex = images.indexOf(mainImg);
    if (direction === "prev") {
      setMainImg(images[(currentIndex - 1 + images.length) % images.length]);
    } else {
      setMainImg(images[(currentIndex + 1) % images.length]);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 h-[500px]">
      {/* 🚀 Main Image Section with Power Zoom */}
      <div className="col-span-3 relative rounded-3xl overflow-hidden bg-slate-100 group cursor-zoom-in border border-slate-100">
        <div
          className="relative w-full h-full overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={containerRef}
        >
          <img
            src={mainImg}
            alt="Product Main"
            className="w-full h-full object-cover transition-transform duration-200 ease-out"
            style={{
              transform:
                zoomStyle.display === "block" ? "scale(2)" : "scale(1)",
              transformOrigin: zoomStyle.transformOrigin,
            }}
          />
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={() => navigate("prev")}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all active:scale-90"
        >
          <ChevronLeft className="text-[#0064AE]" size={24} />
        </button>
        <button
          onClick={() => navigate("next")}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all active:scale-90"
        >
          <ChevronRight className="text-[#0064AE]" size={24} />
        </button>
      </div>

      {/* 📸 Thumbnail List */}
      <div className="col-span-1 flex flex-col gap-4 overflow-y-auto pr-1 no-scrollbar">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setMainImg(img)}
            className={`min-h-[110px] h-1/4 rounded-2xl overflow-hidden bg-slate-100 border-2 transition-all cursor-pointer ${
              mainImg === img
                ? "border-[#0064AE] shadow-md scale-[0.98]"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`Thumb ${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetailsImage;
