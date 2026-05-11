export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const fallbackProducts: Product[] = [
  {
    id: 1,
    title: "Casual T-Shirt",
    price: 25.99,
    image: "randomPhotos/random1.jpg",
    category: "men's clothing",
    description: "A simple casual t-shirt",
  },
  {
    id: 2,
    title: "Women's Jacket",
    price: 59.99,
    image: "randomPhotos/random2.jpg",
    category: "women's clothing",
    description: "Stylish women's jacket",
  },
  {
    id: 3,
    title: "Gold Necklace",
    price: 120.0,
    image: "randomPhotos/random3.jpg",
    category: "jewelery",
    description: "Elegant gold necklace",
  },
  {
    id: 4,
    title: "Smartphone",
    price: 299.99,
    image: "randomPhotos/random4.jpg",
    category: "electronics",
    description: "Modern smartphone device",
  },
  {
    id: 5,
    title: "Casual T-Shirt",
    price: 25.99,
    image: "randomPhotos/random5.jpg",
    category: "men's clothing",
    description: "A simple casual t-shirt",
  },
  {
    id: 6,
    title: "Women's Jacket",
    price: 59.99,
    image: "randomPhotos/random6.jpg",
    category: "women's clothing",
    description: "Stylish women's jacket",
  },
  {
    id: 7,
    title: "Gold Necklace",
    price: 120.0,
    image: "randomPhotos/random7.jpg",
    category: "jewelery",
    description: "Elegant gold necklace",
  },
  {
    id: 8,
    title: "Smartphone",
    price: 299.99,
    image: "randomPhotos/random8.jpg",
    category: "electronics",
    description: "Modern smartphone device",
  },
  {
    id: 9,
    title: "Casual T-Shirt",
    price: 25.99,
    image: "randomPhotos/random9.jpg",
    category: "men's clothing",
    description: "A simple casual t-shirt",
  },
  {
    id: 10,
    title: "Women's Jacket",
    price: 59.99,
    image: "randomPhotos/random10.jpg",
    category: "women's clothing",
    description: "Stylish women's jacket",
  },
  {
    id: 11,
    title: "Gold Necklace",
    price: 120.0,
    image: "randomPhotos/random11.jpg",
    category: "jewelery",
    description: "Elegant gold necklace",
  },
  {
    id: 12,
    title: "Smartphone",
    price: 299.99,
    image: "randomPhotos/random12.jpg",
    category: "electronics",
    description: "Modern smartphone device",
  },
];

export default fallbackProducts;