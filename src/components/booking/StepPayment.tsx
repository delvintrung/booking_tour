import { Button } from "@/components/ui/button";
import BookingSummary from "./BookingSummary";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

const StepPayment: React.FC<Props> = ({ nextStep, prevStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("momo");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT: Payment Form */}
      <div className="lg:col-span-2 space-y-8">
        {/* Thanh toán tiêu đề */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-blue-800">
            PHƯƠNG THỨC THANH TOÁN
          </h2>
          <p className="text-gray-600 mb-6">
            Vui lòng chọn phương thức thanh toán phù hợp để hoàn tất đặt tour.
          </p>

          {/* Radio chọn phương thức */}
          <RadioGroup
            defaultValue="momo"
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            {/* Momo */}
            <div className="flex items-center border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition">
              <RadioGroupItem value="momo" id="momo" />
              <Label
                htmlFor="momo"
                className="ml-4 flex items-center gap-3 cursor-pointer"
              >
                <img
                  src="/momo-logo.png"
                  alt="Momo"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    Thanh toán qua Momo
                  </p>
                  <p className="text-sm text-gray-500">
                    Sử dụng ứng dụng Momo để quét mã hoặc xác nhận thanh toán.
                  </p>
                </div>
              </Label>
            </div>

            {/* VNPAY */}
            <div className="flex items-center border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition">
              <RadioGroupItem value="vnpay" id="vnpay" />
              <Label
                htmlFor="vnpay"
                className="ml-4 flex items-center gap-3 cursor-pointer"
              >
                <img
                  src="/vnpay-logo.png"
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

        {/* Hiển thị thông tin hướng dẫn */}
        <section className="mt-6 border rounded-lg p-5 bg-blue-50 text-blue-900">
          {paymentMethod === "momo" ? (
            <>
              <h3 className="font-semibold mb-2 text-lg">
                Thanh toán bằng Momo
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

        {/* Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            className="text-gray-700 border-gray-300"
          >
            ← Quay lại
          </Button>
          <Button onClick={nextStep} className="bg-red-600 hover:bg-red-700">
            Xác nhận thanh toán
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

export default StepPayment;
