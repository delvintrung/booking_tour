import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Tag } from "lucide-react";
import { parseTourString } from "@/lib/tourParser";

interface Props {
  rawString: string;
}

const SuggestedTourItem: React.FC<Props> = ({ rawString }) => {
  const tourData = useMemo(() => parseTourString(rawString), [rawString]);

  if (!tourData) return null;

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row p-4 gap-4 mb-4">
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <Link to={tourData.link} className="hover:cursor-pointer">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tourData.title}
              </h3>
            </Link>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2">
              ID: {tourData.id}
            </span>
          </div>

          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            {tourData.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            {tourData.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>{tourData.location}</span>
              </div>
            )}
            {tourData.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>{tourData.duration}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex md:flex-col items-center justify-between md:justify-center md:items-end gap-3 md:border-l md:pl-4 min-w-[140px]">
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400">Giá tham khảo</span>
          <span className="text-lg font-bold text-red-600">
            {tourData.price}
          </span>
        </div>
        <Link
          to={tourData.link}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          Xem chi tiết <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default SuggestedTourItem;
