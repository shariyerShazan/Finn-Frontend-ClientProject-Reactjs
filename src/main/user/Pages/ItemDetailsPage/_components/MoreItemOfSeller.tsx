import AdCard from "../../HomePage/_components/AdCard";

const MoreItemOfSeller = () => {
  const adsBySeller = Array.from({ length: 6 }).map((_, i) => ({
    id: `${i + 1}`,
    title:
      i === 0
        ? "Accountant for bank"
        : i === 1
          ? "Developer for SoftTech"
          : "Hospitality & Tourism",
    price: 28900,
    city: "Manhattan",
    state: "NY",
    zipCode: "10069",
    images: [
      {
        url:
          i % 2 === 0
            ? "https://images.unsplash.com/photo-1554224155-6726b3ff858f"
            : "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      },
    ],
  }));

  return (
    <div className="pt-6 space-y-8">
      {/* Section Heading */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">
          More Ads By <span className="text-[#0064AE]">This Seller</span>
        </h3>
        <div className="h-[2px] flex-1 mx-6 bg-slate-100 hidden md:block" />
      </div>

      {/* Using your AdCard in the requested grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {adsBySeller.map((ad) => (
          <div
            key={ad.id}
            className=" transition-transform duration-300"
          >
            <AdCard ad={ad} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreItemOfSeller;
