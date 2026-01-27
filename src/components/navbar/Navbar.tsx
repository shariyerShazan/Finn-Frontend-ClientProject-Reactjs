// import React from 'react';
import { User } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navItems = ["Home", "Vehicles", "Property", "Jobs", "For Sale", "Services", "Pets", "Events"];

  return (
    <nav className="bg-[#0064AE]  text-white px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-">
        <span className="text-2xl text-[#323231] font-bold tracking-tight">by<span className="bg- text-white px-1 rounded-sm ">Bench</span></span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-80 transition-opacity">
            {item}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <User className="w-6 h-6 cursor-pointer" />
        <Button className="bg-black hover:bg-zinc-800 text-white border-none rounded-md px-4 py-2 flex gap-2">
          Post a Free Ad
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;