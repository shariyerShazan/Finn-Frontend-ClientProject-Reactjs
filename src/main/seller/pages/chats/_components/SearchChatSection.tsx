// import React from "react";
import { Search, MoreHorizontal } from "lucide-react";

interface Partner {
  id: number;
  name: string;
  time: string;
  message: string;
  role: string;
}

interface Props {
  partners: Partner[];
  activeId: number;
  onSelect: (id: number) => void;
}

const SearchChatSection = ({ partners, activeId, onSelect }: Props) => {
  return (
    <div className="w-full md:w-80 border-r border-gray-100 flex flex-col h-full bg-white">
      {/* User Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Annette"
              alt="Me"
              className="w-10 h-10 rounded-full border"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Annette Black</h3>
            <p className="text-xs text-gray-500">Seller</p>
          </div>
        </div>
        <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Partners List */}
      <div className="flex-1 overflow-y-auto">
        {partners.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`flex items-center gap-3 p-4 cursor-pointer transition-all ${activeId === p.id ? "bg-blue-50/50 border-r-4 border-blue-500" : "hover:bg-gray-50"}`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`}
                className="w-10 h-10 rounded-full border"
                alt=""
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-medium truncate">{p.name}</h4>
                <span className="text-[10px] text-gray-400">{p.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{p.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchChatSection;
