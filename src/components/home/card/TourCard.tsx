import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Clock, MapPin, ArrowRight, Heart } from "lucide-react";
import type { Tour } from "@/types";

// Component để render các ngôi sao
const StarRating = ({ rating = 5, className = "" }) => (
  <div className={`flex items-center gap-0.5 ${className}`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-red-500 fill-red-500" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

export default function TourCard({ tour }: { tour: Tour }) {
  const { imageUrl, price, duration, location, title, departurePoint, rating } =
    tour;

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border-gray-200">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-52 object-cover" />
        <div className="absolute top-0 right-0 bg-red-500 text-white font-bold text-lg py-2 px-4 rounded-bl-xl">
          {price}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Meta info: Duration and Location */}
        {(duration || location) && (
          <div className="flex items-center text-sm text-gray-500 mb-2 gap-4">
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 h-20 overflow-hidden">
          {title}
        </h3>

        {/* Departure Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
          <span>Khởi hành tại: {departurePoint}</span>
          <StarRating rating={rating} />
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t border-gray-100 flex justify-between items-center">
        <button className="font-semibold text-red-500 hover:text-red-700 flex items-center gap-1">
          Đặt Tour
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="font-semibold text-gray-600 hover:text-red-500 flex items-center gap-1">
          Wish List
          <Heart className="w-4 h-4" />
        </button>
      </CardFooter>
    </Card>
  );
}
