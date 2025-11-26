import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { AxiosClient } from "@/lib/utils";
import type { Tour } from "@/types";
import TourCard from "../home/card/TourCard";

const FindResult = () => {
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = searchParams.get("location");
  const startLocation = searchParams.get("startLocation");
  const remainingSeats = searchParams.get("remainingSeats");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const res = await AxiosClient.get("/tours/search", {
          params: {
            location: location,
            startLocation: startLocation,
            remainingSeats: remainingSeats,
          },
        });
        setTours(res.data.data);
      } catch (error) {
        console.error("Lỗi tìm kiếm tour:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, startLocation, remainingSeats]);

  if (isLoading) {
    return <div>Đang tải kết quả tìm kiếm...</div>;
  }

  return (
    <div className="container mx-auto px-20 py-8 ">
      <p className="text-2xl font-bold py-2">
        Kết quả tìm kiếm: {tours.length}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default FindResult;
