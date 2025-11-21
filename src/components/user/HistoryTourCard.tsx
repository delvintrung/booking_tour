import { Card, CardContent } from "@/components/ui/card";
import { formatVND } from "@/lib/utils";
import type { Booking } from "@/types";
import { toast } from "sonner";

const HistoryTourCard = (b: Booking) => {
  const handleCopyOrderCode = () => {
    navigator.clipboard.writeText(b.orderCode);
    toast.info("Đã sao chép mã thanh toán vào clipboard!");
  };
  return (
    <Card key={b.id} className="border border-gray-100 shadow-sm">
      <CardContent className="p-4 space-y-1">
        <h3 className="font-semibold text-lg text-blue-800">
          Tour tại{" "}
          {b.bookingDetails?.[0].tourDetail?.startLocation ||
            `Đơn hàng #${b.id}`}
        </h3>
        <p className="text-sm text-gray-500">
          Mã thanh toán:{" "}
          <span
            onClick={handleCopyOrderCode}
            className="cursor-pointer text-gray-600 underline border rounded-sm px-1 hover:bg-gray-100"
            title="Nhấn để sao chép mã"
          >
            {b.orderCode}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Ngày khởi hành:{" "}
          {b.bookingDetails?.[0]?.tourDetail?.startDay
            ? new Date(
                b.bookingDetails[0].tourDetail.startDay
              ).toLocaleDateString("vi-VN")
            : "Chưa có"}
        </p>

        <p className="text-sm text-gray-500">
          Trạng thái:{" "}
          <span className="font-medium text-green-600">{b.status}</span>
        </p>

        <p className="text-sm mt-1">
          Tổng giá:{" "}
          <span className="font-semibold text-red-500">
            {formatVND(b.totalPrice)}
          </span>
        </p>

        {/* Thông tin thêm: Tính tổng số lượng vé từ tất cả bookingDetails
         */}
        <p className="text-sm text-gray-500">
          Tổng số vé:{" "}
          {b.bookingDetails?.reduce(
            (total, detail) => total + detail.quantity,
            0
          )}
        </p>

        <p className="text-sm text-gray-500">
          Ngày đặt:{" "}
          {new Date(
            b.createdAt.replace(" PM", "").replace(" AM", "")
          ).toLocaleDateString("vi-VN")}
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoryTourCard;
