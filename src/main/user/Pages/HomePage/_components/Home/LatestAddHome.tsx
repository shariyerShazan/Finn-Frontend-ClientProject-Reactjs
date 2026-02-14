
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";

// Importing Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import AdCard from "../AdCard";

const dummyAds = Array.from({ length: 12 }).map((_, i) => ({
  id: `${i + 1}`,
  title: i % 2 === 0 ? "Brooklyn Brownstone 4 Bedroom" : "Schwinn Hybrid Bike",
  price: 28900,
  city: i % 3 === 0 ? "Manhattan" : "Astoria",
  state: "NY",
  zipCode: "10089",
  images: [
    {
      url:
        i % 2 === 0
          ? "https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
          : "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
    },
  ],
}));

const LatestAddHome = ({ title }: { title?: string }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className=" mx-auto">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {title || "Latest Ads Added In Your Area"}
          </h2>
          <div className="h-1 w-20 bg-[#0064AE] mt-2 rounded-full"></div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-3 border rounded-full hover:bg-white cursor-pointer hover:shadow-md transition bg-gray-50 active:scale-95"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-3 bg-[#0064AE] text-white rounded-full cursor-pointer hover:bg-[#015494] shadow-lg shadow-blue-200 active:scale-95"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Slider Section */}
      <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={25}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
          1536: { slidesPerView: 6 },
        }}
        className="mySwiper"
      >
        {dummyAds.map((ad) => (
          <SwiperSlide key={ad.id} className="pb-5">
            <AdCard ad={ad} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LatestAddHome;
