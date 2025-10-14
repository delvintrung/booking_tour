import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white">
      <div className="max-w-[1280px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* ABOUT */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-l-4 border-blue-500 pl-2">
            ABOUT BOOKINGTOUR.VN
          </h3>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Địa chỉ: Tòa nhà Tuấn Hạnh, Số 82, Ngõ 116, Phố Nhân Hòa, Phường
            Nhân Chính, Quận Thanh Xuân, Hà Nội, Việt Nam.
          </p>
          <div className="flex gap-4 mt-4">
            <img src="/travvy-award.png" alt="Travvy Award" className="h-10" />
            <img
              src="/nature-magazine.png"
              alt="Nature Magazine"
              className="h-10"
            />
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-l-4 border-blue-500 pl-2">
            CONTACT INFORMATION
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-2">
              <Phone className="text-red-400" size={16} /> 0888822368
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-red-400" size={16} /> bookingtour@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="text-red-400" size={16} /> Số 25 Ngõ Thái Hà,
              Hà Nội
            </li>
          </ul>
        </div>

        {/* LATEST POST */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-l-4 border-blue-500 pl-2">
            LATEST POST
          </h3>
          <div className="mb-4">
            <p className="hover:text-orange-400 cursor-pointer">
              5 điểm đến mùa thu đẹp như tranh vẽ không thể bỏ qua ở Việt Nam
            </p>
            <p className="text-gray-400 text-xs mt-1">August 17, 2024</p>
          </div>
          <div className="border-t border-gray-600 my-2"></div>
          <div>
            <p className="hover:text-orange-400 cursor-pointer">
              7 lễ hội độc đáo mà bạn không nên bỏ lỡ khi đi du lịch Nhật Bản
            </p>
            <p className="text-gray-400 text-xs mt-1">August 19, 2024</p>
          </div>
        </div>

        {/* SUBSCRIBE */}
        <div>
          <h3 className="text-lg font-semibold mb-3 border-l-4 border-blue-500 pl-2">
            SUBSCRIBE US
          </h3>
          <p className="text-gray-300 mb-4">
            Để lại email để BOOKINGTOUR gửi bạn thông tin TOUR sớm nhất!
          </p>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Your Email.."
              className="bg-white text-black border-none focus-visible:ring-0"
            />
            <Button className="bg-[#F35C4C] hover:bg-[#e14c3e] text-white font-semibold rounded-none">
              SUBSCRIBE NOW
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#252525] text-gray-300 py-4 text-center text-sm">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="space-x-3 mb-2 md:mb-0">
            <a href="#" className="hover:text-orange-400">
              CÁC ĐIỀU KIỆN & ĐIỀU KHOẢN
            </a>{" "}
            |
            <a href="#" className="hover:text-orange-400">
              Chính sách bảo mật
            </a>{" "}
            |
            <a href="#" className="hover:text-orange-400">
              Giới thiệu BookingTour
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-lg font-bold">
              Booking<span className="text-orange-400">Tour</span>
            </span>
            <p className="text-gray-400 text-xs md:text-sm">
              © 2024 BookingTour. All rights Bookingtour.vn
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
