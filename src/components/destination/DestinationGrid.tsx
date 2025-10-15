import DestinationCard from "./DestinationCard";
import type { Destination } from "@/types";

// Dữ liệu mẫu, thuộc tính `tall: true` sẽ quyết định thẻ nào cao hơn
const destinationsData: Destination[] = [
  {
    id: 1,
    tag: "Mai Châu- Mộc Châu",
    title:
      "Du lịch Mai Châu - Mộc Châu 2024: Khám Phá Vẻ Đẹp Mộc Mạc và Thơ Mộng",
    imageUrl: "https://i.postimg.cc/85M1f3x2/mai-chau.jpg",
    rating: 5,
    tall: true,
  },
  {
    id: 2,
    tag: "Nhật Bản",
    title: "Tour du lịch Nhật Bản 2024",
    imageUrl: "https://i.postimg.cc/0jL5q4fK/japan.jpg",
    rating: 5,
    tall: true,
  },
  {
    id: 3,
    tag: "Trung Quốc",
    title: "Tour Du Lịch Trung Quốc: Khám Phá Đất Nước Hùng Vĩ",
    imageUrl: "https://i.postimg.cc/mD3hYx4C/china.jpg",
    rating: 5,
    tall: false,
  },
  {
    id: 4,
    tag: "Dubai",
    title: "TOUR DU LỊCH DUBAI",
    imageUrl: "https://i.postimg.cc/sX1B721n/dubai.jpg",
    rating: 5,
    tall: false,
  },
  {
    id: 5,
    tag: "Hàn Quốc",
    title: null,
    imageUrl: "https://i.postimg.cc/2yXg0sCy/korea.jpg",
    rating: 5,
    tall: false,
  },
  {
    id: 6,
    tag: "Đài Loan",
    title: null,
    imageUrl: "https://i.postimg.cc/L5n4x9Yg/taiwan.jpg",
    rating: 5,
    tall: true,
  },
  {
    id: 7,
    tag: "Ninh Thuận",
    title: "Tour Ninh Thuận",
    imageUrl: "https://i.postimg.cc/wMP4y298/ninh-thuan.jpg",
    rating: 5,
    tall: true,
  },
  {
    id: 8,
    tag: "Thái Lan",
    title: "TOUR DU LỊCH THÁI LAN",
    imageUrl: "https://i.postimg.cc/pT3Y3YJk/thailand.jpg",
    rating: 5,
    tall: false,
  },
];

export function DestinationsGrid() {
  return (
    <section className="bg-white p-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
          {destinationsData.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
