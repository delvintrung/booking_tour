import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/userStore";
import type { User } from "@/types";
import { useNavigate } from "react-router-dom";

const mockBookings = [
  {
    id: 1,
    title: "Khám Phá Tân Cương Huyền Bí 10 Ngày 9 Đêm",
    date: "2025-03-20",
    price: 79990000,
    status: "Đã hoàn thành",
  },
  {
    id: 2,
    title: "Tour Trung Quốc 8 Ngày 7 Đêm - Cam Túc, Đan Hà",
    date: "2025-05-15",
    price: 43990000,
    status: "Đã đặt cọc",
  },
];

export default function Profile() {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User | null>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleSave = () => {
    console.log("Saved user info:", formData);
  };

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("accessToken");
    navigate("/sign-in");
  };

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
              <div className="space-y-4">
                <div>
                  <Label>Họ và tên</Label>
                  <Input
                    value={formData?.fullName || ""}
                    onChange={(e) => handleChange("fullName", e.target.value)}
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

                <div>
                  <Label>Số điện thoại</Label>
                  <Input
                    type="tel"
                    value={formData?.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <Button onClick={handleSave}>💾 Lưu thay đổi</Button>
                  <Button variant="outline" onClick={handleLogout}>
                    🚪 Đăng xuất
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* --- Tab: Lịch sử tour --- */}
            <TabsContent value="history">
              <div className="space-y-4">
                {mockBookings.map((b) => (
                  <Card key={b.id} className="border border-gray-100 shadow-sm">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-blue-800">
                        {b.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Ngày khởi hành: {b.date}
                      </p>
                      <p className="text-sm text-gray-500">
                        Trạng thái:{" "}
                        <span className="font-medium text-green-600">
                          {b.status}
                        </span>
                      </p>
                      <p className="text-sm mt-1">
                        Giá:{" "}
                        <span className="font-semibold text-red-500">
                          {b.price.toLocaleString("vi-VN")}đ
                        </span>
                      </p>
                    </CardContent>
                  </Card>
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
