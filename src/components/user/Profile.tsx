import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/userStore";
import type { User } from "@/types";
import { useNavigate, Link } from "react-router-dom";
import { AxiosClient } from "@/lib/utils";
import { toast } from "sonner";
import HistoryTourCard from "./HistoryTourCard";

export default function Profile() {
  const { user, clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User | null>(user);

  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleSave = async () => {
    const isValidPhone = formData?.phone?.match(regexPhoneNumber)
      ? true
      : false;
    if (!isValidPhone) {
      toast.error("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }
    const isValidEmail = formData?.email?.match(regexEmail) ? true : false;
    if (!isValidEmail) {
      toast.error("Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await AxiosClient.put(
        "/users/" + formData?.id,
        formData
      );
      if (response.data.data) {
        setFormData(response.data as User);
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleLogout = async () => {
    clearUser();
    const res = await AxiosClient.post("/auth/logout");
    localStorage.removeItem("accessToken");
    toast.success(res.data as string);
    navigate("/sign-in");
  };

  const mockBookings = [
    {
      id: 1,
      bookingDetails: [],
      createdAt: "2023-08-15 10:30:00 AM",
      status: "Hoàn thành",
      totalPrice: "1500000",
    },
    {
      id: 2,
      bookingDetails: [],
      createdAt: "2023-08-15 10:30:00 AM",
      status: "Hoàn thành",
      totalPrice: "2000000",
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Hồ Sơ Người Dùng</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid grid-cols-3 w-[450px] mb-4">
              <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="history">Lịch sử tour</TabsTrigger>
              <TabsTrigger value="wishlist">Danh sách yêu thích</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              {isLoading && toast.info("Đang cập nhật thông tin...")}
              <div className="space-y-4">
                <div>
                  <Label>Họ và tên</Label>
                  <Input
                    value={formData?.fullname || ""}
                    onChange={(e) => handleChange("fullname", e.target.value)}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData?.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div className="py-10 flex gap-1">
                  <Label>Thay đổi mật khẩu? </Label>
                  <Link
                    to="/user/change-password"
                    className="decoration-solid text-sm text-orange-500 font-medium underline"
                  >
                    Vào đây
                  </Link>
                </div>

                <div className="pt-2 flex gap-2">
                  <Button onClick={handleSave}>💾 Lưu thay đổi</Button>
                  <Button variant="outline" onClick={handleLogout}>
                    🚪 Đăng xuất
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-4">
                {mockBookings.map((b) => (
                  <HistoryTourCard key={b.id} {...b} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wishlist">
              <div className="text-gray-500">Chức năng đang phát triển...</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
