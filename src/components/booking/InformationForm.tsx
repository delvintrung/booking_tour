import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BookingSummary from "./BookingSummary";
import { toast } from "sonner";
import { useBookingInfoStore } from "@/stores/informationBooking";
import { useSelectedTourStore } from "@/stores/selectedTourStore";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

interface Props {
  nextStep: () => void;
}

const InformationForm: React.FC<Props> = ({ nextStep }) => {
  const tourDetailSelected = useSelectedTourStore(
    (state) => state.tourDetailSelected
  );

  const [informationForm, setInformationForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const disableChildrenIncrese =
    (tourDetailSelected?.tourPrices?.length || 0) < 2;

  const [passengerInfo, setPassengerInfo] = useState({
    adults: 1,
    children: disableChildrenIncrese ? 0 : 0,
  });

  const [remainingSeats, setRemainingSeats] = useState<number>(
    tourDetailSelected?.remainingSeats || 0
  );

  useEffect(() => {
    if (!tourDetailSelected?.id) return;

    setRemainingSeats(tourDetailSelected.remainingSeats);

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.debug = () => {};

    stompClient.connect({}, () => {
      stompClient.subscribe(
        `/topic/tour-seats/${tourDetailSelected.id}`,
        (message) => {
          if (message.body) {
            const newSeats = parseInt(message.body);
            setRemainingSeats(newSeats);
            setPassengerInfo((prev) => {
              const currentTotal = prev.adults + prev.children;
              if (currentTotal > newSeats) {
                toast.warning(
                  "Số lượng chỗ vừa thay đổi, vui lòng chọn lại số lượng khách!"
                );
                return { adults: 1, children: 0 };
              }
              return prev;
            });
          }
        }
      );
    });

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, [tourDetailSelected?.id]);

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
      const currentTotal = prev.adults + prev.children;

      if (delta > 0 && currentTotal >= remainingSeats) {
        toast.warning(`Chỉ còn lại ${remainingSeats} chỗ trống!`);
        return prev;
      }

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

    if (totalPassengers > remainingSeats) {
      toast.error("Xin lỗi, số lượng chỗ không đủ!");
      return;
    }

    if (totalPassengers === 0) {
      toast.error("Vui lòng chọn số lượng hành khách!");
      return;
    }

    const infoAccept = {
      contactInfo: informationForm,
      passengers: passengerInfo,
    };

    useBookingInfoStore.getState().setBookingInfo(infoAccept);
    nextStep();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div
          className={`p-4 rounded-lg border ${
            remainingSeats === 0
              ? "bg-red-50 border-red-200"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Hiện tại</span>
            {remainingSeats > 0 ? (
              <span className="text-blue-600 font-bold text-lg">
                Đang mở bán - Còn {remainingSeats} chỗ
              </span>
            ) : (
              <span className="text-red-600 font-bold text-lg">ĐÃ HẾT CHỖ</span>
            )}
          </div>
        </div>

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
            ].map(({ key, label }) => {
              const isChildrenDisabled =
                key === "children" && disableChildrenIncrese;

              const currentTotal =
                passengerInfo.adults + passengerInfo.children;
              const isFull = currentTotal >= remainingSeats;

              return (
                <div
                  key={key}
                  className={`border rounded-lg p-3 flex justify-between items-center 
                      ${
                        isChildrenDisabled
                          ? "blur-xs cursor-not-allowed bg-gray-100"
                          : ""
                      }
                      `}
                >
                  <span>{label}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="w-6 h-6 border rounded hover:bg-gray-100 flex items-center justify-center"
                      onClick={() =>
                        handlePassengerChange(
                          key as keyof typeof passengerInfo,
                          -1
                        )
                      }
                      disabled={
                        passengerInfo[key as keyof typeof passengerInfo] <= 0
                      }
                    >
                      -
                    </button>
                    <span className="w-4 text-center">
                      {passengerInfo[key as keyof typeof passengerInfo]}
                    </span>
                    <button
                      type="button"
                      className={`w-6 h-6 border rounded flex items-center justify-center
                            ${
                              isFull || isChildrenDisabled
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            }
                        `}
                      onClick={() =>
                        handlePassengerChange(
                          key as keyof typeof passengerInfo,
                          1
                        )
                      }
                      disabled={isFull || isChildrenDisabled}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

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
          className="bg-red-600 hover:bg-red-700 text-white mt-4 w-full py-6 text-lg"
          disabled={remainingSeats === 0}
        >
          {remainingSeats === 0
            ? "ĐÃ HẾT CHỖ"
            : "Xác nhận thông tin và tiếp tục"}
        </Button>
      </div>

      <div>
        <BookingSummary />
      </div>
    </div>
  );
};

export default InformationForm;
