import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Clock, MapPin, ArrowRight, Heart } from "lucide-react";
import type { Tour } from "@/types";

const StarRating = ({ rating = 5 }) => (
  <div className="flex items-center gap-0.5">
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

const TourCard: React.FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg border border-gray-200">
      <div className="relative">
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="w-full h-56 object-cover"
        />

        <div className="absolute top-4 left-4 bg-red-500 text-white font-bold text-base py-1.5 px-3 rounded-md">
          {tour.price} / người
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center text-white text-sm gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{tour.days}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{tour.location}</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-xl font-bold text-gray-800 h-16 leading-tight overflow-hidden">
          {tour.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
          <span>Điểm khởi hành: {tour.departurePoint}</span>
          <StarRating rating={tour.rating} />
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t border-gray-100 flex justify-between items-center">
        <button className="font-semibold text-gray-800 hover:text-red-500 flex items-center gap-1.5 transition-colors">
          Book Now
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="font-semibold text-gray-600 hover:text-red-500 flex items-center gap-1.5 transition-colors">
          Wish List
          <Heart className="w-4 h-4" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default TourCard;
