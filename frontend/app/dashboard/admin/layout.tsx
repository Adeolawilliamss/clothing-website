"use client";

import Link from "next/link";
import { outfit } from "@/app/ui/fonts";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import axiosInstance from "@/app/ui/axios";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // No token → send to sign in
        if (!token) {
          router.push("/dashboard/SignIn");
          return;
        }

        // Verify token with backend
        await axiosInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAuthorized(true);
      } catch (error) {
        localStorage.removeItem("accessToken");
        router.push("/dashboard/SignIn");
      }
    };

    verifyUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // call backend logout
      await axiosInstance.post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      // always clear local state
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");

      router.push("/dashboard");
    }
  };

  const links = [
    { name: "Dashboard", href: "/dashboard/admin" },
    { name: "Users", href: "/dashboard/admin/users" },
    { name: "Products", href: "/dashboard/admin/products" },
    { name: "Orders", href: "/dashboard/admin/orders" },
  ];

  // Prevent rendering until auth check completes
  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-200 text-black p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block p-2 rounded ${
                  pathname === link.href
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={handleLogout}
              className="block p-2 rounded w-full text-left hover:bg-gray-800"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className={`${outfit.className} antialiased`}>
          {children}
        </div>
      </main>
    </div>
  );
}