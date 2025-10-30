import { Button } from "@/components/ui/button";
import BookingSummary from "./BookingSummary";
import { useState } from "react";
import { toast } from "sonner";
import { useBookingInfoStore } from "@/stores/informationBooking";

interface Props {
  nextStep: () => void;
}

const InformationForm: React.FC<Props> = ({ nextStep }) => {
  const [informationForm, setInformationForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [passengerInfo, setPassengerInfo] = useState({
    adults: 1,
    children: 1,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(0[3|5|7|8|9])([0-9]{8})$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInformationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassengerChange = (
    type: keyof typeof passengerInfo,
    delta: number
  ) => {
    setPassengerInfo((prev) => {
      const newValue = Math.max(0, prev[type] + delta);
      return { ...prev, [type]: newValue };
    });
  };

  const handleSubmit = () => {
    const isInfoIncomplete = Object.values(informationForm).some(
      (value) => typeof value === "string" && value.trim() === ""
    );
    if (isInfoIncomplete) {
      toast.error("Vui lòng điền đầy đủ thông tin liên hệ!");
      return;
    }
    if (!emailRegex.test(informationForm.email)) {
      toast.error("Định dạng email không hợp lệ!");
      return;
    }
    if (!phoneRegex.test(informationForm.phone)) {
      toast.error(
        "Số điện thoại không hợp lệ! (Phải là 10 số, bắt đầu bằng 03, 05, 07, 08, 09)"
      );
      return;
    }
    if (passengerInfo.adults < 1) {
      toast.error("Tour bắt buộc phải có ít nhất 1 người lớn!");
      return;
    }
    const totalPassengers = passengerInfo.adults + passengerInfo.children;

    if (totalPassengers === 0) {
      toast.error("Vui lòng chọn số lượng hành khách!");
      return;
    }

    const infoAccept = {
      contactInfo: informationForm,
      passengers: passengerInfo,
    };

    useBookingInfoStore.getState().setBookingInfo(infoAccept);
    toast.success("Đang xử lý đặt tour của bạn...");
    nextStep();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4">THÔNG TIN LIÊN LẠC</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Họ tên *"
              className="input border rounded-lg p-2"
              name="fullName"
              onChange={handleChange}
            />
            <input
              placeholder="Điện thoại *"
              className="input border rounded-lg p-2"
              name="phone"
              onChange={handleChange}
            />
            <input
              placeholder="Email *"
              className="input border rounded-lg p-2"
              name="email"
              onChange={handleChange}
            />
            <input
              placeholder="Địa chỉ"
              className="input border rounded-lg p-2"
              name="address"
              onChange={handleChange}
            />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">HÀNH KHÁCH</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "adults", label: "Người lớn" },
              { key: "children", label: "Trẻ nhỏ" },
            ].map(({ key, label }) => (
              <div
                key={key}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <span>{label}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-6 h-6 border rounded hover:bg-gray-100"
                    onClick={() =>
                      handlePassengerChange(
                        key as keyof typeof passengerInfo,
                        -1
                      )
                    }
                  >
                    -
                  </button>
                  <span>
                    {passengerInfo[key as keyof typeof passengerInfo]}
                  </span>
                  <button
                    type="button"
                    className="w-6 h-6 border rounded hover:bg-gray-100"
                    onClick={() =>
                      handlePassengerChange(
                        key as keyof typeof passengerInfo,
                        1
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ghi chú */}
        <section>
          <h2 className="text-lg font-semibold mb-4">GHI CHÚ</h2>
          <textarea
            placeholder="Quý khách có ghi chú gì, hãy nói với chúng tôi..."
            className="w-full border rounded-lg p-3"
            rows={4}
          />
        </section>

        <Button
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-700 text-white mt-4"
        >
          Nhập thông tin để đặt tour
        </Button>
      </div>

      <div>
        <BookingSummary />
      </div>
    </div>
  );
};

export default InformationForm;
