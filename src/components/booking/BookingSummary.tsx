import { changeToVND } from "@/lib/utils";
import { useBookingInfoStore } from "@/stores/informationBooking";
import { useSelectedTourStore } from "@/stores/selectedTourStore";

const BookingSummary = () => {
  const { tourSelected, tourDetailSelected } = useSelectedTourStore.getState();
  const { bookingInfo } = useBookingInfoStore.getState();
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <img
        src={tourSelected?.imageUrl}
        alt="Tour"
        className="rounded-lg mb-4"
      />
      <h3 className="font-semibold text-lg">{tourSelected?.title}</h3>
      <div className="mt-4 text-sm space-y-1">
        <p>📍 Nơi khởi hành: {tourDetailSelected?.startLocation}</p>
        <p>🚌 Thời gian: {tourSelected?.duration}</p>
      </div>
      {bookingInfo.passengers && (
        <div>
          <div className="mt-4 border-t pt-4">
            {bookingInfo.passengers.adults > 1 && (
              <p className="flex justify-between text-sm">
                <span>Người lớn x {bookingInfo.passengers.adults} </span>
                <span>
                  {changeToVND(
                    bookingInfo.passengers.adults *
                      (tourDetailSelected?.tourPrices?.[0]?.price ?? 0)
                  )}
                </span>
              </p>
            )}

            <p className="flex justify-between text-sm">
              <span>Phụ thu phòng đơn</span>
              <span>1.800.000 ₫</span>
            </p>
          </div>
          <div className="mt-4 border-t pt-4 flex justify-between font-semibold text-red-600">
            <span>Tổng tiền</span>
            <span>7.190.000 ₫</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
