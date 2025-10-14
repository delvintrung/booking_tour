import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "/hello.jpg",
    title: "BẠN ĐANG MUỐN ĐI ĐÂU?",
    subtitle: "Hãy để BookingTour tư vấn cho bạn chuyến đi tuyệt vời nhất!",
  },
  {
    image: "/hoaanhdao.jpg",
    title: "KHÁM PHÁ NHẬT BẢN MÙA HOA ANH ĐÀO",
    subtitle:
      "Trải nghiệm văn hoá và cảnh sắc tuyệt đẹp của xứ sở mặt trời mọc.",
  },
  {
    image: "/nuirungvietnam.jpg",
    title: "VIỆT NAM - ĐIỂM ĐẾN HẤP DẪN",
    subtitle: "Từ biển xanh đến núi rừng, hành trình nào cũng đáng nhớ.",
  },
];

export default function Hero() {
  const navigate = useNavigate();

  const handleChangePage = () => {
    navigate("/tours");
  };
  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div
                className="relative w-full h-[100vh] bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <Button
                    className="bg-[#F35C4C] hover:bg-[#e14c3e] text-white px-8 py-6 text-lg font-semibold"
                    onClick={handleChangePage}
                  >
                    XEM TIẾP
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-6 bg-black/50 hover:bg-black/70 text-white" />
        <CarouselNext className="right-6 bg-black/50 hover:bg-black/70 text-white" />
      </Carousel>
    </section>
  );
}
