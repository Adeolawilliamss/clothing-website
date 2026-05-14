"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/app/Context/CardContext";
import "../ProductSection/ProductSection.css";
import Link from "next/link";
import fallbackProducts from "../data/fallbackProducts";

interface Product {
  _id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();

const searchQuery =
  searchParams.get("search")?.toLowerCase() || "";

  const { addToCart } = useCart();

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

const filteredProducts = products.filter((product) =>
  product.title
    .toLowerCase()
    .includes(searchQuery)
);

  // ✅ Loading state
  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="relative py-4 pt-12 mb-10 bg-white dark:bg-black min-h-full">
      <div className="container mx-auto px-4">
        <hr className="w-full" />

        {/* ✅ Error message */}
        {error && (
          <p className="text-center text-red-500 mt-20">
            Failed to load API. Showing sample products.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
          {filteredProducts.length === 0 ? (
            <p className="text-center col-span-3 text-gray-500">
              No products found
                  </p>
              ) : (
                filteredProducts.map((product) => (
            <div key={product._id} className="shadow-lg rounded p-3">
              
              {/* ✅ ONLY image clickable */}
              <Link href={`/dashboard/products/${product._id}`}>
                <div className="mt-5 group cursor-pointer">
                   <img
                       src={product.image}
                        alt={product.title}
                    className="h-32 mx-auto object-contain transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="font-light text-xs text-center text-black dark:text-white mt-4">
                {product.category}
              </div>

              <div className="text-center text-black dark:text-white mt-2 text-base font-semibold h-12 overflow-hidden">
                {product.title}
              </div>

              <div className="mt-4 text-center text-black dark:text-white font-bold text-lg">
               {new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
}).format(product.price)}
              </div>

              {/* ✅ Button OUTSIDE link */}
              <div className="flex items-center justify-center mt-3">
                <button
                  className="add-to-cart-btn flex items-center gap-2"
                  onClick={() =>
                    addToCart({ ...product, quantity: 1 })
                  }
                >
                  <FaShoppingCart />
                  Add to cart
                </button>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}