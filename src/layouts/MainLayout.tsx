import { type ReactNode } from "react";
import Footer from "@/components/Footer";
import SpanHeader from "@/components/SpanHeader";
import { Toaster } from "@/components/ui/sonner";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <SpanHeader />
      <main>{children}</main>
      <Toaster />
      <Footer />
    </div>
  );
};

export default MainLayout;
