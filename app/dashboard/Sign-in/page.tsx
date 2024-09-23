"use client"

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Link from 'next/link';

export default function signIn() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="bg-slate-300 dark:bg-black min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 w-full max-w-md rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-bold mb-6">Sign in to your account</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Your email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="relative mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Your password:
            </label>
            <input
  type={showPassword ? 'text' : 'password'}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
  className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
  required
/>
<span
  className="absolute right-2.5 top-14 transform -translate-y-1/2 cursor-pointer"
  onClick={toggleShowPassword}
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
            <label htmlFor="checkbox">
            <input type="checkbox" id="checkbox" className="mr-2" />
             Remember Me?
              </label>
              </div>
              <div>
              <span className="cursor-pointer text-blue-500">Forgot Password</span>
              </div>
          </div>

          <Link 
          href="/dashboard">
            <button className="rounded-md mb-8 w-full h-12 mt-4 bg-blue-500 text-white text-lg md:text-xl" type='submit'> 
            Sign In
            </button>
          </Link>

          <div className="flex items-center space-x-1">
  <p className="text-sm font-light text-gray-500">Don't have an account yet?</p>
  <p className="font-bold">Sign Up!</p>
</div>
        </form>
      </div>
    </div>
  )
}
