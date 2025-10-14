import { Star } from "lucide-react";

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }, (_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
};

interface DestinationCardProps {
  imageUrl: string;
  tag: string;
  title: string;
  rating: number;
  large?: boolean;
}

export function DestinationCard({
  imageUrl,
  tag,
  title,
  rating,
  large = false,
}: DestinationCardProps) {
  const cardHeight = large ? "h-[440px]" : "h-[212px]";

  return (
    <div
      className={`relative overflow-hidden rounded-xl text-white group ${cardHeight}`}
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-5">
        <div className="bg-blue-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-md self-start">
          {tag}
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
