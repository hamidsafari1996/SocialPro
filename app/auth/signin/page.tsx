"use client";  // این صفحه کلاینت‌ساید است

import { signIn } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
      const [error, setError] = useState("");
      const router = useRouter();
      // اینجا از useRouter استفاده می‌کنیم

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const username = (e.currentTarget.elements.namedItem('username') as HTMLInputElement).value;
            const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

            const result = await signIn("credentials", {
                  redirect: false,  // از redirect: false استفاده می‌کنیم
                  username,
                  password,
            });
            console.log("Login result:", result);
            if (result?.ok) {
                  // اگر ورود موفقیت آمیز بود، کاربر به صفحه تنظیمات هدایت می‌شود
                  router.push("/settings");
            } else {
                  setError("Invalid username or password");
            }
      };

      return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h1 className="text-2xl mb-6 text-center">Sign In</h1>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <div className="mb-4">
                              <label htmlFor="username" className="block text-sm">Username</label>
                              <input type="text" id="username" name="username" className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="password" className="block text-sm">Password</label>
                              <input type="password" id="password" name="password" className="w-full p-2 border rounded" />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Sign In</button>
                  </form>
            </div>
      );
}