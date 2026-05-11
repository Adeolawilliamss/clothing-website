 declare module '@iconscout/react-unicons' {
    export const UilTruck: any;
}

 declare module '@iconscout/react-unicons' {
    export const UilShoppingCart: any;
}

 declare module '@iconscout/react-unicons' {
    export const UilTimes: any;
}

  declare module '@iconscout/react-unicons' {
    export const UilUser: any;
}

  declare module '@iconscout/react-unicons' {
    export const UilBars: any;
}


declare module '@iconscout/react-unicons' {
  export const UilShoppingCartAlt: any;
}
  
// Define a type for cart items
interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
}


// Define the Product type
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}