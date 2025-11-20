import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook } from "lucide-react";
import GoogleIcon from "@/assets/googleIcon.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AxiosClient, BaseAPIURL } from "@/lib/utils";
import Loading from "@/components/Loading";
import { useUserStore } from "@/stores/userStore";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { set } from "zod";

export default function SignIn() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSatusFromOAuth = async () => {
    try {
      setIsLoading(true);
      const oauthStatus = params.get("oauth");
      if (oauthStatus === "success") {
        const response = await AxiosClient.get("/login/oauth2/success");
        if (response.status === 200) {
          const token = await response.data.data.accessToken;
          localStorage.setItem("accessToken", token);
          setUser(response.data.data.userLogin);
          toast.success("Đăng nhập bằng OAuth2 thành công!");
          navigate("/");
        } else {
          toast.error(response.data.message || "Đăng nhập thất bại!");
        }
      }
    } catch (error) {
      console.error("Lỗi đăng nhập bằng OAuth2:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSatusFromOAuth();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleGoogleLogin = () => {
    try {
      window.location.href = `http://localhost:8080/oauth2/authorization/google`;
    } catch (e) {
      console.error("Lỗi đăng nhập bằng Google:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (form.username === "" || form.password === "") {
        toast("Thiếu usernam hoặc password");
        return;
      }

      const response = await axios.post(`${BaseAPIURL}/login`, form);
      if (response.status === 200) {
        toast.success("Đăng nhập thành công!");
        const token = await response.data.data.accessToken;
        localStorage.setItem("accessToken", token);
        setUser(response.data.data.userLogin);
        navigate("/");
      } else {
        toast.error(response.data.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                value={form.username}
              />
            </div>

            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={form.password}
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
