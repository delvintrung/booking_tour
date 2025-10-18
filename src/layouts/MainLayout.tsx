import React, { type ReactNode } from "react";
import Footer from "@/components/Footer";
import SpanHeader from "@/components/SpanHeader";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <SpanHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
