import { useState, useEffect } from "react";
import InformationForm from "@/components/booking/InformationForm";
import StepPayment from "@/components/booking/StepPayment";
import StepComplete from "@/components/booking/StepComplete";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelectedTourStore } from "@/stores/selectedTourStore";
import { useBookingInfoStore } from "@/stores/informationBooking";

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const closeBooking = () => {
    useSelectedTourStore.getState().clearTour();
    useSelectedTourStore.getState().clearTourDetail();
    useBookingInfoStore.getState().clearBookingInfo();
    navigate(-1);
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status");
    const bookingId = query.get("bookingId");
    const offerId = query.get("offer");

    if (status === "success" && bookingId && offerId) {
      setBookingId(bookingId);
      setStep(3);
    } else if (status === "fail") {
      navigate("/payment/payment-failed", { replace: true });
    }
  }, [location.search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Button
        variant="outline"
        className="text-sm text-gray-600 hover:text-primary mb-4"
        onClick={closeBooking}
      >
        ← Quay lại
      </Button>

      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        ĐẶT TOUR
      </h1>

      <div className="flex justify-center items-center gap-16 mb-10">
        {["NHẬP THÔNG TIN", "THANH TOÁN", "HOÀN TẤT"].map((label, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                step === index + 1
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <span className="text-lg font-semibold text-blue-700">
                {index + 1}
              </span>
            </div>
            <p
              className={`text-sm mt-2 ${
                step === index + 1
                  ? "text-blue-700 font-medium"
                  : "text-gray-500"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
      {step === 1 && <InformationForm nextStep={nextStep} />}
      {step === 2 && <StepPayment nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <StepComplete bookingId={bookingId!} />}
    </div>
  );
};

export default BookingPage;
