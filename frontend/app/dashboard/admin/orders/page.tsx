"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/app/ui/axios";

export default function Orders() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosInstance.get("/payments");
        setPayments(res.data.data.payments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPayments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/payments/${id}`);
      setPayments((prev) => prev.filter((payment) => payment._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await axiosInstance.patch(`/payments/${id}`, {
        name: "Updated Name",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white text-black pt-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Payments</h1>

      {payments.map((payment: any) => (
        <div
          key={payment._id}
          className="border p-4 mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-bold">
              {payment.billingDetails?.name || "No Name"}
            </p>

            <p className="text-sm text-gray-500">
              {payment.billingDetails?.email || "No Email"}
            </p>

            <p className="text-sm">₦{payment.amount}</p>

            <p className="text-sm">Status: {payment.status}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleDelete(payment._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

            <button
              onClick={() => handleUpdate(payment._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Update
            </button>
          </div>
        </div>
      ))}
      {payments.map((payment: any) => (
        <div
          key={payment._id}
          className="border p-4 mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-bold">
              {payment.billingDetails?.name || "No Name"}
            </p>

            <p className="text-sm text-gray-500">
              {payment.billingDetails?.email || "No Email"}
            </p>

            <p className="text-sm">₦{payment.amount}</p>

            <p className="text-sm">Status: {payment.status}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleDelete(payment._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

            <button
              onClick={() => handleUpdate(payment._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
