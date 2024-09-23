"use client"

import { UilShoppingCartAlt } from "@iconscout/react-unicons";
import { useCart } from "@/app/Context/CardContext";
import Link from "next/link";

export default function Cart() {
  const { cartItems, removeFromCart, addToCart, clearItemCart } = useCart();

  // Define cart state
  const cartState = {
    shippingCost: 10.0,
    totalQuantity: cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0),
    totalAmount: cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0),
    totalCost: cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0) + 10.0,
  };

  const { shippingCost, totalQuantity, totalAmount, totalCost } = cartState;

  return (
    <div className="bg-white dark:bg-black mt-10 py-5 min-h-screen">
      <div className="container px-4 mx-auto">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-center max-w-sm p-6 bg-white dark:bg-black gap-5">
              <UilShoppingCartAlt
                size={98}
                className="inline-flex items-center text-black dark:text-white"
              />
              <h3 className="mb-2 mt-5 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Your Cart is Currently Empty
              </h3>
              <p className="mb-3 font-light text-gray-500 dark:text-white">
                Before proceeding to checkout, add some products to your cart.
                You will find a lot of interesting products on our "Product" page.
              </p>
              <Link href="/dashboard/Menu">
                <button className="border p-2 mt-2 inline-flex items-center bg-blue-600 text-white hover:bg-blue-700">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex flex-row justify-between">
                <h1 className="p-7 text-lg md:text-2xl text-black dark:text-white font-semibold">
                  Shopping Cart
                </h1>
                <h1 className="p-7 text-lg md:text-2xl text-black dark:text-white font-semibold">
                  {totalQuantity} Items
                </h1>
              </div>
              <hr />
              <div className="mt-7 space-y-5">
                {cartItems.map((item: CartItem) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center md:space-x-5 mb-5"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 object-contain mb-3 md:mb-0"
                    />
                    <div className="flex flex-col flex-grow">
                      <div className="text-lg text-black dark:text-white font-semibold">
                        {item.title}
                      </div>
                      <div className="text-sm text-center md:text-left text-gray-500">{item.category}</div>
                      <p
                        onClick={() => clearItemCart(item.id)}
                        className="mx-0 mt-1 mb-0 text-md text-center md:text-left text-red-700 cursor-pointer font-bold"
                      >
                        Remove
                      </p>
                    </div>
                    <div className="flex items-center mt-3 md:mt-0">
                      <button
                        onClick={() => removeFromCart({ ...item, quantity: 1 })}
                        className="bg-gray-200 p-2 rounded-l-md transition hover:bg-black hover:text-white"
                      >
                        -
                      </button>
                      <div className="w-10 text-center bg-gray-100 p-2">{item.quantity}</div>
                      <button
                        onClick={() => addToCart({ ...item, quantity: 1 })}
                        className="bg-gray-200 p-2 rounded-r-md transition hover:bg-black hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="p-7 text-2xl text-black dark:text-white font-semibold">Order Summary</h1>
              <hr />
              <div className="mt-7 space-y-4">
                <div className="flex justify-between text-black dark:text-white text-sm md:text-base">
                  <p>Items {totalQuantity}</p>
                  <p>${totalAmount.toFixed(2)}</p>
                </div>
                <div className="text-black dark:text-white">
                  <label htmlFor="select" className="font-bold">
                    Shipping
                    <select className="block border p-2 text-gray-600 mt-3 mb-5 w-full text-sm">
                      <option>Standard shipping - ${shippingCost}</option>
                    </select>
                  </label>
                  <label htmlFor="Promo code" className="nt-5 font-bold">
                    Promo Code
                    <input
                      type="text"
                      id="subject"
                      className="block p-2 w-full mt-2 mb-6 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </label>
                </div>

                <div className="flex justify-between text-black dark:text-white text-base md:text-xl font-bold">
                  <p>Total Cost:</p>
                  <p>${totalCost.toFixed(2)}</p>
                </div>
                <div className="text-center md:text-right">
                  <Link href="/dashboard/Checkout">
                    <button className="bg-blue-500 text-white p-2 mt-2 md:ml-2 hover:bg-blue-700">
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}