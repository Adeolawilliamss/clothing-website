"use client";

import Link from "next/link";
import { outfit } from "@/app/ui/fonts";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard/admin" },
    { name: "Users", href: "/dashboard/admin/users" },
    { name: "Products", href: "/dashboard/admin/products" },
    { name: "Orders", href: "/dashboard/admin/orders" },
  ];

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
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
      <div className={`${outfit.className} antialiased`}>{children}</div>
      </main>
    </div>
  );
}