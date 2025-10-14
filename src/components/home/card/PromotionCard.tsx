import { Card, CardContent } from "@/components/ui/card";
import type { Promotion } from "@/types";

export function PromotionCard({ promotion }: { promotion: Promotion }) {
  const {
    imageUrl,
    discount,
    locationTag,
    title,
    originalPrice,
    discountedPrice,
  } = promotion;

  return (
    <Card className="overflow-hidden group border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white w-16 h-16 rounded-full flex flex-col items-center justify-center text-center leading-tight shadow-lg">
          <span className="font-bold text-2xl">{discount}%</span>
          <span className="text-xs uppercase">off</span>
        </div>
      </div>
      <CardContent className="p-5">
        <p className="font-bold text-sm text-blue-600 uppercase mb-2">
          {locationTag}
        </p>
        <h3 className="text-lg font-bold text-gray-800 h-24 mb-3 overflow-hidden">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Giá:</span>
          <span className="text-gray-500 line-through">{originalPrice}</span>
          <span className="text-red-600 font-bold text-lg">
            {discountedPrice}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
