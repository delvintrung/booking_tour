import { useState, useEffect, use } from "react";
import { MapPin, Clock, Hotel, Phone } from "lucide-react";
import { AxiosClient } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Review, Tour, TourDetail } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useSelectedTourStore } from "@/stores/selectedTourStore";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { toast } from "sonner";

const TourDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSendingReview, setIsSendingReview] = useState<boolean>(false);
  const [tour, setTour] = useState<Tour | null>(null);
  const [selectedTourDetail, setSelectedTourDetail] =
    useState<TourDetail | null>(null);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Review states
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // websocket
  const [stompClient, setStompClient] = useState<any>(null);

  // Handle submit review
  const handleSubmitReview = async () => {
    if (!tour) return;

    try {
      setIsSendingReview(true);
      const formData = new FormData();
      if (imageFile) {
        formData.append("file", imageFile);
        formData.append("folder", "reviews");
      }
      let uploadedImage = null;
      if (imageFile) {
        uploadedImage = await AxiosClient.post("tours/upload", formData);
      }
      const response = await AxiosClient.post(`/tours/reviews`, {
        reviewerName,
        rating,
        content,
        imageUrl: uploadedImage ? uploadedImage.data.data.fileName : null,
        tourId: tour.id,
      });

      if (response.data.statusCode === 201) {
        toast.success("Cảm ơn bạn đã gửi đánh giá!");
      }

      setReviewerName("");
      setRating(5);
      setContent("");
      setImageFile(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSendingReview(false);
    }
  };

  const fetchTourById = async (tourId: string) => {
    try {
      setLoading(true);
      const response = await AxiosClient.get(`/tours/${tourId}`);
      setTour(response.data.data);
    } catch (error) {
      console.error("Error fetching tour:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("Connected WebSocket!");
    });

    setStompClient(client);

    return () => client.disconnect();
  }, []);

  useEffect(() => {
    if (!stompClient || !stompClient.connected || !tour?.id) return;

    const subscription = stompClient.subscribe(
      `/topic/reviews/${tour.id}`,
      (msg: any) => {
        const newReview = JSON.parse(msg.body);
        setTour((prev: any) => {
          if (!prev) return prev;

          const updatedReviews = [...(prev.reviews || []), newReview];

          return {
            ...prev,
            reviews: updatedReviews,
          };
        });
      }
    );

    return () => subscription.unsubscribe();
  }, [stompClient, stompClient?.connected, tour?.id]);

  useEffect(() => {
    if (id) fetchTourById(id);
  }, [id]);

  useEffect(() => {
    const firstDetail = tour?.tourDetails?.[0] ?? null;
    if (firstDetail) {
      setSelectedTourDetail(firstDetail);
    }
  }, [tour]);

  const handleSelectChange = (value: string) => {
    const tourSelected = tour?.tourDetails?.find((t) => t.id === Number(value));
    if (tourSelected) setSelectedTourDetail(tourSelected);
  };

  const handleChangeToBooking = () => {
    if (tour && selectedTourDetail) {
      useSelectedTourStore.getState().setTour(tour!);
      useSelectedTourStore.getState().setTourDetail(selectedTourDetail);
      navigate(`/order-booking/${tour?.id}?offer=${selectedTourDetail.id}`);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-10">
      {tour && (
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
                <p>{tour.longDesc}</p>
                <p>{tour.shortDesc}</p>
              </TabsContent>

              <TabsContent
                value="schedule"
                className="pt-4 text-gray-700 space-y-4"
              >
                {selectedTourDetail && selectedTourDetail.itineraries ? (
                  selectedTourDetail.itineraries.map((itinerary, index) => (
                    <div key={itinerary.id} className="space-y-1">
                      <p className="font-semibold text-orange-600">
                        📅 {itinerary.title}
                      </p>
                      <p className="text-gray-700 whitespace-pre-line">
                        {itinerary.content}
                      </p>
                      <hr className="border-gray-200" />
                    </div>
                  ))
                ) : (
                  <p className="italic text-gray-500">
                    Chưa có lịch trình cho tour này.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="review" className="pt-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Đánh giá từ khách hàng
                  </h3>

                  {tour?.reviews && tour.reviews.length > 0 ? (
                    tour.reviews.map((rev) => (
                      <Card
                        key={rev.id}
                        className="border rounded-md shadow-sm"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">{rev.reviewerName}</p>
                            <p className="text-yellow-500 text-sm">
                              {"⭐".repeat(rev.rating)}
                            </p>
                          </div>
                          <p className="text-xs text-gray-400">
                            {new Date(rev.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </p>
                        </CardHeader>

                        <CardContent className="text-gray-700 text-sm space-y-2">
                          <p>{rev.content}</p>
                          {rev.imageUrl && (
                            <img
                              src={rev.imageUrl}
                              alt="review"
                              className="w-1/2 h-40 object-cover rounded-md"
                            />
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="italic text-gray-500">
                      Chưa có đánh giá nào cho tour này.
                    </p>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Để lại đánh giá của bạn
                  </h3>

                  <Input
                    placeholder="Tên của bạn..."
                    className="border-gray-300"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                  />

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        onClick={() => setRating(star)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={star <= rating ? "#f59e0b" : "#d1d5db"}
                        className="w-7 h-7 cursor-pointer transition-all hover:scale-110"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      placeholder="Chọn ảnh nếu muốn"
                      value={imageFile ? imageFile.name : ""}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setImageFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>

                  <textarea
                    placeholder="Nội dung đánh giá..."
                    className="w-full border border-gray-300 rounded-md p-2 h-28 text-sm"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />

                  <Button
                    className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold hover:cursor-pointer ${
                      isSendingReview ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleSubmitReview}
                    disabled={isSendingReview}
                  >
                    {isSendingReview ? "Đang gửi..." : "Gửi đánh giá"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      )}

      <div className="max-w-md mx-auto space-y-4">
        <p className="text-xl font-medium text-orange-600">
          Chọn ngày xuất phát và địa điểm tại đây
        </p>
        <Select
          onValueChange={handleSelectChange}
          value={String(selectedTourDetail?.id || "")}
        >
          <SelectTrigger className="w-full border-gray-300">
            <SelectValue placeholder="Chọn chuyến du lịch" />
          </SelectTrigger>
          <SelectContent>
            {tour?.tourDetails?.map((td) => (
              <SelectItem key={td.id} value={String(td.id)}>
                {tour.title} ({td.startDay} → {td.endDay})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Card className="p-6 space-y-4 shadow-lg border-gray-200">
          <CardHeader className="p-0">
            <h2 className="text-xl font-bold text-gray-800">{tour?.title}</h2>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex flex-col space-y-1">
              <img
                src={tour?.imageUrl}
                alt={tour?.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <span className="line-through text-sm text-gray-400">
                {(selectedTourDetail?.tourPrices
                  ? selectedTourDetail?.tourPrices[0]?.price * 1.12
                  : 0
                ).toLocaleString("vi-VN")}
                đ
              </span>
              <span className="text-3xl font-bold text-orange-600">
                {selectedTourDetail?.tourPrices?.[0].price?.toLocaleString(
                  "vi-VN"
                )}
                đ
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
                Nơi khởi hành: {selectedTourDetail?.startLocation}
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
              onClick={handleChangeToBooking}
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
    </div>
  );
};

export default TourDetails;
