import RecentAds from "./_components/RecentAds";
import SellerStats from "./_components/SellerStats";


const SellerOverview = () => {
  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <div className=" mx-auto">
        {/* Welcome Text */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Hello, Annette Black!
          </h1>
          <p className="text-slate-500">
            Have a look on your ads performance today!
          </p>
        </div>

        {/* Stats Section */}
        <SellerStats />

        {/* Ads Section */}
        <RecentAds />
      </div>
    </div>
  );
};

export default SellerOverview;
