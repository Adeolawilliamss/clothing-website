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
 const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number | string>("");
  const [category, setCategory] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] =
  useState<Product | null>(null);

const [updateTitle, setUpdateTitle] = useState("");
const [updateDescription, setUpdateDescription] = useState("");
const [updatePrice, setUpdatePrice] = useState<number | string>("");
const [updateCategory, setUpdateCategory] = useState("");

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
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    const res = await axiosInstance.post(
      "/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);

    // IMPORTANT:
    // match exact backend response shape
    const newProduct =
      res.data.data.product ||
      res.data.data.newProduct;

    setProducts((prev) => [
      ...prev,
      newProduct,
    ]);

    // reset form
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage(null);

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

  const handleUpdateClick = (product: Product) => {
  setSelectedProduct(product);

  setUpdateTitle(product.title);
  setUpdateDescription(product.description);
  setUpdatePrice(product.price);
  setUpdateCategory(product.category || "");

  setIsModalOpen(true);
};

const handleUpdateSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!selectedProduct) return;

  try {
    const res = await axiosInstance.patch(
      `/products/${selectedProduct._id}`,
      {
        title: updateTitle,
        description: updateDescription,
        price: updatePrice,
        category: updateCategory,
      }
    );

    setProducts((prev) =>
      prev.map((product) =>
        product._id === selectedProduct._id
          ? res.data.data.product
          : product
      )
    );

    setIsModalOpen(false);
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
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }}
  className="border p-3 rounded"
/>
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border p-3 rounded"
  required
>
  <option value="">Select Category</option>

  <option value="men's clothing">
    Men's Clothing
  </option>

  <option value="women's clothing">
    Women's Clothing
  </option>

  <option value="jewelery">
    Jewelery
  </option>

  <option value="electronics">
    Electronics
  </option>
</select>

        <button
          type="submit"
          className="bg-black text-white py-3 rounded"
        >
          Create Product
        </button>
      </form>

      {/* PRODUCTS */}
      <div className="flex flex-col gap-4">
        {products
  .filter(Boolean)
  .map((product) => (
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
                onClick={() => handleUpdateClick(product)}
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

      {isModalOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">
        Update Product
      </h2>

      <form
        onSubmit={handleUpdateSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          value={updateTitle}
          onChange={(e) =>
            setUpdateTitle(e.target.value)
          }
          className="border p-3 rounded"
        />

        <textarea
          value={updateDescription}
          onChange={(e) =>
            setUpdateDescription(e.target.value)
          }
          className="border p-3 rounded"
        />

        <input
          type="number"
          value={updatePrice}
          onChange={(e) =>
            setUpdatePrice(Number(e.target.value))
          }
          className="border p-3 rounded"
        />

        <select
          value={updateCategory}
          onChange={(e) =>
            setUpdateCategory(e.target.value)
          }
          className="border p-3 rounded"
        >
          <option value="">Select Category</option>

          <option value="men's clothing">
            Men's Clothing
          </option>

          <option value="women's clothing">
            Women's Clothing
          </option>

          <option value="jewelery">
            Jewelery
          </option>

          <option value="electronics">
            Electronics
          </option>
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded w-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}