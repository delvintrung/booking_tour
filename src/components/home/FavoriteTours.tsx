import { useEffect, useState } from "react";
import TourCard from "./card/TourCard";
import type { Tour } from "@/types";
import { AxiosClient } from "@/lib/utils";
import Loading from "../Loading";

export function FavoriteTours() {
  const [toursData, setToursData] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTours = async () => {
    try {
      setIsLoading(true);
      const response = await AxiosClient.get("/tours");
      setToursData(response.data.data.result.slice(0, 3));
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch tours on component mount
  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-16 bg-gray-50 px-4 sm:px-8 md:px-20">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <p className="text-red-500 font-bold text-sm tracking-widest relative inline-block">
            <span className="absolute top-1/2 left-[-2rem] w-6 h-px bg-red-400"></span>
            EXPLORE GREAT PLACES
            <span className="absolute top-1/2 right-[-2rem] w-6 h-px bg-red-400"></span>
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
            NHỮNG TOUR ĐƯỢC YÊU THÍCH
          </h2>
          <p className="mt-4 text-md text-gray-600">
            Các tour được đặt nhiều nhất trong tháng này.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursData.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
