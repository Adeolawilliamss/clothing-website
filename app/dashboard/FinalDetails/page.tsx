"use client";

import { useEffect, useState } from 'react';
import { useCart } from "@/app/Context/CardContext";
import { FaArrowLeft } from 'react-icons/fa';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Loading from "@/app/ui/Loading"

export default function FinalDetails() {
  const { cartItems, clearCart, billingDetails, selectedProduct } = useCart();
  const [loading, setLoading] = useState(true);
  const shippingCost = 10.0;
  const router = useRouter();

  const totalAmount = selectedProduct
    ? selectedProduct.price
    : cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
  const totalCost = totalAmount + shippingCost;

  // Calculate total quantity of items in the cart
  const totalQuantity = cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);

  const handlePlaceOrder = () => {
    clearCart();
    router.push("/dashboard");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      console.log('Loading complete');
    }, 8000);
  }, []);

  if (loading) {
    return (
        <Loading />
    );
  }

  return (
    <div className="bg-slate-100 dark:bg-black min-h-screen w-full pt-24">
      <div className="container mx-auto mb-3 px-4">
        <div>
          <h1 className=" text-black text-center dark:text-white text-3xl">Thanks for ordering! 😊</h1>
          
          <div className="gap-5">
            {/* Billing Details */}
            <div>
              <h1 className="mt-4 text-black dark:text-white text-2xl">Billing Details:</h1>
              <div className="mb-6 mt-3 text-black dark:text-white">
                <p className="text-lg mb-2">Name: {billingDetails?.name}</p>
                <p className="text-lg mb-2">Email: {billingDetails?.email}</p>
                <p className="text-lg mb-2">Number: {billingDetails?.number}</p>
                <p className="text-lg mb-2">Address: {billingDetails?.address}</p>
                <p className="text-lg mb-2">City: {billingDetails?.city}</p>
                <p className="text-lg mb-2">Postal Code: {billingDetails?.postalCode}</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="mt-8">
              <h1 className="text-2xl text-black dark:text-white mb-4">Your Order:</h1>

              {/* If a product is selected via the context, display it */}
              {selectedProduct ? (
                <div className="bg-darkBlue text-white flex justify-between items-center rounded-md p-6 mb-2">
                  <h4>{selectedProduct.title}</h4>
                  <div className='group'>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.title}
                      className="w-12 h-12 md:h-[6rem] md:w-[6rem] object-contain transition-transform duration-200 transform group-hover:scale-110 mb-3 md:mb-0"
                    />
                  </div>
                  <h4 className="text-orange">${selectedProduct.price.toFixed(2)}</h4>
                </div>
              ) : (
                // Otherwise, display the items from the cart
                cartItems.map((item: CartItem) => (
                  <div key={item.id} className="bg-darkBlue text-white flex justify-between items-center rounded-md p-6 mb-2">
                    <h4>{item.title} (x{item.quantity})</h4>
                    <div className='group'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 md:h-[6rem] md:w-[6rem] object-contain transition-transform duration-200 transform group-hover:scale-110 mb-3 md:mb-0"
                      />
                    </div>
                    <h4 className="text-orange">${(item.price * item.quantity).toFixed(2)}</h4>
                  </div>
                ))
              )}

              <hr className="my-4 border-gray-800 dark:border-white" />
              <div className="flex mt-5 justify-between text-gray-800 dark:text-white">
                <p>Total Order(s)</p>
                <p>x{totalQuantity}</p>
              </div>

              <div className="flex mt-5 justify-between text-gray-800 dark:text-white">
                <p>Shipping</p>
                <p>${shippingCost.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-800 dark:text-white font-bold">
                <p>Total</p>
                <p>${totalCost.toFixed(2)}</p>
              </div>

              <div className='flex gap-5 w-full'>
  {/* Back button with arrow */}
  <Link href="/dashboard/Cart"
    className="transperent w-full border-2 border-black dark:border-white mt-5 flex items-center justify-center hover:scale-95 transition-transform duration-200 gap-2 rounded-lg p-3 text-white">
    <FaArrowLeft className="transition-transform text-red-500" />
    <p className='text-black dark:text-white'>Back</p>
  </Link>

  <button onClick={handlePlaceOrder}
                  className="bg-orange w-full md:w-full mt-5 flex items-center justify-center rounded-lg hover:scale-95 transition-transform duration-200 p-3 text-white">
                  Continue
                </button>
</div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
