import { PromotionCard } from "./card/PromotionCard";

const promotionsData = [
  {
    id: 1,
    imageUrl: "https://i.postimg.cc/kX45YtM8/thai-lan-promo.jpg", // Thay bằng link ảnh của bạn
    discount: 44,
    locationTag: "Thái Lan",
    title:
      "Tour du lịch Thái Lan | Hà Nội - Bangkok - Pattaya 5 ngày 4 đêm 2024",
    originalPrice: "8.990.000đ",
    discountedPrice: "4.990.000đ",
  },
  {
    id: 2,
    imageUrl: "https://i.postimg.cc/1359K2sR/vung-tau-promo.jpg", // Thay bằng link ảnh của bạn
    discount: 35,
    locationTag: "Vũng Tàu",
    title: "Tour du lịch TP. Hồ Chí Minh - Hồ Tràm 2 ngày 1 đêm",
    originalPrice: "3.990.000đ",
    discountedPrice: "2.590.000đ",
  },
  {
    id: 3,
    imageUrl: "https://i.postimg.cc/g0R5WJ1x/quang-binh-promo.jpg", // Thay bằng link ảnh của bạn
    discount: 34,
    locationTag: "Quảng Bình",
    title: "Tour du lịch TP Hồ Chí Minh - Quảng Bình - Phong Nha 3 ngày 2 đêm",
    originalPrice: "6.990.000đ",
    discountedPrice: "4.590.000đ",
  },
];

export function SpecialPromotions() {
  return (
    <section className="pt-20 bg-white px-4 sm:px-8 pb-30">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <p className="text-red-500 font-bold text-sm tracking-widest relative inline-block">
            <span className="absolute top-1/2 left-[-2rem] w-6 h-px bg-red-400"></span>
            TRAVEL OFFER & DISCOUNT
            <span className="absolute top-1/2 right-[-2rem] w-6 h-px bg-red-400"></span>
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
            KHUYẾN MÃI TOUR ĐẶC BIỆT
          </h2>
          <p className="mt-4 text-md text-gray-600">
            Những TOUR có khuyến mại tốt nhất tại BOOKINGTOUR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotionsData.map((promo) => (
            <PromotionCard key={promo.id} promotion={promo} />
          ))}
        </div>
      </div>
    </section>
  );
}
