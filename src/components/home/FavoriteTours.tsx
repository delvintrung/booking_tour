import { TourCard } from "./card/TourCard";
import type { Tour } from "@/types";

const toursData: Tour[] = [
  {
    id: 1,
    imageUrl: "https://i.postimg.cc/k47vQ3Tf/quan-lan.jpg",
    price: "2,250,000đ",
    title: "Tour du lịch Quan Lạn 3 ngày 2 đêm trọn gói 2025",
    departurePoint: "Hà Nội",
    rating: 5,
  },
  {
    id: 2,
    imageUrl: "https://i.postimg.cc/Wb8j3WTR/ha-giang.jpg",
    price: "42,990,000đ",
    duration: "6N/5Đ",
    location: "Trung Quốc",
    title:
      "Hành trình khám phá Hà Nội - Cáp Nhĩ Tân - Hắc Long Giang 6 ngày 5 đêm: (Thiên đường băng tuyết và văn hóa phương Bắc)",
    departurePoint: "Hà Nội",
    rating: 5,
  },
  {
    id: 3,
    imageUrl: "https://i.postimg.cc/6qW85jVb/trung-quoc-2.jpg",
    price: "12,690,000đ",
    duration: "6N/5Đ",
    location: "Trung Quốc",
    title:
      "Khám Phá Trung Quốc: Chuyến Hành Trình 6 Ngày 5 Đêm Từ Hà Nội Đến Đại Lý, Côn Minh, Lệ Giang và Shangrila.",
    departurePoint: "Hà Nội",
    rating: 4,
  },
];

export function FavoriteTours() {
  return (
    <section className="py-16 bg-gray-50 px-4 sm:px-8 md:px-20">
      {" "}
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <p className="text-red-500 font-bold text-sm tracking-widest relative inline-block">
            <span className="absolute top-1/2 left-[-2rem] w-6 h-px bg-red-400"></span>
            EXPLORE GREAT PLACES
            <span className="absolute top-1/2 right-[-2rem] w-6 h-px bg-red-400"></span>
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
            NHỮNG TOUR ĐƯỢC YÊU THÍCH
          </h2>
          <p className="mt-4 text-md text-gray-600">
            Các tour được đặt nhiều nhất trong tháng này.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursData.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
