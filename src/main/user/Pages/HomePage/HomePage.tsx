import LatestAddHome from "./_components/Home/LatestAddHome";
import SearchAndCategory from "./_components/SearchAndCategory";


const HomePage = () => {
  return (
    <div className="min-h-screen">
      <SearchAndCategory />

      <main className="pb-20">
        {/* Section 1: Latest Ads */}
        <LatestAddHome title="Latest Ads Added In Your Area" />

        {/* Section 2: Auctions (Optional/Future) */}
        <LatestAddHome title="Top of Real-Estate" />

        {/* Section 3: Popular Items */}
        <LatestAddHome title="Most Popular in Electronics" />
      </main>
    </div>
  );
};

export default HomePage;
