"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/app/ui/axios";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [category, setCategory] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");

        setProducts(res.data.data.products);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // Create product
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/products", {
        title,
        description,
        price,
        category,
      });

      setProducts((prev) => [...prev, res.data.data.product]);

      // reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");

      alert("Product created!");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/products/${id}`);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Update product
  const handleUpdate = async (id: string) => {
    try {
      const res = await axiosInstance.patch(`/products/${id}`, {
        title: "Updated Product",
      });

      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? res.data.data.product : product
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white text-black pt-20 min-h-screen">
    <h1 className="text-2xl font-bold mb-4">All Payments</h1>

      {/* CREATE PRODUCT */}
      <form
        onSubmit={handleCreate}
        className="border p-6 rounded-lg mb-10 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">Add Product</h2>

        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded"
          required
        />

        <textarea
          placeholder="Product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white py-3 rounded"
        >
          Create Product
        </button>
      </form>

      {/* PRODUCTS */}
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-lg">
                {product.title}
              </h2>

              <p className="text-gray-600">
                {product.description}
              </p>

              <p className="font-semibold mt-2">
                ₦{product.price}
              </p>

              {product.category && (
                <p className="text-sm text-gray-500">
                  {product.category}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleUpdate(product._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}