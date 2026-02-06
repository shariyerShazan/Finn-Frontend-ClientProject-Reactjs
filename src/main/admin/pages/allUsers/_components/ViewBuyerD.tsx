
import DangerActions from "@/main/admin/_components/viewUser/DangerActions";
import HistoryList from "@/main/admin/_components/viewUser/HistoryList";
import ProfileCard from "@/main/admin/_components/viewUser/ProfileCard";
import { StatBox } from "@/main/admin/_components/viewUser/StatBox";
import { Gavel, Heart } from "lucide-react";

const ViewBuyerD = () => {
  const userData = {
    name: "Leia Hurley",
    accountType: "user",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=leia",
    email: "leia@gmail.com",
    phone: "(+1) 123456789",
    address: "Denver, CO",
    company: "Biffco Enterprises Ltd.",
    website: "www.bel.com",
  };

  return (
    <div className=" mx-auto grid grid-cols-12 gap-8">
      {/* LEFT */}
      <div className="col-span-5">
        <ProfileCard
          user={{
            ...userData,
            accountType: userData.accountType as "seller" | "user",
          }}
        />
      </div>

      {/* RIGHT */}
      <div className="col-span-7 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatBox
            icon={Heart}
            label="Total Favorites"
            value="42"
          />
          <StatBox
            icon={Gavel}
            label="My Active Bids"
            value="12"
          />
        </div>

        {/* Favorites */}
        <HistoryList title="Favorite Ads" />

        {/* Actions */}
        <DangerActions label="Buyer" />
      </div>
    </div>
  );
};

export default ViewBuyerD;
