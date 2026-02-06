// import React from "react";
import {
  Car,
  Building2,
  Briefcase,
  ShoppingBag,
  Tv,
  Settings,
  Dog,
  Calendar,
  Search,
} from "lucide-react";
import bgImg from "@/assets/bg.jpg";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: <Car size={24} />, label: "Vehicle" },
  { icon: <Building2 size={24} />, label: "Rel-Estate" },
  { icon: <Briefcase size={24} />, label: "Jobs" },
  { icon: <ShoppingBag size={24} />, label: "For Sale" },
  { icon: <Tv size={24} />, label: "Electronics" },
  { icon: <Settings size={24} />, label: "Services" },
  { icon: <Dog size={24} />, label: "Pets" },
  { icon: <Calendar size={24} />, label: "Events" },
];

const SearchAndCategory = () => {
    const navigate = useNavigate()
    const handleSearch = ()=> {
        navigate("search")
    }
  return (
    <div
      className="w-full relative pt-4 pb-6 bg-white overflow-hidden"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto", 
      }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl font-bold text-[#0064AE] mb-10">
          Your Trusted Local Marketplace for Free Classified Ads
        </h1>

        {/* Search Bar Container */}
        <div className="flex flex-col md:flex-row items-center justify-center max-w-3xl mx-auto border rounded-xl shadow-lg bg-white overflow-hidden mb-12">
          <div className="flex items-center flex-1 px-4 py-3">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="Search anything you need"
              className="w-full outline-none text-gray-600 font-medium"
            />
          </div>
          <div className="flex items-center border-l px-4 bg-white min-w-[140px]">
            <span className="text-gray-400 mr-2 font-bold">📍</span>
            <input
              type="text"
              placeholder="Zip Code"
              className="w-full outline-none text-sm font-medium"
            />
          </div>
          <button onClick={handleSearch} className="bg-[#0064AE] hover:bg-[#004f8b] text-white px-10 py-4 font-bold transition-all active:scale-95 cursor-pointer">
            Search
          </button>
        </div>

        {/* Categories Section */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="p-3 text-gray-500 group-hover:text-[#0064AE] transition-all border border-gray-100 rounded-2xl bg-white shadow-sm group-hover:bg-blue-50 group-hover:shadow-md">
                {cat.icon}
              </div>
              <span className="text-sm font-semibold text-gray-600 group-hover:text-[#0064AE]">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAndCategory;
