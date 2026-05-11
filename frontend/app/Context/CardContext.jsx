"use client"

import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create the context
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [billingDetails, setBillingDetails] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for selected product

  // Load cart from localStorage if available
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);



  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);

      if (itemExists) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    toast.success('Item Added Successfully!', { position: 'bottom-left' });
  };



  const removeFromCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);
  
      if (itemExists.quantity > 1) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
  
      // If quantity is 1, remove the item from the cart
      return prevItems.filter((i) => i.id !== item.id);
    });
  
    toast.error('Item Deleted', { position: 'bottom-left' });
  };


  const clearItemCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.error('Item removed from cart', { position: 'bottom-left' });
  };


  const clearCart = () => {
    setCartItems([]); // Clear the entire cart by setting the cartItems array to an empty array
    localStorage.removeItem('cartItems'); // Optionally, clear localStorage
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearItemCart,
        clearCart,
        billingDetails, 
        setBillingDetails,
        selectedProduct, 
        setSelectedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}