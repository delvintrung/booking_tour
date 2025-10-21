import { use, useState } from "react";
import { MapPin, Clock, Hotel, Phone } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import type { Tour } from "@/types";
import { useNavigate } from "react-router-dom";

const TourDetails = () => {
  const [tour, setTour] = useState<Tour | null>(null);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  const handleChangePage = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-10">
      <Card className="lg:col-span-2">
        <CardHeader>
          <Tabs defaultValue="highlight">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="highlight">Điểm đặc sắc</TabsTrigger>
              <TabsTrigger value="schedule">Lộ trình tour</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>

            <TabsContent
              value="highlight"
              className="pt-4 text-gray-700 space-y-4"
            >
              <p>
                <strong>Kashgar cổ kính:</strong> Trải nghiệm Phố cổ và chợ
                phiên Con đường Tơ Lụa.
              </p>
              <p>
                <strong>Hồ Sayram:</strong> Hồ nước lớn nhất trên núi Tân Cương.
              </p>
              <p>
                <strong>Dushanzi Canyon:</strong> Một trong 100 điểm chụp ảnh
                đẹp nhất Tân Cương.
              </p>
            </TabsContent>

            <TabsContent
              value="schedule"
              className="pt-4 text-gray-700 space-y-2"
            >
              <p>📅 Ngày 1: Hà Nội – Kashgar</p>
              <p>📅 Ngày 2–9: Tham quan Nalati, Sayram, Dushanzi...</p>
              <p>📅 Ngày 10: Trở về</p>
            </TabsContent>

            <TabsContent value="review" className="pt-4 italic text-gray-600">
              “Tour rất đáng tiền, hướng dẫn viên chuyên nghiệp, cảnh đẹp tuyệt
              vời.” ⭐⭐⭐⭐⭐
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>

      <Card className="p-6 space-y-4">
        <CardHeader className="p-0">
          <h2 className="text-xl font-bold text-gray-800">{tour?.title}</h2>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex flex-col space-y-1">
            <span className="line-through text-sm text-gray-400">
              {(tour?.price ? tour.price * 1.12 : 0).toLocaleString("vi-VN")}đ
            </span>
            <span className="text-3xl font-bold text-orange-600">
              {tour?.price?.toLocaleString("vi-VN")}đ
              <span className="text-base font-normal text-gray-500">
                {" "}
                / người
              </span>
            </span>
            <div className="text-xs bg-red-500 text-white px-2 py-1 w-fit rounded">
              Tiết kiệm 11%
            </div>
          </div>

          <Separator />

          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="text-orange-500 w-4 h-4" />
              Nơi khởi hành: {tour?.departurePoint}
            </div>
            <div className="flex items-center gap-2">
              <Hotel className="text-orange-500 w-4 h-4" />
              Khách sạn: 4 sao
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-orange-500 w-4 h-4" />
              Thời gian: {tour?.duration}
            </div>
          </div>

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-base font-semibold rounded-md hover:cursor-pointer"
            onClick={() => handleChangePage(`order-booking/${tour?.id}`)}
          >
            ĐẶT NGAY
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Giữ chỗ ngay bây giờ – Thanh toán sau
          </p>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Số điện thoại..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-gray-300"
            />
            <Button
              size="icon"
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Phone size={16} />
            </Button>
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t">
          <div className="text-center w-full text-gray-500 text-sm">
            <p className="font-semibold mb-1">
              ĐẶT TOUR QUA BOOKINGTOUR ĐƯỢC GÌ?
            </p>
            <p>✅ Thanh toán linh hoạt</p>
            <p>✅ Hỗ trợ 24/7</p>
            <p>✅ Cam kết giá tốt nhất</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TourDetails;
