import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useSocketInitialize } from "@/hooks/useSocketInitialize";

function ParentLayout() {
  // Initialize socket connection
  useSocketInitialize();
  return (
    <div className="">
      <div className="fixed w-full top-0 z-50">
        <Navbar />
      </div>
      <div className="mt-18 w-[90%] mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default ParentLayout;
