import React, { type ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
