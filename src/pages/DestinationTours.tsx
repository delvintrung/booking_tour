import type { Tour } from "@/types";
import TourCard from "@/components/home/card/TourCard";
import headerDestinations from "@/lib/headerBackground";
import { useParams } from "react-router-dom";
import { AxiosClient } from "@/lib/utils";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const DestinationTours = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const { name } = useParams<{ name: string }>();
  const currentDestination = headerDestinations.find(
    (dest) => dest.key === name
  );

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      try {
        const response = await AxiosClient.get(`/tours`);
        const results =
          response.data.data.result.filter((tour: Tour) =>
            tour.location
              ?.toLowerCase()
              .includes(currentDestination?.title.toLowerCase() || "")
          ) || [];
        setAllTours(results);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (name && currentDestination) {
      fetchTours();
    }
  }, [name, currentDestination]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-20 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTours.length > 0 ? (
          allTours.map((tour) => <TourCard key={tour.id} tour={tour} />)
        ) : (
          <p className="text-center col-span-full text-2xl font-semibold text-gray-500">
            Không có tour nào phù hợp với điểm đến này.
          </p>
        )}
      </div>
    </div>
  );
};

export default DestinationTours;
