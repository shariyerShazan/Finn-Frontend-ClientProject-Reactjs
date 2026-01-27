import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

function ParentLayout() {
  return (
    <div>
      <div className="fixed w-full top-0 z-50">
         <Navbar />
      </div>
        <div className="mt-25">
           <Outlet />
        </div>
    </div>
  );
}

export default ParentLayout;
