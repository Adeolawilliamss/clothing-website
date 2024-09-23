"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { RiStarFill } from 'react-icons/ri';
import { useCart } from "@/app/Context/CardContext";

export default function ItemDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart, setSelectedProduct } = useCart();  // Access setSelectedProduct from the context
  
  // Fetch product data based on the ID
  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data: Product) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  // Handle rating click
  const handleRating = (rate: number) => {
    setRating(rate);
  };

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
        <div key={product.id} className="flex flex-col md:flex-row items-center gap-5 md:space-x-5">
          {/* Product Image */}
          <div className='group'>
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 md:h-[25rem] md:w-[25rem] object-contain transition-transform duration-200 transform group-hover:scale-110 mb-3 md:mb-0"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="flex flex-col flex-grow">
              <div className="text-3xl text-black dark:text-white font-semibold">{product.title}</div>

              {/* Rating Stars */}
              <div className='flex gap-2 py-3'>
                {[1, 2, 3, 4, 5].map((rate) => (
                  <span
                    key={rate}
                    title='rate'
                    onClick={() => handleRating(rate)}
                    className={`cursor-pointer ${rate <= (rating ?? 0) ? 'text-orange-800' : 'text-gray-400'}`}
                  >
                    <RiStarFill />
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-500">{product.category}</div>
              <p className="text-gray-600 dark:text-gray-300 mt-4">{product.description}</p>
            </div>

            <hr className='mt-2' />

            {/* Price and Buttons */}
            <div className='flex mt-2 justify-between'>
              <div className="text-lg text-black dark:text-white font-semibold">${product.price.toFixed(2)}</div>

              <div className='flex'>
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

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { RiStarFill } from 'react-icons/ri';
// import { useCart } from "@/app/Context/CardContext";
// import Link from 'next/link';

// export default function ItemDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [rating, setRating] = useState<number | null>(null);
//   const { addToCart } = useCart();

//   const handleRating = (rate: number) => {
//     setRating(rate);
//   };

//   useEffect(() => {
//     if (id) {
//       fetch(`https://fakestoreapi.com/products/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setProduct(data);
//           console.log('Product Data:', data); // Console log to check the product data
//         });
//     }
//   }, [id]);

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="flex min-h-screen bg-white dark:bg-black items-center justify-center">
//       <div className="container px-4">
//         <div key={product.id} className="flex flex-col md:flex-row items-center gap-5 md:space-x-5">
//           <div className='group'>
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-20 h-20 md:h-[25rem] md:w-[25rem] object-contain transition-transform duration-200 transform group-hover:scale-110 mb-3 md:mb-0"
//             />
//           </div>
//           <div>
//             <div className="flex flex-col flex-grow">
//               <div className="text-3xl text-black dark:text-white font-semibold">{product.title}</div>

//               {/* Rating Stars */}
//               <div className='flex gap-2 py-3'>
//                 {[1, 2, 3, 4, 5].map((rate) => (
//                   <span
//                     key={rate}
//                     title='rate'
//                     onClick={() => handleRating(rate)}
//                     className={`cursor-pointer ${rate <= (rating ?? 0) ? 'text-orange-800' : 'text-gray-400'}`}
//                   >
//                     <RiStarFill />
//                   </span>
//                 ))}
//               </div>

//               <div className="text-sm text-gray-500">{product.category}</div>
//               <p className="text-gray-600 dark:text-gray-300 mt-4">{product.description}</p>
//             </div>
//             <hr className='mt-2' />
//             <div className='flex mt-2 justify-between'>
//             <div className="text-lg text-black dark:text-white font-semibold">${product.price.toFixed(2)}</div>
//             <div className='flex'>
//             <button
//                     className="flex ml-auto text-black dark:text-white bg-transparent border py-2 px-3 focus:outline-none
//                   hover:text-white hover:dark:text-black hover:bg-black rounded hover:dark:bg-white"
//                     onClick={() => addToCart({ ...product, quantity: 1 })}
//                   >
//                     Add to Cart
//                   </button>

//                   <Link 
//                     href={{
//                     pathname: `/dashboard/Checkout/${product.id}`,
//                     query: { title: product.title, price: product.price, quantity: 1 }
//   }}
//   className="flex ml-6 text-white bg-red-700 text-center border-0 py-2 px-3 focus:outline-none hover:bg-blue-600 rounded"
// >
//   Buy Now!
// </Link>
//             </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }