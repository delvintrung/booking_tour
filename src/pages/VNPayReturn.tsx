import { useSelectedTourStore } from "@/stores/selectedTourStore";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function VNPayReturn() {
  const [searchParams] = useSearchParams();
  const tourDetailSelected = useSelectedTourStore(
    (state) => state.tourDetailSelected
  );
  const tourSelected = useSelectedTourStore((state) => state.tourSelected);
  const navigate = useNavigate();

  useEffect(() => {
    const status = searchParams.get("status");
    const bookingId = searchParams.get("bookingId");

    if (status === "success" && bookingId) {
      toast.success("Thanh toán thành công!");
      navigate(
        `/order-booking/${tourSelected?.id}?offer=${tourDetailSelected?.id}&bookingId=${bookingId}&status=success`,
        {
          replace: true,
        }
      );
    } else if (status === "fail" && bookingId) {
      toast.error("Thanh toán thất bại!");
      navigate("/payment/payment-failed", { replace: true });
    } else {
      toast.error("Có lỗi xảy ra trong quá trình xử lý.");
      navigate("/", { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-blue-600 animate-pulse">
          Đang xử lý kết quả thanh toán...
        </h2>
        <p className="text-gray-500">Vui lòng không tắt trình duyệt.</p>
      </div>
    </div>
  );
}
