"use client";
import { usePaystackPayment } from "react-paystack";
import { useCart } from "@/app/Context/CardContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/ui/axios";
import { toast } from "react-toastify";
import Loading from "@/app/ui/Loading";

export default function Checkout() {
  const { cartItems, selectedProduct, setBillingDetails } = useCart();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [input, setInput] = useState({
    name: "",
    email: "",
    number: "",
    postalCode: "",
    address: "",
    city: "",
  });

  const shippingCost = 10.0;

  // Calculate total amounts based on selectedProduct or cartItems
  const totalAmount = selectedProduct
    ? selectedProduct.price
    : cartItems.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0,
      );
  const totalCost = totalAmount + shippingCost;

  const config = {
    reference: new Date().getTime().toString(),
    email: input.email,
    amount: totalCost * 100, // Paystack uses kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const initializePayment = usePaystackPayment(config);

  const verifyPayment = async (reference: string) => {
    try {
      await axiosInstance.post("/payments/verify", {
        reference,
        billingDetails: input,
        items: cartItems,
        amount: totalCost,
      });

      toast.success("Payment successful!");
      router.push("/dashboard/FinalDetails");
    } catch (err) {
      toast.error("Payment verification failed");
    }
  };

  const onSuccess = (reference: { reference: string }) => {
    console.log(reference);

    // send to backend
    verifyPayment(reference.reference);
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form fields
  const validateForm = () => {
    const { name, email, number, postalCode, address, city } = input;
    if (!name || !email || !number || !postalCode || !address || !city) {
      return false;
    }
    return true;
  };

  // Handle placing order and store billing details
  // const handlePlaceOrder = () => {
  //   if (!validateForm()) {
  //     toast.error("Please fill in all fields before placing the order", {
  //       position: "bottom-left",
  //     });
  //     return;
  //   }

  //   // If form is valid, store billing details and navigate to FinalDetails
  //   setBillingDetails(input);
  //   router.push("/dashboard/FinalDetails"); // Programmatically navigate to FinalDetails
  // };

  const handlePaystack = () => {
    if (!validateForm()) {
      toast.error("Fill all fields");
      return;
    }

    initializePayment({ onSuccess, onClose });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      console.log("Loading complete");
    }, 4000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-100 dark:bg-black min-h-screen w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h1 className="mt-32 text-black dark:text-white text-2xl">
              Billing Information
            </h1>
            <form className="flex flex-col mt-5 gap-7">
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
                placeholder="Enter your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
                placeholder="Enter your Email"
                required
              />
              <input
                type="number"
                name="number"
                value={input.number}
                onChange={handleChange}
                className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
                placeholder="Enter your Number"
                required
              />
              <input
                type="text"
                name="address"
                value={input.address}
                onChange={handleChange}
                className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
                placeholder="Street Address"
                required
              />
              <input
                type="text"
                name="postalCode"
                value={input.postalCode}
                onChange={handleChange}
                className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
                placeholder="Postal Code"
                required
              />
              <input
                type="text"
                name="city"
                value={input.city}
                onChange={handleChange}
                className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
                placeholder="City"
                required
              />
            </form>
          </div>

          <div className="mt-32 mb-8">
            {/* If there's a selectedProduct, show its info */}
            {selectedProduct ? (
              <div className="bg-darkBlue text-white rounded-md p-6 mb-2">
                <h4>{selectedProduct.title}</h4>
                <h4 className="text-orange">
                  {new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
}).format(selectedProduct.price)}
                </h4>
              </div>
            ) : (
              // Otherwise, show cart items
              cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="bg-darkBlue text-white rounded-md p-6 mb-2"
                >
                  <h4>
                    {item.title} (x{item.quantity})
                  </h4>
                  <h4 className="text-orange">
                    {new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
}).format(item.price * item.quantity)}
                    
                  </h4>
                </div>
              ))
            )}

            <hr className="my-4 border-gray-800 dark:border-white" />
            <div className="flex mt-10 justify-between text-gray-800 dark:text-white">
              <p>Shipping</p>
              <p>{new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
}).format(shippingCost)}</p>
            </div>
            <div className="flex justify-between text-gray-800 dark:text-white font-bold">
              <p>Total</p>
              <p>{new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
}).format(totalCost)}</p>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePaystack}
              className="bg-orange w-full mt-5 items-center justify-center rounded-lg hover:scale-95 transition-transform duration-200 p-3 text-white"
            >
              Place an Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
