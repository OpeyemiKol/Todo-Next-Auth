"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import AuthButton from "../../components/AuthButton";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return null;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {session.user?.name ?? session.user?.email}
        </h1>

        <div className="flex gap-4">
          <Link
            href="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Home
          </Link>
          <AuthButton />
        </div>
      </header>

      <div className="mt-4">
        <p>Your dashboard content goes here...</p>
      </div>
    </div>
  );
}
