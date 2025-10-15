import React from "react";
import TourCard from "@/components/tour/card/TourCard";
import type { Tour } from "@/types";
const tours: Tour[] = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/300x200?text=Tour+Quan+Lan",
    price: 2250000,
    title: "Tour du lịch Quan Lan 3 ngày 2 đêm trong gói 2025",
    location: "Hà Nội",
    rating: 4.5,
    days: "3 ngày 2 đêm",
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/300x200?text=Universal+Singapore",
    price: 11490000,
    title: "Chuyến Du Lịch Bắc Ninh - Singapore 4 Ngày 3 Đêm",
    location: "Bắc Ninh",
    rating: 4.7,
    days: "4 ngày 3 đêm",
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/300x200?text=Haiphong+Singapore",
    price: 12900000,
    title: "Chuyến du lịch Hải Phòng - Singapore 4 ngày 3 đêm",
    location: "Hải Phòng",
    rating: 4.6,
    days: "4 ngày 3 đêm",
  },
];

const TourPage: React.FC = () => {
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

export default TourPage;
