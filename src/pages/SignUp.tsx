import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook } from "lucide-react";
import GoogleIcon from "@/assets/googleIcon.svg";
import { useState } from "react";
import axios from "axios";
import { BaseAPIURL } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import { toast } from "sonner";

export default function SignUp() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      setIsLoading(true);
      const { confirmPassword, ...data } = form;
      const response = await axios.post(`${BaseAPIURL}/users/create`, data);
      if (response.status === 201) {
        toast.success("Đăng ký thành công!");
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Đăng ký bằng Google!");
  };

  const handleFacebookLogin = () => {
    alert("Đăng ký bằng Facebook!");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Đăng Ký
          </CardTitle>
          <p className="text-gray-500 text-sm mt-2">
            Tạo tài khoản BookingTour của bạn ngay hôm nay
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="fullname"
                type="text"
                placeholder="Nguyễn Văn A"
                value={form.fullname}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F35C4C] hover:bg-[#e14c3e] text-white font-semibold py-5 text-lg"
            >
              Đăng ký
            </Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">hoặc</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-100"
            >
              <img src={GoogleIcon} alt="Google" className="mr-2 w-5 h-5" />
              Google
            </Button>

            <Button
              type="button"
              onClick={handleFacebookLogin}
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-100 text-blue-600"
            >
              <Facebook className="mr-2 text-xl" />
              Facebook
            </Button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Đã có tài khoản?{" "}
            <a
              href="/sign-in"
              className="text-[#F35C4C] hover:underline font-medium"
            >
              Đăng nhập ngay
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
