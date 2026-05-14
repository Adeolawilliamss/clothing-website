"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import "./ProductSection.css";
import fallbackProducts from "../data/fallbackProducts";
import { useCart } from "@/app/Context/CardContext";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Loading from "@/app/ui/Loading";

interface Product {
  _id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}
// ✅ Keep categories (unchanged)
const categories = [
  "All",
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useCart();

  // ✅ Safe fetch with fallback
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/products");

      const json = await res.json();
      console.log("API RESPONSE:", json);

      const products = json.data?.products || json.data || json;

      if (!Array.isArray(products)) {
        throw new Error("API did not return an array");
      }

      setProducts(products);
    } catch (err) {
      console.error("Using fallback data:", err);
      setError(true);
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  // ✅ Filtering STILL works
  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === activeTab.toLowerCase(),
        );

  // ✅ Loading state
  if (loading) return <Loading />;

  return (
    <div className="relative py-11 pt-12 bg-white dark:bg-black min-h-full">
      <div className="container mx-auto px-4">
        <h1 className="flex justify-center text-2xl font-extrabold text-black dark:text-white sm:text-3xl">
          Latest Products
        </h1>

        {/* ✅ Error message but UI still works */}
        {error && (
          <p className="text-center text-red-500 mt-2">
            Failed to load API. Showing sample products.
          </p>
        )}

        <hr className="w-full" />

        <div className="under-links mt-10">
          {/* ✅ CATEGORY TABS */}
          <ul className="tabs flex flex-col md:flex-row mx-auto justify-center gap-2">
            {categories.map((category, index) => (
              <li key={index} className="list">
                <button
                  className={clsx("tab-button", {
                    active: activeTab === category,
                  })}
                  onClick={() => setActiveTab(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>

          {/* ✅ PRODUCTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
            {filteredProducts.length === 0 ? (
              <p className="text-center col-span-3 text-gray-500">
                No products found in this category.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product._id} className="shadow-lg rounded p-3">
                  {/* ✅ Clickable image */}
                  <Link href={`/dashboard/products/${product._id}`}>
                    <div className="mt-5 group cursor-pointer">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-32 mx-auto object-contain transition-transform duration-200 group-hover:scale-110"
                      />
                    </div>
                  </Link>

                  {/* ✅ Product Info */}
                  <div className="text-xs text-center mt-4 text-black dark:text-white">
                    {product.category}
                  </div>

                  <div className="text-center mt-2 text-base font-semibold h-12 overflow-hidden text-black dark:text-white">
                    {product.title}
                  </div>

                  <div className="mt-4 text-center font-bold text-lg text-black dark:text-white">
                    {new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
}).format(product.price)}
                  </div>

                  {/* ✅ Add to cart */}
                  <div className="flex justify-center mt-3">
                    <button
                      className="add-to-cart-btn flex items-center gap-2"
                      onClick={() => addToCart({ ...product, quantity: 1 })}
                    >
                      <FaShoppingCart />
                      Add to cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
