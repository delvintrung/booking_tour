import { useEffect, useState } from "react";
import TourCard from "@/components/home/card/TourCard";
import type { Tour } from "@/types";
import { AxiosClient } from "@/lib/utils";
import Loading from "@/components/Loading";

const TourPage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTours = async () => {
    try {
      setIsLoading(true);
      const response = await AxiosClient.get("/tours");
      const results = response.data.data.result || [];
      setTours(results);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  console.log("Tours data:", tours);

  if (isLoading) return <Loading />;

  if (!isLoading && tours.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">Hiện chưa có tour nào được đăng.</p>
        <p className="text-sm mt-2">
          Vui lòng quay lại sau hoặc thử làm mới trang.
        </p>
      </div>
    );

  return (
    <div className="container mx-auto px-20 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default TourPage;
