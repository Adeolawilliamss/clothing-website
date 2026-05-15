  // Define a type for cart items
export interface CartItem {
  _id: string | number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Product {
  _id: string | number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}