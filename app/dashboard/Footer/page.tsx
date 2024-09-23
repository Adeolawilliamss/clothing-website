"use client"

import { UilTruck } from "@iconscout/react-unicons";

export default function Footer() {
    return (
        <footer id="footer" className="bg-black text-white py-4 border-t-10 min-h-full">
            <div className="container mx-auto px-4">
                <hr className="w-full bg-white" />
                <div className="flex items-center justify-center p-12 gap-2">
                    <UilTruck size={50} />
                    <h1 className="text-2xl text-slate-100">TruckFit</h1>
                </div>
                <hr className="w-full bg-white" />
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-md sm:text-center dark:text-gray-400 mt-4">
                    <span>©</span>
                    <span className="hover:underline">TruckFit™</span>
                    <span>. All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    );
}
