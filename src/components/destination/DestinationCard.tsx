import { Star } from "lucide-react";
import type { Destination } from "@/types";
import { Link } from "react-router-dom";

const StarRating = ({ rating = 5 }) => (
  <div className="flex items-center gap-1 mt-2">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 text-white ${
          i < rating ? "fill-white" : "fill-transparent"
        }`}
      />
    ))}
  </div>
);

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  const { image, location, title, rating, tall = false } = destination;
  const cardHeightClass = tall ? "lg:row-span-2" : "lg:row-span-1";

  return (
    <div
      className={`relative group overflow-hidden rounded-xl text-white ${cardHeightClass}`}
    >
      <img
        src={image}
        alt={location}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      <div className="relative h-full flex flex-col justify-between p-5">
        <Link
          to={`/destination/${destination.keyName || ""}`}
          className="bg-blue-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-md self-start"
        >
          {location}
        </Link>

        <Link to={`/destination/${destination.keyName || ""}`}>
          {title && (
            <h3 className="text-xl font-bold leading-tight">{title}</h3>
          )}
          <StarRating rating={rating} />
        </Link>
      </div>
    </div>
  );
}
