import type { Tour } from "@/types";
import TourCard from "@/components/home/card/TourCard";

const ListTours = () => {
  const tours: Tour[] = [
    {
      id: 1,
      imageUrl:
        "https://cdn.bookingtour.vn/upload/2024/09/21/mceu_36378355411726932451214.jpg",
      price: 79990000,
      duration: "10N/9Đ",
      location: "Trung Quốc",
      title:
        "Khám Phá Tân Cương Huyền Bí 10 Ngày 9 Đêm: Trải Nghiệm Từ Hà Nội Đến Vùng Đất Thiên Đường Trung Hoa!",
      departurePoint: "Hà Nội",
      rating: 5,
    },
    {
      id: 2,
      imageUrl:
        "https://cdn.bookingtour.vn/upload/2024/09/21/mceu_36144653117269325370949.jpg",
      price: 43990000,
      duration: "8N/7Đ",
      location: "Trung Quốc",
      title:
        "Tour Trung Quốc 8 ngày 7 đêm: Khám Phá Tân Cương - Cam Túc - Đan Hà - Đôn Hoàng, Khởi Hành Từ TP. Hồ Chí Minh",
      departurePoint: "Hồ Chí Minh",
      rating: 5,
    },
    {
      id: 3,
      imageUrl:
        "https://cdn.bookingtour.vn/upload/2024/09/21/mceu_58755800117269324914792.jpg",
      price: 42990000,
      duration: "6N/5Đ",
      location: "Trung Quốc",
      title:
        "Hành trình khám phá Hà Nội - Cáp Nhĩ Tân - Hắc Long Giang 6 ngày 5 đêm: (Thiên đường băng tuyết và văn hóa phương Bắc)",
      departurePoint: "Hà Nội",
      rating: 5,
    },
  ];
  return (
    <div className="container mx-auto px-20 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default ListTours;
