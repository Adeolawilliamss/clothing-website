"use client"

import { useState } from "react";
import Link from 'next/link';
import { UilTruck, UilShoppingCart, UilTimes, UilUser, UilBars } from "@iconscout/react-unicons";
import { useCart } from "@/app/Context/CardContext";
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import "./Navbar.css";

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems } = useCart();
    const pathname = usePathname();

    const mobileNavOpen = () => {
        setIsOpen(true);
    };

    const mobileNavClose = () => {
        setIsOpen(false);
    };

    const handleLinkClick = () => {
        mobileNavClose(); // Close the menu when a link is clicked
    };

    // Typing the reduce parameters
    const totalItems = cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);

    return (
        <nav id="nav" className="fixed w-full top-0 bg-slate-200 py-4 border-b-4 z-50">
            <div className="container mx-auto px-4">
                <div className='nav-container flex flex-wrap items-center justify-between'>
                    <div className="block md:hidden">
                        <button onClick={mobileNavOpen}
                            type="button"
                            className={
                                !isOpen
                                    ? "inline-flex items-center p-2 text-sm md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    : "hidden"
                            }
                            aria-label="Open menu"
                            title="Open menu"
                        >
                            <UilBars size={35} />
                        </button>

                        <button
                            onClick={mobileNavClose}
                            type="button"
                            className={
                                isOpen
                                    ? "inline-flex items-center p-2 text-sm md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    : "hidden"
                            }
                            aria-label="Close menu"
                            title="Close menu"
                        >
                            <UilTimes size={35} />
                        </button>
                    </div>

                    <Link href="/dashboard">
                        <div className='flex items-center gap-2'>
                            <UilTruck size={35} />
                            <h1 className='mt-1 text-lg text-black dark:text-red-500'>AdeGadgets</h1>
                        </div>
                    </Link>

                    <div className="nav-list flex-1 justify-center md:flex lg:flex">
                        <ul className='flex flex-row gap-5'>
                            <Link href="/dashboard" onClick={handleLinkClick}>
                                <li className={clsx('font-bold hover:text-red-600', { 'text-red-600': pathname === '/dashboard' })}>
                                    Home
                                </li>
                            </Link>

                            <Link href="/dashboard/Menu" onClick={handleLinkClick}>
                                <li className={clsx('font-bold hover:text-red-600', { 'text-red-600': pathname === '/dashboard/Menu' })}>
                                    Products
                                </li>
                            </Link>

                            <Link href="/dashboard/About" onClick={handleLinkClick}>
                                <li className={clsx('font-bold hover:text-red-600', { 'text-red-600': pathname === '/dashboard/About' })}>
                                    About
                                </li>
                            </Link>

                            <Link href="/dashboard/Contact" onClick={handleLinkClick}>
                                <li className={clsx('font-bold hover:text-red-600', { 'text-red-600': pathname === '/dashboard/Contact' })}>
                                    Contact
                                </li>
                            </Link>
                        </ul>
                    </div>

                    <div className="flex relative items-center gap-4">
                        <Link href="/dashboard/Sign-in">
                            <UilUser size={35} />
                        </Link>

                        <Link href="/dashboard/Cart">
                            <UilShoppingCart size={35} />
                        </Link>
                        <span className="absolute right-0 left-15 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-xs leading-tight text-center">
                            {totalItems}
                        </span>
                    </div>

                    {/* The List that shows when the menu is clicked */}
                    <div
                        className={
                            isOpen
                                ? "md:items-center justify-between w-full md:flex md:w-auto"
                                : "hidden"
                        }
                    >
                        <ul className="md:flex flex-col p-6 gap-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                            <Link href="/dashboard" onClick={handleLinkClick}>
                                <li>Home</li>
                            </Link>

                            <Link href="/dashboard/Menu" onClick={handleLinkClick}>
                                <li>Products</li>
                            </Link>

                            <Link href="/dashboard/About" onClick={handleLinkClick}>
                                <li>About</li>
                            </Link>

                            <Link href="/dashboard/Contact" onClick={handleLinkClick}>
                                <li>Contact</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
