"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RiStarFill } from "react-icons/ri";
import { useCart } from "@/app/Context/CardContext";
import fallbackProducts from "../../data/fallbackProducts";

export default function ItemDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart, setSelectedProduct } = useCart(); // Access setSelectedProduct from the context
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!res.ok) throw new Error("Fetch failed");

        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Using fallback product:", err);
        setError(true);

        // ✅ Find product from fallback using ID
        const fallback = fallbackProducts.find((p) => p.id === Number(id));

        setProduct(fallback || fallbackProducts[0]); // fallback safety
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Handle checkout navigation
  const handleCheckout = () => {
    if (product) {
      // Set the selected product in the context
      setSelectedProduct(product);

      // Navigate to the FinalDetails or Checkout page
      router.push(`/dashboard/Checkout`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-black items-center justify-center">
      <div className="container px-4">
        {error && (
          <p className="text-red-500 text-center mb-2">
            Failed to load product. Showing sample data.
          </p>
        )}
        <div
          key={product.id}
          className="flex flex-col md:flex-row items-center gap-5 md:space-x-5"
        >
          {/* Product Image */}
          <div className="group">
            <img
              src={
                product.image ||
                `https://picsum.photos/400?random=${product.id}`
              }
              alt={product.title}
              className="w-20 h-20 md:h-[25rem] md:w-[25rem] object-contain transition-transform duration-200 transform group-hover:scale-110 mb-3 md:mb-0"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="flex flex-col flex-grow">
              <div className="text-3xl text-black dark:text-white font-semibold">
                {product.title}
              </div>

              <div className="text-sm text-gray-500">{product.category}</div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                {product.description}
              </p>
            </div>

            <hr className="mt-2" />

            {/* Price and Buttons */}
            <div className="flex flex-col mt-2 gap-5 ">
              <div className="text-lg text-black dark:text-white font-semibold">
                ${product.price.toFixed(2)}
              </div>

              <div className="flex">
                {/* Add to Cart Button */}
                <button
                  className="flex ml-auto text-black dark:text-white bg-transparent border py-2 px-3 focus:outline-none
                  hover:text-white hover:dark:text-black hover:bg-black rounded hover:dark:bg-white"
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                >
                  Add to Cart
                </button>

                {/* Proceed to Checkout Button */}
                <button
                  className="flex ml-6 text-white bg-red-700 text-center border-0 py-2 px-3 focus:outline-none hover:bg-blue-600 rounded"
                  onClick={handleCheckout}
                >
                  Buy Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}