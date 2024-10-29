"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from 'next/link';

export default function SignupForm() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [error, setError] = useState<string | null>(null);
      const [showPassword, setShowPassword] = useState(false);
      const router = useRouter();

      const handleSignup = async (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);

            if (password !== confirmPassword) {
                  setError("Passwords do not match.");
                  return;
            }

            try {
                  await axios.post("/api/auth/nextauth", { email, password });
                  router.push("/login");
            } catch (err) {
                  setError("Error signing up, please try again.");
            }
      };

      return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                  <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                        <h1 className="text-2xl font-bold text-center mb-4">Sign up</h1>
                        <div className="flex justify-center space-x-2 text-sm mb-6">
                              <p className="text-center">
                                    Already have an account?{" "}
                              </p>
                              <div className="text-blue-500 hover:underline">
                                    <Link href="/login">
                                          Click here to sign up
                                    </Link>
                              </div>
                        </div>
                        <form onSubmit={handleSignup} className="space-y-4">
                              <div>
                                    <input
                                          type="email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          placeholder="Enter email"
                                          required
                                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                          We'll never share your email with anyone else.
                                    </p>
                              </div>
                              <div className="relative">
                                    <input
                                          type={showPassword ? "text" : "password"}
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          placeholder="Enter new password"
                                          required
                                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                          type="button"
                                          onClick={() => setShowPassword(!showPassword)}
                                          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    >
                                          {/* آیکون چشم برای نمایش یا مخفی کردن رمز */}
                                          {showPassword ? (
                                                <svg
                                                      className="w-5 h-5"
                                                      fill="currentColor"
                                                      viewBox="0 0 20 20"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                >
                                                      <path
                                                            fillRule="evenodd"
                                                            d="M10 3a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7zM3.055 10A7.963 7.963 0 0110 5a7.963 7.963 0 016.945 5 7.963 7.963 0 01-6.945 5 7.963 7.963 0 01-6.945-5z"
                                                            clipRule="evenodd"
                                                      />
                                                      <path d="M9 12a1 1 0 102 0V8a1 1 0 10-2 0v4z" />
                                                </svg>
                                          ) : (
                                                <svg
                                                      className="w-5 h-5"
                                                      fill="currentColor"
                                                      viewBox="0 0 20 20"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                >
                                                      <path
                                                            fillRule="evenodd"
                                                            d="M10 3a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7zM3.055 10A7.963 7.963 0 0110 5a7.963 7.963 0 016.945 5 7.963 7.963 0 01-6.945 5 7.963 7.963 0 01-6.945-5z"
                                                            clipRule="evenodd"
                                                      />
                                                </svg>
                                          )}
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1">Write your password...</p>
                              </div>
                              <div>
                                    <input
                                          type="password"
                                          value={confirmPassword}
                                          onChange={(e) => setConfirmPassword(e.target.value)}
                                          placeholder="Confirm password"
                                          required
                                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                              </div>
                              <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <label className="text-sm">Keep me signed in</label>
                              </div>
                              <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition"
                              >
                                    Sign me up
                              </button>
                              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </form>
                        <footer className="text-center text-gray-500 text-sm mt-6">
                              ©2024 Kosonline. All rights reserved
                        </footer>
                  </div>
            </div>
      );
}