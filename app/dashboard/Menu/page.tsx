"use client"

import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "@/app/Context/CardContext";
import '../ProductSection/ProductSection.css';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductSection() {
  const [Products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart(); // Get the addToCart function from context

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json: Product[]) => setProducts(json));
  }, []);

  return (
    <div className="relative py-4 pt-12 bg-white dark:bg-black min-h-full">
      <div className="container mx-auto px-4">
        <hr className="w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
          {Products.map((product) => (
            <div key={product.id} className="shadow-lg rounded">
              <Link href={`/dashboard/products/${product.id}`}>
              <div className="mt-10 group flex-grow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-32 mx-auto object-contain transition-transform duration-200 transform group-hover:scale-110"
                />
              </div>
              <div className="font-light text-xs text-center text-black dark:text-white mt-4">{product.category}</div>
              <div className="text-center text-black dark:text-white mt-2 text-base font-semibold h-12 overflow-hidden">{product.title}</div>
              <div className="mt-4 text-center text-black dark:text-white font-bold text-lg">${product.price.toFixed(2)}</div>
              <div className="add-cart flex items-center justify-center">
                                   <button
                                   className='add-to-cart-btn flex'
                                   onClick={() => addToCart({ ...product, quantity: 1 })}
                                    >
                                  <span className="mt-2 ml-5"><FaShoppingCart /></span>
                                  Add to cart
                                  </button>
                              </div></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}