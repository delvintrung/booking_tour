import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  avatarUrl?: string;
  onChange: (file: File | null, previewUrl?: string) => void;
}

const AvatarUploader: React.FC<Props> = ({ avatarUrl, onChange }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(avatarUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file, url);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <Avatar className="w-24 h-24">
        <AvatarImage src={preview} alt="Avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <Button
        variant="outline"
        className="text-sm"
        onClick={() => fileInput.current?.click()}
      >
        Đổi ảnh đại diện
      </Button>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInput}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AvatarUploader;
