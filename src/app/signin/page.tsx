"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-900 to-purple-700 text-white px-6">
      <h1 className="text-3xl font-bold mb-6">Welcome Back 👋</h1>
      <p className="text-lg mb-8 text-blue-100">Sign in to access your Todos</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-sm"
      >
        <div className="flex flex-col gap-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full p-3 bg-transparent border-b-2 border-blue-300 text-white placeholder-transparent focus:outline-none focus:border-yellow-400 transition-all"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-3 text-blue-200 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-300 peer-focus:top-0 peer-focus:text-yellow-400 peer-focus:text-sm"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full p-3 bg-transparent border-b-2 border-blue-300 text-white placeholder-transparent focus:outline-none focus:border-yellow-400 transition-all"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-3 text-blue-200 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-300 peer-focus:top-0 peer-focus:text-yellow-400 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          {error && (
            <p className="text-red-400 text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-400 text-blue-900 font-semibold px-8 py-3 rounded-full hover:bg-yellow-500 transition-all duration-300"
          >
            Sign In
          </button>
        </div>

        <p className="text-sm text-center mt-4 text-blue-200">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-yellow-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>

      <footer className="absolute bottom-4 text-sm text-blue-200">
        Crafted with 💡 by{" "}
        <span className="font-semibold text-white">Opeyemi</span>
      </footer>
    </div>
  );
}
