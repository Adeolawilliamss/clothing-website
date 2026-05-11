"use client";

import { useEffect, useState } from "react";
import { oswald } from "@/app/ui/fonts";
import Nav from "../Navbar/page";

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* ✅ Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          showNavbar
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <Nav />
      </div>

      {/* ✅ Hero Section */}
      <div className="relative bg-[url(/Clothing-website.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-x-0 top-32 flex justify-center z-20"></div>

        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/90 sm:to-white/25"></div>

        <div className="relative mx-auto max-w-screen px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 lg:pb-24">
          <div className="max-w-xl text-center sm:text-left ">
            <h1
              className={`${oswald.className} text-4xl font-extrabold text-black dark:text-red-500 sm:text-5xl md:text-6xl`}
            >
              NEW SEASONS ARRIVAL
            </h1>

            <p className="mt-4 max-w-lg text-lg sm:text-xl lg:text-3xl sm:leading-relaxed">
              CHECK OUT LATEST TRENDS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
