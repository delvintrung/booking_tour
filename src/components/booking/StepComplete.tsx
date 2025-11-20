import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import BookingSummary from "./BookingSummary";
import { useEffect, useState } from "react";
import { AxiosClient } from "@/lib/utils";
import type { Booking } from "@/types";

interface Props {
  bookingId: string | undefined;
  restartBooking: () => void;
}

interface Payment {
  id: number;
  amount: number;
  status: string;
  method: string;
  createdAt?: string;
  updatedAt?: string;
}

const StepComplete: React.FC<Props> = ({ bookingId, restartBooking }) => {
  const [bookingOrdered, setBookingOrdered] = useState<Booking | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const fetchBookingDetails = async (id: string) => {
    const response = await AxiosClient.get("/booking/" + id);
    if (response.status === 200) {
      setBookingOrdered(response.data.data);
      const paymentResponse = await AxiosClient.get("/payment/booking/" + id);
      if (paymentResponse.status === 200) {
        setPayment(paymentResponse.data.data);
      }
    }
  };
  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails(bookingId);
    }
  }, [bookingId]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-12 px-6 bg-white shadow-sm rounded-lg border">
        <CheckCircle2 className="text-green-500 w-20 h-20 mb-4" />
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          ĐẶT TOUR THÀNH CÔNG!
        </h2>
        <p className="text-gray-600 max-w-md mb-8">
          Cảm ơn bạn đã tin tưởng lựa chọn dịch vụ của chúng tôi 💙 Một email
          xác nhận đơn hàng đã được gửi đến địa chỉ của bạn. Hãy kiểm tra email
          để xem thông tin chi tiết chuyến đi.
        </p>

        <div className="w-full max-w-2xl bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-blue-700 mb-3">
            Thông tin đơn đặt tour
          </h3>
          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-medium">Mã đặt tour:</span>{" "}
              {bookingOrdered?.orderCode}
            </p>
            <p>
              <span className="font-medium">Tên khách hàng:</span>{" "}
              {bookingOrdered?.contactFullname}
            </p>
            <p>
              <span className="font-medium">Phương thức thanh toán:</span>{" "}
              {payment?.method}
            </p>
            <p>
              <span className="font-medium">Ngày đặt:</span>{" "}
              {new Date(bookingOrdered?.createdAt || "").toLocaleDateString(
                "vi-VN"
              )}
            </p>
            <p>
              <span className="font-medium">Thanh toán lúc:</span>{" "}
              {new Date(bookingOrdered?.updatedAt || "").toLocaleDateString(
                "vi-VN"
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={restartBooking}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Đặt thêm tour khác
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700"
            onClick={() => (window.location.href = "/")}
          >
            Về trang chủ
          </Button>
        </div>
      </div>

      <div>
        <BookingSummary />
      </div>
    </div>
  );
};

export default StepComplete;
