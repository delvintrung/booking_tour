import { Card, CardContent } from "@/components/ui/card";

interface HistoryTourCardProps {
  id: number;
  bookingDetails: {
    tourDetail: {
      startLocation: string;
      startDay: [number, number, number];
    };
    quantity: number;
  }[];
  status: string;
  totalPrice: string;
  createdAt: string;
}
const HistoryTourCard = (b: HistoryTourCardProps) => {
  return (
    <Card key={b.id} className="border border-gray-100 shadow-sm">
      <CardContent className="p-4 space-y-1">
        <h3 className="font-semibold text-lg text-blue-800">
          Tour tại{" "}
          {b.bookingDetails?.[0]?.tourDetail?.startLocation ||
            `Đơn hàng #${b.id}`}
        </h3>
        <p className="text-sm text-gray-500">
          Ngày khởi hành:{" "}
          {b.bookingDetails?.[0]?.tourDetail?.startDay
            ? new Date(
                b.bookingDetails[0].tourDetail.startDay[0],
                b.bookingDetails[0].tourDetail.startDay[1] - 1, // Tháng trong JS là 0-11
                b.bookingDetails[0].tourDetail.startDay[2]
              ).toLocaleDateString("vi-VN")
            : "Chưa có"}
        </p>

        {/* Trạng thái: Lấy trực tiếp từ b.status
      Bạn có thể muốn thay đổi màu sắc (text-green-600) dựa trên giá trị
    */}
        <p className="text-sm text-gray-500">
          Trạng thái:{" "}
          <span className="font-medium text-green-600">{b.status}</span>
        </p>

        {/* Tổng giá: Lấy từ b.totalPrice. 
      Dùng parseFloat() để chuyển chuỗi "6000000.0" thành số trước khi định dạng.
    */}
        <p className="text-sm mt-1">
          Tổng giá:{" "}
          <span className="font-semibold text-red-500">
            {parseFloat(b.totalPrice).toLocaleString("vi-VN")}đ
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
