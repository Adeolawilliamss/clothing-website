"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import {
  UilTruck,
  UilShoppingCart,
  UilTimes,
  UilBars,
} from "@iconscout/react-unicons";

import { useCart } from "@/app/Context/CardContext";
import clsx from "clsx";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { CartItem } from "@/lib/definitions";

export default function Nav() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [searchLoading, setSearchLoading] =
    useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const { cartItems } = useCart();

  const pathname = usePathname();

  const totalItems = cartItems.reduce(
    (total: number, item: CartItem) =>
      total + item.quantity,
    0
  );

  useEffect(() => {
    if (!search.trim()) return;

    setSearchLoading(true);

    const timeout = setTimeout(() => {
      router.replace(
        `/dashboard/Menu?search=${search}`
      );

      setSearchLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, router]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b-4 bg-slate-200 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <UilTimes className="h-8 w-8" />
            ) : (
              <UilBars className="h-8 w-8" />
            )}
          </button>

          {/* LOGO */}
          <Link href="/dashboard">
            <div className="flex items-center gap-2">
              <UilTruck className="h-7 w-7 sm:h-8 sm:w-8" />

              <h1 className="text-sm font-bold sm:text-lg">
                AdeFashion
              </h1>
            </div>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex">
          <ul className="flex items-center gap-6">
            <Link href="/dashboard">
              <li
                className={clsx(
                  "font-semibold hover:text-red-600",
                  {
                    "text-red-600":
                      pathname === "/dashboard",
                  }
                )}
              >
                Home
              </li>
            </Link>

            <Link href="/dashboard/Menu">
              <li
                className={clsx(
                  "font-semibold hover:text-red-600",
                  {
                    "text-red-600":
                      pathname === "/dashboard/Menu",
                  }
                )}
              >
                Products
              </li>
            </Link>

            <Link href="/dashboard/About">
              <li
                className={clsx(
                  "font-semibold hover:text-red-600",
                  {
                    "text-red-600":
                      pathname === "/dashboard/About",
                  }
                )}
              >
                About
              </li>
            </Link>

            <Link href="/dashboard/Contact">
              <li
                className={clsx(
                  "font-semibold hover:text-red-600",
                  {
                    "text-red-600":
                      pathname === "/dashboard/Contact",
                  }
                )}
              >
                Contact
              </li>
            </Link>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* SEARCH */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-24
                rounded
                border
                px-2
                py-1
                text-sm
                text-black
                sm:w-40
                md:w-56
              "
            />

            {searchLoading ? (
              <span className="text-xs text-gray-500">
                ...
              </span>
            ) : (
              <FaSearch className="text-xl" />
            )}
          </div>

          {/* CART */}
          <div className="relative">
            <Link href="/dashboard/Cart">
              <UilShoppingCart className="h-7 w-7 sm:h-8 sm:w-8" />
            </Link>

            <span
              className="
                absolute
                -right-2
                -top-2
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-red-600
                text-xs
                text-white
              "
            >
              {totalItems}
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="border-t bg-slate-200 md:hidden">
          <ul className="flex flex-col gap-4 px-4 py-6">
            <Link
              href="/dashboard"
              onClick={handleLinkClick}
            >
              <li>Home</li>
            </Link>

            <Link
              href="/dashboard/Menu"
              onClick={handleLinkClick}
            >
              <li>Products</li>
            </Link>

            <Link
              href="/dashboard/About"
              onClick={handleLinkClick}
            >
              <li>About</li>
            </Link>

            <Link
              href="/dashboard/Contact"
              onClick={handleLinkClick}
            >
              <li>Contact</li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}