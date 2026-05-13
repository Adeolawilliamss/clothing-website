"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/app/ui/axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        setUsers(res.data.data.users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-white text-black pt-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      {users.map((user: any) => (
        <div
          key={user._id}
          className="border p-4 mb-3 flex justify-between items-center"
        >
          <div>
            <p>{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
