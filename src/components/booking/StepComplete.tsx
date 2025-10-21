import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import BookingSummary from "./BookingSummary";

interface Props {
  restartBooking: () => void;
}

const StepComplete: React.FC<Props> = ({ restartBooking }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT: Success message */}
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

        {/* Thông tin đơn hàng */}
        <div className="w-full max-w-2xl bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-blue-700 mb-3">
            Thông tin đơn đặt tour
          </h3>
          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-medium">Mã đặt tour:</span> BTXK20251021
            </p>
            <p>
              <span className="font-medium">Tên khách hàng:</span> Nguyễn Văn A
            </p>
            <p>
              <span className="font-medium">Phương thức thanh toán:</span> Momo
            </p>
            <p>
              <span className="font-medium">Ngày đặt:</span>{" "}
              {new Date().toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Buttons */}
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

      {/* RIGHT: Booking Summary */}
      <div>
        <BookingSummary />
      </div>
    </div>
  );
};

export default StepComplete;
