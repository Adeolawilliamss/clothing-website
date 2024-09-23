"use client";

import { useCart } from "@/app/Context/CardContext";
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Loading from "@/app/ui/Loading"

export default function Checkout() {
  const { cartItems, selectedProduct, setBillingDetails } = useCart();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [input, setInput] = useState({
    name: '',
    email: '',
    number: '',
    postalCode: '',
    address: '',
    city: '',
  });

  const shippingCost = 10.0;

  // Calculate total amounts based on selectedProduct or cartItems
  const totalAmount = selectedProduct
    ? selectedProduct.price
    : cartItems.reduce((total:number, item:CartItem) => total + item.price * item.quantity, 0);
  const totalCost = totalAmount + shippingCost;

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
  const handlePlaceOrder = () => {
    if (!validateForm()) {
      toast.error('Please fill in all fields before placing the order', { position: 'bottom-left' });
      return;
    }

    // If form is valid, store billing details and navigate to FinalDetails
    setBillingDetails(input);
    router.push("/dashboard/FinalDetails");  // Programmatically navigate to FinalDetails
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      console.log('Loading complete');
    }, 4000);
  }, []);

  if (loading) {
    return (
        <Loading />
    );
  }

  return (
    <div className="bg-slate-100 dark:bg-black min-h-screen w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h1 className="mt-24 text-black dark:text-white text-2xl">Billing Information</h1>
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
                <h4 className="text-orange">${selectedProduct.price.toFixed(2)}</h4>
              </div>
            ) : (
              // Otherwise, show cart items
              cartItems.map((item:CartItem) => (
                <div key={item.id} className="bg-darkBlue text-white rounded-md p-6 mb-2">
                  <h4>{item.title} (x{item.quantity})</h4>
                  <h4 className="text-orange">${(item.price * item.quantity).toFixed(2)}</h4>
                </div>
              ))
            )}

            <hr className="my-4 border-gray-800 dark:border-white" />
            <div className="flex mt-10 justify-between text-gray-800 dark:text-white">
              <p>Shipping</p>
              <p>${shippingCost.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-800 dark:text-white font-bold">
              <p>Total</p>
              <p>${totalCost.toFixed(2)}</p>
            </div>

            {/* Place Order Button */}
            <button onClick={handlePlaceOrder} className="bg-orange w-full mt-5 items-center justify-center rounded-lg hover:scale-95 transition-transform duration-200 p-3 text-white">
              Place an Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// export default function Checkout () {
//     const { id } = useParams();
//     const [product, setProduct] = useState<Product | null>(null);

//     const shippingCost = 10.0;
    

//     useEffect(() => {
//         if (id) {
//           fetch(`https://fakestoreapi.com/products/${id}`)
//             .then((res) => res.json())
//             .then((data) => {
//               setProduct(data);
//               console.log('Product Data:', data);
//             });
//         }
//       }, [id]);
    
//       if (!product) return <div>Loading...</div>;
//       return (
//         <div className="bg-slate-100 min-h-screen w-full">
//           <div className="container mx-auto px-4">
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
//               <div className="">
//                 <h1 className="mt-24 text-2xl">Billing Information</h1>
//                 <form className='flex flex-col mt-5 gap-7'>
//                   <input
//                     type='text'
//                     name='name'
//                     className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
//                     // value={}
//                     placeholder='Enter your Name'
//                     // onChange={}
//                     required
//                   />
//                   <input
//                     type='email'
//                     name='email'
//                     className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
//                     // value={input.email}
//                     placeholder='Enter your Email'
//                     // onChange={handleChange}
//                     required
//                   />
//                   {/* {emailError && <p className="error-message">{emailError}</p>} */}
//                   <input
//                     type='number'
//                     name='number'
//                     className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
//                     // value={input.number}
//                     placeholder='Enter your Number'
//                     // onChange={handleChange}
//                     required
//                   />
//                   <input
//                     type='text'
//                     name='address'
//                     className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
//                     // value={input.address}
//                     placeholder='Street Address'
//                     // onChange={handleChange}
//                     required
//                   />
//                   <input
//                     type='text'
//                     name='postalCode'
//                     className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
//                     // value={input.postalCode}
//                     placeholder='Postal Code'
//                     // onChange={handleChange}
//                     required
//                   />
//                   <input
//                     type='text'
//                     name='city'
//                     className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
//                     // value={input.city}
//                     placeholder='City'
//                     // onChange={handleChange}
//                     required
//                   />
//                 </form>
//                   {/* {!isFormValid() && (
//                   <p className="error-message">All inputs must be filled correctly.</p>
//                 )} */}
//               </div>
//               {product ? (
//                 <div key={product.id} className='mt-24'>
//                   <h1 className="text-2xl text-center flex items-center justify-center">
//                    <span className="flex-grow h-px bg-gray-800"></span>
//                    <span className="px-4">Express Checkout</span>
//                    <span className="flex-grow h-px bg-gray-800"></span>
//                 </h1>


//                   <div className='flex items-center mt-4 justify-center gap-4'>
//                     <img
//                     src='/Paypal.png' 
//                     className='w-20 h-12 transition-transform duration-200 transform hover:scale-110'
//                     alt=''
//                     />

//                     <img
//                     src='/MasterCard.jpeg' 
//                     className='w-20 h-12 transition-transform duration-200 transform hover:scale-110'
//                     alt=''
//                     />

//                     <img
//                     src='/Visa.jpeg' 
//                     className='w-20 h-12 transition-transform duration-200 transform hover:scale-110'
//                     alt=''
//                     />

//                     <img
//                     src='/Amex.png' 
//                     className='w-20 h-12 transition-transform duration-200 transform hover:scale-110'
//                     alt=''
//                     />
//                   </div>
//                   <hr className="border-black border-1 mt-5" />

//                   <div className='bg-darkBlue text-white rounded-md p-8'>
//                   <h4>Price: <span>${product.price.toFixed(2)}</span></h4>
//                   <h4 className='mt-5'>Shipping Cost:<span>${shippingCost}</span></h4>
//                   <hr className='mt-5'/>
//                   <h4 className='total'>Total cost: <span>${(product.price + shippingCost).toFixed(2)}</span></h4>
//                     <button 
//                     className='bg-orange w-[90%] mt-5 items-center justify-center rounded-lg p-3 text-white'
//                     // onClick={handlePlaceOrder}
//                     // disabled={!isFormValid()}
//                     >
//                       Place an Order
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="mt-8 text-center">No items to checkout.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       );
// }