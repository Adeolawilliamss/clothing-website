"use client";

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import './ProductSection.css';
import { useCart } from "@/app/Context/CardContext";
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import Loading from "@/app/ui/Loading";

const categories = ['All', "men's clothing", "women's clothing", 'jewelery', 'electronics'];

export default function ProductSection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeTab, setActiveTab] = useState('All');
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((json: Product[]) => {
                setProducts(json);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const filteredProducts = activeTab === 'All' 
        ? products 
        : products.filter(product => product.category.toLowerCase() === activeTab.toLowerCase());

    // Display loading component while data is being fetched
    if (loading) {
        return <Loading />;
    }

    return (
        <div className="relative py-11 pt-12 bg-white dark:bg-black min-h-full">
            <div className="container mx-auto px-4">
                <h1 className="flex justify-center text-2xl font-extrabold text-black dark:text-white sm:text-3xl">Latest Products</h1>
                <hr className="w-full" />
                <div className="under-links mt-10">
                    <ul className="tabs flex flex-col md:flex-row mx-auto justify-center gap-2">
                        {categories.map((category, index) => (
                            <li key={index} className="list">
                                <button 
                                    className={clsx('tab-button', { 'active': activeTab === category })} 
                                    onClick={() => setActiveTab(category)}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="shadow-lg rounded">
                                <Link href={`/dashboard/products/${product.id}`}>
                                    <div className="mt-10 group flex-grow cursor-pointer">
                                        <img 
                                            src={product.image} 
                                            alt={product.title} 
                                            className="h-32 mx-auto object-contain transition-transform duration-200 transform group-hover:scale-110"
                                        />
                                    </div>
                                </Link>
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}