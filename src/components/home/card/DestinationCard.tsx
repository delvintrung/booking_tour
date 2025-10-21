import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Destination } from "@/types";

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }, (_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
};

export function DestinationCard({
  image,
  location,
  title,
  rating,
  keyName,
  tall = false,
}: Destination) {
  const cardHeight = tall ? "h-[440px]" : "h-[212px]";
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/destination/${keyName}`);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl text-white group ${cardHeight} hover:cursor-pointer `}
      onClick={handleRedirect}
    >
      <img
        src={image}
        alt={title!}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      <div className="relative h-full flex flex-col justify-between p-5">
        <div className="bg-blue-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-md self-start">
          {location}
        </div>

        <div>
          <h3 className="text-xl font-bold leading-tight">{title}</h3>
          <div className="mt-2">
            <StarRating rating={rating} />
          </div>
        </div>
      </div>
    </div>
  );
}
