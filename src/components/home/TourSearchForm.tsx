import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Users, Plane } from "lucide-react";

export function TourSearchForm() {
  return (
    <div className="flex items-center justify-center bg-white absolute top-[-70px] right-[50%] translate-x-[50%]">
      <Card className="w-full shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label
                htmlFor="start-point"
                className="font-semibold text-gray-600 flex items-center"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Bạn ở đâu?
              </Label>
              <Input id="start-point" placeholder="Điểm khởi hành" />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="destination"
                className="font-semibold text-gray-600 flex items-center"
              >
                <Plane className="w-4 h-4 mr-2" />
                Bạn muốn đi Tour*
              </Label>
              <Input id="destination" placeholder="Chọn Tour bạn muốn đi" />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="num-people"
                className="font-semibold text-gray-600 flex items-center"
              >
                <Users className="w-4 h-4 mr-2" />
                Số người
              </Label>
              <Input id="num-people" type="number" placeholder="Số người đi" />
            </div>

            <Button className="w-full bg-[#F35C4C] hover:bg-[#e14c3e] text-white font-bold text-base h-10">
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
