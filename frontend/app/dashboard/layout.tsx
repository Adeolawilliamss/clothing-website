"use client";
import { usePathname } from "next/navigation";
import Nav from "./Navbar/page";
import { CartProvider } from "@/app/Context/CardContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { outfit } from "@/app/ui/fonts";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log("Current Path:", pathname);
  return (
    <div>
      <CartProvider>
        {pathname !== "/dashboard" && <Nav />}
        <div className={`${outfit.className} antialiased`}>{children}</div>
      </CartProvider>
      <ToastContainer />
    </div>
  );
}
