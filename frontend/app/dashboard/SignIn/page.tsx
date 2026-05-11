"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axiosInstance from "@/app/ui/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAlert } from "@/app/Context/AlertContext";

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();
  const { showAlert } = useAlert();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      const user = res.data.data.user;

      if (res.data.status === "success") {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("role", user.role);
        showAlert("success", "Login successful!");

        router.push("/dashboard");
      }
    } catch (error) {
      showAlert("error", "Invalid email or password!");
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-300 dark:bg-black min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 w-full max-w-md rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-bold mb-6">
          Sign in to your account
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-md font-medium">
              Your email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-lg bg-gray-50 border rounded-lg w-full p-3"
              required
            />
          </div>

          <div className="relative mb-6">
            <label className="block mb-2 text-md font-medium">
              Your password:
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-lg bg-gray-50 border rounded-lg w-full p-3"
              required
            />

            <span
              className="absolute right-3 top-12 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            className="rounded-md w-full h-12 bg-blue-500 text-white text-lg"
            type="submit"
          >
            Sign In
          </button>

          <div className="mt-4 text-sm text-gray-500">
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
