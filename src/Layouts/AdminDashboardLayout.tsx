import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebarDashboard from "@/main/admin/_components/AdminSidebarDashboard";
import AdminNavbarDashboard from "@/main/admin/_components/AdminNavbarDashboard";


const AdminDashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex font-sans text-slate-900 overflow-hidden">
      {/* --- Sidebar Component --- */}
      <AdminSidebarDashboard
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0 h-screen transition-all duration-300 overflow-hidden">
        {/* Navbar - Pass Mobile Toggle Function */}
        <AdminNavbarDashboard setIsMobileOpen={setIsMobileOpen} />

        {/* Dynamic Content Scroll Area */}
        <main className="flex-1 overflow-y-auto  custom-scrollbar">
          <div className="ml-0 lg:ml-20 mx-auto">
            <Outlet />
          </div>
        </main>

        <footer className="h-10 bg-white border-t border-slate-200 px-8 flex items-center justify-between shrink-0">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Finn Admin v2.0
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#219618] rounded-full" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
              Systems Online
            </span>
          </div>
        </footer>
      </div>

      {/* Mobile Overlay Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardLayout;
