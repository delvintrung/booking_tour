import React, { type ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
