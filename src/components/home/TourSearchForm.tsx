import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Users, Plane, ArrowRightLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosClient } from "@/lib/utils";
import SuggestedTourItem from "./AISearch/SuggestTourItem";
interface Searchvalue {
  location: string;
  startLocation: string;
  remainingSeats: number;
}

export function TourSearchForm() {
  const navigate = useNavigate();
  const [traditionalSearchType, setTraditionalSearchType] = useState(true);
  const [AIResponse, setAIResponse] = useState<string[]>([]);
  const [valueSearch, setValueSearch] = useState<Searchvalue>({
    location: "",
    startLocation: "",
    remainingSeats: 0,
  });
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [semeticSearch, setSemeticSearch] = useState<string>("");

  const handleSearchSubmit = async (e: React.FormEvent) => {
    console.log("Submitting search form");
    e.preventDefault();
    try {
      if (!traditionalSearchType) {
        // Call semantic search API
        if (semeticSearch.trim().length === 0) {
          toast.error("Vui lòng nhập thông tin tìm kiếm");
          return;
        }
        try {
          setIsWaiting(true);
          const response = await AxiosClient.get("/ai/tour/search", {
            params: { query: semeticSearch },
          });

          const data = response.data.data;
          setAIResponse(data);
        } catch (error) {
          console.error("Lỗi tìm kiếm ngữ nghĩa:", error);
          toast.error("Đã xảy ra lỗi trong quá trình tìm kiếm");
        } finally {
          setIsWaiting(false);
        }
      } else {
        let stringSearch = "";
        if (valueSearch.location) {
          stringSearch += "location=" + valueSearch.location + "&";
        }
        if (valueSearch.startLocation) {
          stringSearch += "startLocation=" + valueSearch.startLocation + "&";
        }
        if (valueSearch.remainingSeats) {
          stringSearch += "remainingSeats=" + valueSearch.remainingSeats;
        }

        if (stringSearch.length > 0) {
          setTimeout(() => {
            navigate("/tour/find?" + stringSearch);
          }, 1000);
        } else {
          alert("Vui lòng nhập thông tin tìm kiếm");
        }
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };
  return (
    <div className="flex items-center justify-center bg-white absolute top-[-70px] right-[50%] translate-x-[50%] z-50">
      <Card className="w-full shadow-lg relative">
        <CardContent className="p-6 min-w-[710px]">
          {traditionalSearchType ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <Label
                  htmlFor="start-point"
                  className="font-semibold text-gray-600 flex items-center"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Bạn ở đâu?
                </Label>
                <Input
                  id="start-point"
                  placeholder="Điểm khởi hành"
                  value={valueSearch.startLocation}
                  onChange={(e) =>
                    setValueSearch({
                      ...valueSearch,
                      startLocation: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="destination"
                  className="font-semibold text-gray-600 flex items-center"
                >
                  <Plane className="w-4 h-4 mr-2" />
                  Bạn muốn đi Tour*
                </Label>
                <Input
                  id="destination"
                  placeholder="Chọn Tour bạn muốn đi"
                  value={valueSearch.location}
                  onChange={(e) =>
                    setValueSearch({
                      ...valueSearch,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="num-people"
                  className="font-semibold text-gray-600 flex items-center"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Số người
                </Label>
                <Input
                  id="num-people"
                  type="number"
                  placeholder="Số người đi"
                  value={valueSearch.remainingSeats}
                  onChange={(e) =>
                    setValueSearch({
                      ...valueSearch,
                      remainingSeats: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Button
                  className="w-full bg-[#F35C4C] hover:bg-[#e14c3e] text-white font-bold text-base h-10"
                  onClick={handleSearchSubmit}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Tìm kiếm
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
                <div className="space-y-2 col-span-3">
                  <Label
                    htmlFor="prompt"
                    className="font-semibold text-gray-600 flex items-center"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Mong muốn của bạn?
                  </Label>
                  <Input
                    id="prompt"
                    placeholder="Mong muốn của bạn"
                    onChange={(e) => setSemeticSearch(e.target.value)}
                    value={semeticSearch}
                  />
                </div>
                <div>
                  <Button
                    className="w-full bg-[#F35C4C] hover:bg-[#e14c3e] text-white font-bold text-base h-10"
                    onClick={handleSearchSubmit}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Tìm kiếm
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                {isWaiting && <p>Đang tìm kiếm...</p>}
                {!isWaiting &&
                  AIResponse.length > 0 &&
                  semeticSearch.trim().length > 0 && (
                    <div className="max-w-3xl mx-auto py-6 z-20">
                      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                        ✨ Gợi ý từ AI dành cho bạn
                      </h2>

                      <div className="space-y-4">
                        {AIResponse.map((itemString, index) => (
                          <SuggestedTourItem
                            key={index}
                            rawString={itemString}
                          />
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
          <div className="flex justify-between items-center absolute right-2 top-2 p-4">
            <p></p>
            <div
              className="p-2 border rounded-md w-fit hover:shadow-md hover:cursor-pointer mb-2"
              onClick={() => setTraditionalSearchType(!traditionalSearchType)}
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
