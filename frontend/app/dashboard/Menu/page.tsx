"use client";

import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/app/Context/CardContext";
import "../ProductSection/ProductSection.css";
import Link from "next/link";
import fallbackProducts from "../data/fallbackProducts";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) throw new Error("Fetch failed");

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Using fallback:", err);
        setError(true);
        setProducts(fallbackProducts); // ✅ fallback works now
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
          {products.map((product) => (
            <div key={product.id} className="shadow-lg rounded p-3">
              
              {/* ✅ ONLY image clickable */}
              <Link href={`/dashboard/products/${product.id}`}>
                <div className="mt-5 group cursor-pointer">
                  <img
                    src={
                      product.image ||
                      `https://picsum.photos/200?random=${product.id}`
                    }
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
                ${product.price.toFixed(2)}
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
          ))}
        </div>
      </div>
    </div>
  );
}