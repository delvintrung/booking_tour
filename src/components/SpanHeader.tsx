import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import headerDestinations from "@/lib/headerBackground";

const SpanHeader: React.FC = () => {
  const [isTop, setIsTop] = useState(true);
  const { name } = useParams<{ name: string }>();
  const currentDestination = headerDestinations.find(
    (dest) => dest.key === name
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${
            currentDestination ? currentDestination.backgroundImage : ""
          })`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute top-0 left-0 w-full z-20 transition-all duration-300">
        <Header isTop={isTop} />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          {currentDestination ? currentDestination.title : "Welcome"}
        </h1>
      </div>
    </div>
  );
};

export default SpanHeader;
