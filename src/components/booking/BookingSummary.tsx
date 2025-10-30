import { useEffect, useState } from "react";
import { changeToVND } from "@/lib/utils";
import { useBookingInfoStore } from "@/stores/informationBooking";
import { useSelectedTourStore } from "@/stores/selectedTourStore";

const BookingSummary = () => {
  const { tourSelected, tourDetailSelected } = useSelectedTourStore.getState();
  const { bookingInfo } = useBookingInfoStore.getState();
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const adults = bookingInfo?.passengers?.adults ?? 0;
    const children = bookingInfo?.passengers?.children ?? 0;
    const priceAdult = tourDetailSelected?.tourPrices?.[0]?.price ?? 0;
    const priceChild =
      ((tourDetailSelected?.tourPrices?.length ?? 0) > 1
        ? tourDetailSelected?.tourPrices?.[1]?.price
        : tourDetailSelected?.tourPrices?.[0]?.price) ?? priceAdult;

    setTotalAmount(adults * priceAdult + children * priceChild + 1800000);
  }, [bookingInfo, tourDetailSelected]);

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
      {bookingInfo?.passengers && (
        <div>
          <div className="mt-4 border-t pt-4">
            {(bookingInfo?.passengers?.adults ?? 0) > 1 && (
              <p className="flex justify-between text-sm">
                <span>Người lớn x {bookingInfo?.passengers?.adults ?? 0} </span>
                <span>
                  {changeToVND(
                    (bookingInfo?.passengers?.adults ?? 0) *
                      (tourDetailSelected?.tourPrices?.[0]?.price ?? 0)
                  )}
                </span>
              </p>
            )}

            {(bookingInfo?.passengers?.children ?? 0) >= 1 && (
              <p className="flex justify-between text-sm">
                <span>Trẻ nhỏ x {bookingInfo?.passengers?.children ?? 0} </span>
                <span>
                  {changeToVND(
                    (bookingInfo?.passengers?.children ?? 0) *
                      (((tourDetailSelected?.tourPrices?.length ?? 0) > 1
                        ? tourDetailSelected?.tourPrices?.[1]?.price ?? 0
                        : tourDetailSelected?.tourPrices?.[0]?.price ?? 0) ?? 0)
                  )}
                </span>
              </p>
            )}

            <p className="flex justify-between text-sm">
              <span>Phụ thu phòng đơn</span>
              <span>1.800.000 VND</span>
            </p>
          </div>
          <div className="mt-4 border-t pt-4 flex justify-between font-semibold text-red-600">
            <span>Tổng tiền</span>
            <span>{changeToVND(totalAmount)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
