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
        </div>
      ))}
    </div>
  );
}
