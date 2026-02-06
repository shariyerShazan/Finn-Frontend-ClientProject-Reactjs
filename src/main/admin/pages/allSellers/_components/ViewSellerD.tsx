

import DangerActions from "@/main/admin/_components/viewUser/DangerActions";
import HistoryList from "@/main/admin/_components/viewUser/HistoryList";
import ProfileCard from "@/main/admin/_components/viewUser/ProfileCard";
import { StatBox } from "@/main/admin/_components/viewUser/StatBox";


import { Gavel , ShoppingBag} from "lucide-react";

const ViewSellerD = () => {
  const userData = {
    name: "Sam Abid",
    accountType: "seller",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
    email: "sam@gmail.com",
    phone: "(+1) 123456789",
    address: "Denver, CO",
    company: "Biffco Ltd",
    website: "www.bel.com",
  };

  return (
    <div className=" mx-auto grid grid-cols-12 gap-8">
      <div className="col-span-5">
        <ProfileCard
          user={{
            ...userData,
            accountType: userData.accountType as "seller" | "user",
          }}
        />
      </div>

      <div className="col-span-7 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <StatBox
            icon={Gavel}
            label="Total Auctions"
            value="85"
          />
          <StatBox
            icon={ShoppingBag}
            label="Active Listings"
            value="23"
          />
        </div>

        <HistoryList title="History" />
        <DangerActions label="Seller" />
      </div>
    </div>
  );
};

export default ViewSellerD;
