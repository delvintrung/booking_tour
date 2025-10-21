import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook } from "lucide-react";
import GoogleIcon from "@/assets/googleIcon.svg";

export default function SignIn() {
  const handleGoogleLogin = () => {
    alert("Đăng nhập bằng Google!");
  };

  const handleFacebookLogin = () => {
    alert("Đăng nhập bằng Facebook!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đăng nhập thành công (demo)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Đăng Nhập
          </CardTitle>
          <p className="text-gray-500 text-sm mt-2">
            Chào mừng quay lại BookingTour
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F35C4C] hover:bg-[#e14c3e] text-white font-semibold py-5 text-lg"
            >
              Đăng nhập
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
              Đăng nhập với Google
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
            Chưa có tài khoản?{" "}
            <a
              href="/sign-up"
              className="text-[#F35C4C] hover:underline font-medium"
            >
              Đăng ký ngay
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
