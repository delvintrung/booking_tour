import { Button } from "@/components/ui/button";
import { DestinationCard } from "./card/DestinationCard";

const destinations = [
  {
    id: 1,
    tag: "Trung Quốc",
    title: "Tour Du Lịch Trung Quốc: Khám Phá Đất Nước Hùng Vĩ",
    rating: 5,
    imageUrl: "https://i.postimg.cc/mD3hYx4C/china.jpg",
    large: true,
  },
  {
    id: 2,
    tag: "Nhật Bản",
    title: "Tour du lịch Nhật Bản 2024",
    rating: 5,
    imageUrl: "https://i.postimg.cc/0jL5q4fK/japan.jpg",
    large: true,
  },
  {
    id: 3,
    tag: "Hàn Quốc",
    title: "",
    rating: 5,
    imageUrl: "https://i.postimg.cc/2yXg0sCy/korea.jpg",
  },
  {
    id: 4,
    tag: "Thái Lan",
    title: "TOUR DU LỊCH THÁI LAN",
    rating: 5,
    imageUrl: "https://i.postimg.cc/pT3Y3YJk/thailand.jpg",
  },
];

export function PopularDestinations() {
  return (
    <section className="py-20 bg-white px-20">
      <div className="container mx-auto pb-4 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="mb-4 md:mb-0">
            <p className="text-red-500 font-semibold text-sm uppercase">
              POPULAR DESTINATION
            </p>
            <h2 className="text-4xl font-bold text-gray-800">
              ĐIỂM ĐẾN HÀNG ĐẦU
            </h2>
          </div>
          <p className="max-w-md text-gray-600">
            Khám phá ngay các tour, hoạt động du lịch và địa điểm tham quan cho
            hành trình du lịch của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <DestinationCard {...destinations[0]} />
          </div>

          <div className="lg:col-span-1">
            <DestinationCard {...destinations[1]} />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            <DestinationCard {...destinations[2]} />
            <DestinationCard {...destinations[3]} />
          </div>
        </div>

        <div className="text-center mt-10">
          <Button className="bg-[#F35C4C] hover:bg-[#e14c3e] text-white font-bold py-3 px-6 text-base rounded-lg h-auto">
            XEM THÊM ĐIỂM ĐẾN
          </Button>
        </div>
      </div>
    </section>
  );
}
