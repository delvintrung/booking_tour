import { Separator } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TravelTips() {
  return (
    <section className="max-w-5xl mx-auto py-12 px-5 text-gray-800 leading-relaxed">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-gray-800">
          ✈️ Kinh Nghiệm Du Lịch Cho Người Mới
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Tổng hợp những mẹo nhỏ nhưng cực kỳ hữu ích giúp bạn có chuyến đi suôn
          sẻ, tiết kiệm và đầy trải nghiệm thú vị!
        </p>
      </header>

      <div className="w-full rounded-2xl overflow-hidden shadow-md mb-10">
        <img
          src="/travel-tips-cover.jpg"
          alt="Travel tips"
          className="w-full h-[400px] object-cover"
        />
      </div>

      <article className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-600">
            1. Chuẩn bị kỹ càng trước khi đi
          </h2>
          <p>
            Trước mỗi chuyến đi, hãy dành thời gian tìm hiểu kỹ điểm đến: khí
            hậu, văn hoá, món ăn, và đặc biệt là các quy định về hành lý hoặc
            visa. Việc chuẩn bị chu đáo sẽ giúp bạn tránh được nhiều rắc rối
            không đáng có.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-600">
            2. Săn vé máy bay và khách sạn giá tốt
          </h2>
          <p>
            Hãy lên kế hoạch sớm và theo dõi các chương trình khuyến mãi từ các
            hãng hàng không hoặc nền tảng đặt phòng uy tín. Sử dụng công cụ so
            sánh giá như{" "}
            <span className="font-medium text-orange-500">Skyscanner</span> hoặc{" "}
            <span className="font-medium text-orange-500">Agoda</span> để tối ưu
            chi phí.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-600">
            3. Mang theo những vật dụng thiết yếu
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Giấy tờ tùy thân (CMND/CCCD, hộ chiếu)</li>
            <li>Tiền mặt & thẻ thanh toán quốc tế</li>
            <li>Thuốc cơ bản và đồ y tế cá nhân</li>
            <li>Ổ cắm chuyển đổi và sạc dự phòng</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-600">
            4. Ăn uống và trải nghiệm địa phương
          </h2>
          <p>
            Đừng ngại thử những món ăn đường phố! Chính những quán nhỏ ven đường
            lại mang đến trải nghiệm ẩm thực bản địa chân thật nhất. Tuy nhiên,
            hãy chọn nơi đông người và đảm bảo vệ sinh nhé.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-600">
            5. Lưu giữ khoảnh khắc và bảo vệ môi trường
          </h2>
          <p>
            Du lịch không chỉ là đi, mà còn là cảm nhận. Hãy ghi lại những
            khoảnh khắc đáng nhớ, nhưng đừng quên giữ gìn môi trường, không xả
            rác, không phá hoại cảnh quan.
          </p>
        </section>

        <Separator className="my-10" />

        <h3 className="text-2xl font-semibold mb-5 text-gray-700">
          🌍 Bài viết liên quan
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {relatedTips.map((tip) => (
            <Card
              key={tip.id}
              className="hover:shadow-lg transition-all rounded-2xl overflow-hidden"
            >
              <img
                src={tip.imageUrl}
                alt={tip.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-5 space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition">
                  {tip.title}
                </h4>
                <p className="text-sm text-gray-600">{tip.excerpt}</p>
                <div className="flex justify-between items-center">
                  <Badge className="bg-orange-100 text-orange-600">
                    {tip.tag}
                  </Badge>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Xem thêm
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </article>
    </section>
  );
}

const relatedTips = [
  {
    id: 1,
    title: "Mẹo du lịch tiết kiệm chi phí mà vẫn vui hết mình",
    imageUrl: "/tip1.jpg",
    excerpt:
      "Từ cách chọn thời điểm bay, săn combo, đến các mẹo nhỏ khi đặt phòng – tiết kiệm tới 30% cho chuyến đi của bạn.",
    tag: "Mẹo du lịch",
  },
  {
    id: 2,
    title: "Top 5 ứng dụng hữu ích khi đi du lịch nước ngoài",
    imageUrl: "/tip2.jpg",
    excerpt:
      "Google Maps, XE Currency, và nhiều ứng dụng khác giúp chuyến đi của bạn thuận lợi, an toàn và tiết kiệm thời gian.",
    tag: "Công nghệ",
  },
];
