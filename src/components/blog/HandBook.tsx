import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const HandBook = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Cẩm nang du lịch Tân Cương: Khám phá vùng đất huyền bí",
      description:
        "Khám phá thiên nhiên hùng vĩ, hồ Sayram thơ mộng, và con người thân thiện ở vùng đất Tân Cương – điểm đến đang được nhiều du khách yêu thích.",
      imageUrl: "/blog-tan-cuong.jpg",
      date: "15/10/2025",
      author: "BookingTour",
      tags: ["Tân Cương", "Kinh nghiệm du lịch", "Trung Quốc"],
    },
    {
      id: 2,
      title: "Những món ăn đặc sắc không thể bỏ lỡ khi đến Hà Nội",
      description:
        "Cùng khám phá ẩm thực Hà Nội – từ phở bò truyền thống đến bún chả, bánh cuốn... hương vị khiến du khách nhớ mãi không quên.",
      imageUrl: "/blog-ha-noi.jpg",
      date: "12/10/2025",
      author: "Travel Team",
      tags: ["Ẩm thực", "Hà Nội", "Trải nghiệm"],
    },
    {
      id: 3,
      title: "5 mẹo du lịch tiết kiệm mà vẫn trọn vẹn trải nghiệm",
      description:
        "Từ việc đặt vé máy bay, chọn khách sạn, đến sắp xếp lịch trình — những bí quyết nhỏ giúp bạn tiết kiệm mà vẫn tận hưởng trọn vẹn chuyến đi.",
      imageUrl: "/blog-tiet-kiem.jpg",
      date: "05/10/2025",
      author: "Trung Delvin",
      tags: ["Mẹo du lịch", "Kinh nghiệm", "Budget"],
    },
  ];
  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        🧭 Cẩm Nang Du Lịch
      </h1>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        Tổng hợp những bài viết, kinh nghiệm, và chia sẻ thực tế giúp bạn có
        chuyến đi trọn vẹn và đáng nhớ nhất!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/80 text-xs px-2 py-1 rounded shadow">
                {post.date}
              </div>
            </div>

            <CardHeader className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors">
                {post.title}
              </h2>
            </CardHeader>

            <CardContent className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
              {post.description}
            </CardContent>

            <CardFooter className="flex flex-col items-start px-4 pb-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} className="bg-orange-100 text-orange-600">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between items-center w-full">
                <p className="text-xs text-gray-500 italic">✍️ {post.author}</p>
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-md"
                >
                  Đọc thêm
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HandBook;
