import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Dữ liệu logo mẫu, bạn hãy thay thế bằng logo của mình
// Có thể là component SVG hoặc thẻ img
const partnerLogos = [
  { name: "Mountain", src: "/logo/logo1.png" },
  {
    name: "Nature Magazine",
    src: "/logo/logo2.png",
  },
  {
    name: "Outdoor Adventures",
    src: "/logo/logo3.png",
  },
  { name: "Travel", src: "/logo/logo4.png" },
  {
    name: "Outdoor Gear",
    src: "/logo/logo5.png",
  },
];

export function CtaSection() {
  const backgroundImageUrl = "/vinh-ha-long.jpg";

  return (
    <section className="relative w-full py-6 text-white">
      <img
        src={backgroundImageUrl}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-slate-800/60 z-10"></div>

      <div className="relative z-20 container mx-auto pt-20 pb-4">
        <div className="bg-cyan-600 w-[800px] h-40 mb-16 absolute top-[-80px] left-[50%] translate-x-[-50%] flex items-center justify-center shadow-lg rounded-lg">
          <div className="flex justify-around items-center flex-wrap gap-6 h-40">
            {partnerLogos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                className="h-15 brightness-0 invert opacity-80 "
              />
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <p className="font-semibold text-cyan-300">
            — CƠ HỘI GIẢM GIÁ TỚI 50%!
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
            Hãy đăng ký để nhận ưu đãi bí mật từ BookingTour nhé!!
          </h2>

          <form className="mt-8 max-w-lg mx-auto flex items-center">
            <Input
              type="email"
              placeholder="Điền số điện thoại hoặc email của bạn..."
              className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-gray-300 rounded-r-none h-12 text-base focus:ring-cyan-500"
            />
            <Button
              type="submit"
              className="bg-[#F35C4C] hover:bg-[#e14c3e] rounded-l-none h-12 text-base font-bold px-6"
            >
              ĐĂNG KÝ NGAY!
            </Button>
          </form>

          <p className="mt-4 text-xs text-gray-300">
            BookingTour luôn luôn có chương trình ưu đãi ĐẶC BIỆT cho các bạn là
            thành viên của Booking Tour.
          </p>
        </div>
      </div>
    </section>
  );
}
