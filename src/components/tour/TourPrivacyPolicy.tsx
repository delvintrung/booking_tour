import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TourPrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card className="shadow-lg rounded-2xl p-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Chính Sách Bảo Mật & Điều Khoản Sử Dụng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Giới thiệu</h2>
            <p>
              Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của
              quý khách khi sử dụng dịch vụ đặt tour du lịch trên website. Tài
              liệu này trình bày chi tiết cách chúng tôi thu thập, sử dụng và
              bảo mật dữ liệu.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Thông tin chúng tôi thu thập
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Thông tin cá nhân: họ tên, số điện thoại, email.</li>
              <li>
                Thông tin thanh toán: phương thức, hóa đơn (không lưu thẻ).
              </li>
              <li>Thông tin chuyến đi: lịch trình, số người tham gia.</li>
              <li>Cookies và dữ liệu sử dụng website.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Mục đích sử dụng thông tin
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Hỗ trợ đặt tour và chăm sóc khách hàng.</li>
              <li>Gửi thông báo xác nhận, hóa đơn và thông tin liên quan.</li>
              <li>Nâng cao trải nghiệm người dùng và tối ưu dịch vụ.</li>
              <li>Tuân thủ quy định pháp luật.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Bảo mật thông tin</h2>
            <p>
              Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo
              vệ dữ liệu người dùng khỏi truy cập trái phép, mất mát hoặc rủi ro
              khác. Thông tin thanh toán được xử lý bởi đối tác trung gian đạt
              chuẩn quốc tế nhằm đảm bảo an toàn tuyệt đối.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">
              5. Quyền của người dùng
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Xem và cập nhật thông tin cá nhân.</li>
              <li>Yêu cầu xóa hoặc hạn chế xử lý dữ liệu.</li>
              <li>
                Rút lại sự đồng ý trong các trường hợp được pháp luật quy định.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Chia sẻ thông tin</h2>
            <p>
              Chúng tôi không chia sẻ thông tin cá nhân cho bên thứ ba ngoại trừ
              các đối tác liên quan trực tiếp đến dịch vụ du lịch như khách sạn,
              nhà vận chuyển hoặc theo yêu cầu của pháp luật.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Thay đổi chính sách
            </h2>
            <p>
              Chính sách có thể được cập nhật theo thời gian. Mọi thay đổi sẽ
              được thông báo trên trang này và áp dụng ngay khi đăng tải.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Liên hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào liên quan đến chính sách bảo mật
              hoặc thông tin cá nhân, vui lòng liên hệ qua email:
              support@tour.vn hoặc số điện thoại: 0123 456 789.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default TourPrivacyPolicy;
