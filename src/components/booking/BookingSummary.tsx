const BookingSummary = () => {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <img src="/tour-thumbnail.jpg" alt="Tour" className="rounded-lg mb-4" />
      <h3 className="font-semibold text-lg">
        Buôn Ma Thuột - Bảo Tàng Thế Giới Cà Phê - Pleiku - Măng Đen
      </h3>
      <div className="mt-4 text-sm space-y-1">
        <p>📍 Nơi khởi hành: TP. Hồ Chí Minh</p>
        <p>🚌 Thời gian: 10 ngày 9 đêm</p>
      </div>
      <div className="mt-4 border-t pt-4">
        <p className="flex justify-between text-sm">
          <span>Người lớn x 1</span>
          <span>5.390.000 ₫</span>
        </p>
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
  );
};

export default BookingSummary;
