import { useThemeStore } from "@/stores/themeStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Header = () => {
  // const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const handleChangePage = () => {
    navigate("/booking");
  };
  return (
    <header className="border-b bg-white sticky top-0 z-50">
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

          <NavLink to="/locations" className="hover:text-orange-500 transition">
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
              <DropdownMenuItem>Cẩm nang du lịch</DropdownMenuItem>
              <DropdownMenuItem>Kinh nghiệm đặt tour</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <Button
          className="bg-[#F35C4C] hover:bg-[#e14c3e] text-white font-semibold px-6 py-2 rounded-none"
          onClick={handleChangePage}
        >
          ĐẶT TOUR
        </Button>
      </div>
    </header>
  );
};

export default Header;
