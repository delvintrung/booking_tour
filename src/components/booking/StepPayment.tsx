import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import BookingSummary from "./BookingSummary";
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useBookingInfoStore } from "@/stores/informationBooking";
import { toast } from "sonner";
import type { BookingDetail } from "@/types";
import { AxiosClient } from "@/lib/utils";
import { useUserStore } from "@/stores/userStore";
import { useSelectedTourStore } from "@/stores/selectedTourStore";
import { Link } from "react-router-dom";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

interface BookingPayload {
  userId: number;
  status?: string;
  contactFullname: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  orderCode: string;
  note: string;
  bookingDetails: BookingDetail[];
}

const StepPayment: React.FC<Props> = ({ nextStep, prevStep }) => {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "vnpay">("cash");
  const [createOrderPayload, setCreateOrderPayload] = useState({
    userId: 0,
    amount: 0,
  });
  const [isOpenCashModal, setIsOpenCashModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCashPayment, setIsCashPayment] = useState<boolean>(false);
  const { user } = useUserStore();
  const { bookingInfo } = useBookingInfoStore((state) => state);
  const { tourDetailSelected } = useSelectedTourStore((state) => state);
  const [isCheckPrivacy, setIsCheckPrivacy] = useState(false);

  const payload: BookingDetail[] = [];
  if (tourDetailSelected?.tourPrices?.length! < 2 && bookingInfo.passengers) {
    const adults = bookingInfo.passengers.adults ?? 0;
    const children = bookingInfo.passengers.children ?? 0;
    payload.push({
      tourDetailId: tourDetailSelected?.id!,
      tourPriceId: tourDetailSelected?.tourPrices?.[0].id!,
      quantity: adults + children,
      price:
        (tourDetailSelected?.tourPrices?.[0].price ?? 0) * (adults + children),
      status: true,
    });
  } else {
    tourDetailSelected?.tourPrices?.forEach((price, index) => {
      const adults = bookingInfo?.passengers?.adults ?? 0;
      const children = bookingInfo?.passengers?.children ?? 0;
      const qty = index === 0 ? adults : children;
      const item: BookingDetail = {
        tourDetailId: tourDetailSelected?.id!,
        tourPriceId: price.id,
        quantity: qty,
        price: price.price * qty,
        status: true,
      };
      payload.push(item);
    });
  }

  const handlePayment = async () => {
    if (!isCheckPrivacy) {
      toast.error(
        "Vui lòng đồng ý với Chính sách bảo mật và Điều khoản dịch vụ!"
      );
      return;
    }
    try {
      setIsLoading(true);

      if (paymentMethod === "cash") {
        setIsOpenCashModal(true);
        setCreateOrderPayload({
          userId: user?.id || 0,
          amount:
            payload.reduce((total, detail) => total + detail.price, 0) +
            1800000,
        });
        const responseBooking = await AxiosClient.post(
          "/booking/create",
          createOrderPayload
        );
        toast.success("Tạo đơn hàng thành công!");

        // if (isCashPayment) {
        //   const responsePayment = await AxiosClient.post(
        //     "/payment/create/cash",
        //     {
        //       id_booking: responseBooking?.data.data.id,
        //     }
        //   );

        //   if (responsePayment.status === 200) {
        //     toast.success("Thanh toán tiền mặt thành công!");
        //     nextStep();
        //   }
        // }
      } else {
        try {
          if (
            !bookingInfo.contactInfo?.fullName ||
            !bookingInfo.contactInfo?.email
          ) {
            toast.error("Lỗi: Thiếu thông tin liên hệ. Vui lòng quay lại.");
            setIsLoading(false);
            return;
          }

          const bookingPayload: BookingPayload = {
            userId: user?.id || 0,
            status: "PENDING",
            contactFullname: bookingInfo.contactInfo?.fullName || "",
            contactEmail: bookingInfo.contactInfo?.email || "",
            contactPhone: bookingInfo.contactInfo?.phone || "",
            orderCode: "",
            contactAddress: bookingInfo.contactInfo?.address || "",
            note: "Ghi chú",
            bookingDetails: payload,
          };

          try {
            const responseBooking = await AxiosClient.post(
              "/booking/create",
              bookingPayload
            );

            if (responseBooking.status === 200) {
              const responsePayment = await AxiosClient.post(
                "/payment/create",
                createOrderPayload
              );
              if (responsePayment.status === 200) {
                const paymentUrl = responsePayment.data.data.paymentUrl;
                window.location.href = paymentUrl;
              }
            }
          } catch (error) {
            toast.error("Đã xảy ra lỗi khi tạo đơn hàng sau thanh toán.");
          }
        } catch (error) {
          toast.error("Tạo đơn hàng thất bại. Vui lòng thử lại.");
          return;
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePayment = () => {
    useBookingInfoStore.getState().clearBookingInfo();
    toast("Đã hoàn tác hoạt động");
    prevStep();
  };

  useEffect(() => {
    setCreateOrderPayload({
      userId: user?.id || 0,
      amount:
        payload.reduce((total, detail) => total + detail.price, 0) + 1800000,
    });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4 text-blue-800">
            PHƯƠNG THỨC THANH TOÁN
          </h2>
          <p className="text-gray-600 mb-6">
            Vui lòng chọn phương thức thanh toán phù hợp để hoàn tất đặt tour.
          </p>

          <RadioGroup
            defaultValue="cash"
            onValueChange={(value: string) =>
              setPaymentMethod(value as "cash" | "vnpay")
            }
            className="space-y-4"
          >
            <div className="flex items-center border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition">
              <RadioGroupItem value="cash" id="cash" />
              <Label
                htmlFor="cash"
                className="ml-4 flex items-center gap-3 cursor-pointer"
              >
                <img
                  src="/logo/payment/cash.jpg"
                  alt="Cash"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    Thanh toán bằng tiền mặt
                  </p>
                  <p className="text-sm text-gray-500">
                    Thanh toán trực tiếp bằng tiền mặt tại quầy thu ngân.
                  </p>
                </div>
              </Label>
            </div>

            <AlertDialog
              open={isOpenCashModal}
              onOpenChange={setIsOpenCashModal}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Xác nhận thanh toán bằng tiền mặt?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Đã hoành thành thanh toán với tiền mặt, hãy xác nhận
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Chưa</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setIsOpenCashModal(false);
                      setIsCashPayment(true);
                    }}
                  >
                    Tiếp tục
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex items-center border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition">
              <RadioGroupItem value="vnpay" id="vnpay" />
              <Label
                htmlFor="vnpay"
                className="ml-4 flex items-center gap-3 cursor-pointer"
              >
                <img
                  src="/logo/payment/vnpay.png"
                  alt="VNPAY"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    Thanh toán qua VNPAY
                  </p>
                  <p className="text-sm text-gray-500">
                    Hỗ trợ thẻ ngân hàng nội địa và quốc tế.
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </section>

        <section className="mt-6 border rounded-lg p-5 bg-blue-50 text-blue-900">
          {paymentMethod === "cash" ? (
            <>
              <h3 className="font-semibold mb-2 text-lg">
                Thanh toán bằng Tiền mặt
              </h3>
              <p>1️⃣ Mở ứng dụng Momo trên điện thoại.</p>
              <p>2️⃣ Quét mã QR hoặc nhập số điện thoại được cung cấp.</p>
              <p>3️⃣ Kiểm tra và xác nhận giao dịch.</p>
            </>
          ) : (
            <>
              <h3 className="font-semibold mb-2 text-lg">
                Thanh toán bằng VNPAY
              </h3>
              <p>1️⃣ Chọn ngân hàng hoặc ví VNPAY hỗ trợ.</p>
              <p>2️⃣ Nhập thông tin giao dịch và xác nhận thanh toán.</p>
              <p>
                3️⃣ Đơn hàng sẽ được xác nhận sau khi hệ thống phản hồi thành
                công.
              </p>
            </>
          )}
        </section>

        <section className="mt-6 p-4 border rounded-lg bg-gray-50 text-gray-500">
          <p className="text-red-400">Chính sách của chúng tôi:</p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>Hoàn tiền đầy đủ nếu hủy trước 7 ngày khởi hành.</li>
            <li>Hoàn tiền 50% nếu hủy trong vòng 3-7 ngày khởi hành.</li>
            <li>Không hoàn tiền nếu hủy trong vòng 3 ngày khởi hành.</li>
          </ul>
        </section>

        <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
          <Checkbox
            id="toggle-2"
            checked={isCheckPrivacy}
            onCheckedChange={(checked) => setIsCheckPrivacy(Boolean(checked))}
            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          />
          <div className="flex gap-1.5 font-normal">
            <p className="text-sm leading-none font-medium">
              Đồng ý với Chính sách bảo mật và Điều khoản dịch vụ.{" "}
            </p>
            <Link to={"/tours/privacy-policy"} className="text-blue-500">
              Tham khảo ở đây
            </Link>
          </div>
        </Label>

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handleClosePayment}
            className="text-gray-700 border-gray-300"
          >
            ← Quay lại
          </Button>
          <Button
            onClick={handlePayment}
            className="bg-red-600 hover:bg-red-700"
          >
            Xác nhận thanh toán
          </Button>
        </div>
      </div>

      <div>
        <BookingSummary />
      </div>
    </div>
  );
};

export default StepPayment;
