import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/stores/userStore";
import { ChevronDown } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

const Header = ({ isTop }: { isTop?: boolean }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleChangePage = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <header
      className={`border-b bg-white ${
        isTop
          ? "bg-transparent text-white sticky top-0 z-50"
          : "bg-white text-gray-900 shadow-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-20">
        <Link to="/">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-orange-500">Booking</span>
            <span className="text-2xl font-bold text-[#0B163F]">Tour</span>
          </div>
        </Link>

        <nav className="flex items-center gap-6 text-[#0B163F] font-semibold">
          <NavLink to="/" className="hover:text-orange-500 transition">
            HOME
          </NavLink>
          <NavLink to="/tours" className="hover:text-orange-500 transition">
            TOUR
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-orange-500 transition">
              TOUR TRUNG QUỐC <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  to="/tours/beijing"
                  className="hover:text-orange-500 transition"
                >
                  Tour Bắc Kinh
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/tours/shanghai"
                  className="hover:text-orange-500 transition"
                >
                  Tour Thượng Hải
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/tours/zhangjiajie"
                  className="hover:text-orange-500 transition"
                >
                  Tour Trương Gia Giới
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink
            to="/destinations"
            className="hover:text-orange-500 transition"
          >
            ĐIỂM ĐẾN
          </NavLink>
          <NavLink to="/visa" className="hover:text-orange-500 transition">
            VISA
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-orange-500 transition">
              BLOG <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/blog/tour/handbook">Cẩm nang du lịch</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/blog/tour/experience">Kinh nghiệm đặt tour</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            className="bg-[#F35C4C] hover:bg-[#e14c3e] text-white font-semibold px-6 py-2 rounded-none"
            onClick={() => handleChangePage("tours")}
          >
            ĐẶT TOUR
          </Button>
          {user == null ? (
            <Button
              className="bg-[#F35C4C] hover:bg-[#e14c3e] text-white font-semibold px-6 py-2 rounded-none"
              onClick={() => handleChangePage("sign-in")}
            >
              SIGN IN
            </Button>
          ) : (
            <Link to="/user/profile">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
