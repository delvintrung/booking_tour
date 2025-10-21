import DestinationCard from "./DestinationCard";
import type { Destination } from "@/types";

const destinationsData: Destination[] = [
  {
    id: 1,
    location: "Mai Châu- Mộc Châu",
    title:
      "Du lịch Mai Châu - Mộc Châu 2024: Khám Phá Vẻ Đẹp Mộc Mạc và Thơ Mộng",
    image: "/destination/vietnam/maichau.png",
    rating: 5,
    tall: true,
    keyName: "mai-chau",
  },
  {
    id: 2,
    location: "Nhật Bản",
    title: "Tour du lịch Nhật Bản 2024",
    image: "/destination/japan/phu-sy.jpg",
    rating: 5,
    tall: true,
    keyName: "japan",
  },
  {
    id: 3,
    location: "Trung Quốc",
    title: "Tour Du Lịch Trung Quốc: Khám Phá Đất Nước Hùng Vĩ",
    image: "/destination/china/van-nam.webp",
    rating: 5,
    tall: false,
    keyName: "china",
  },
  {
    id: 4,
    location: "Dubai",
    title: "TOUR DU LỊCH DUBAI",
    image: "/destination/dubai/dubai.png",
    rating: 5,
    tall: false,
    keyName: "dubai",
  },
  {
    id: 5,
    location: "Hàn Quốc",
    title: "Tour Du Lịch Hàn Quốc: Trải Nghiệm Văn Hóa và Thiên Nhiên",
    image: "/destination/korea/han-quoc.jpg",
    rating: 5,
    tall: false,
    keyName: "korea",
  },
  {
    id: 6,
    location: "Đài Loan",
    title: "Tour Du Lịch Đài Loan: Hành Trình Khám Phá Vẻ Đẹp Đông Phương",
    image: "/destination/taiwan/dai-loan.jpg",
    rating: 5,
    tall: true,
    keyName: "taiwan",
  },
  {
    id: 7,
    location: "Ninh Thuận",
    title: "TOUR DU LỊCH NINH THUẬN",
    image: "/destination/vietnam/ninh-thuan.jpg",
    rating: 5,
    tall: true,
    keyName: "ninh-thuan",
  },
  {
    id: 8,
    location: "Thái Lan",
    title: "TOUR DU LỊCH THÁI LAN",
    image: "/destination/thailand/chua-vang.jpg",
    rating: 5,
    tall: false,
    keyName: "thailand",
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
