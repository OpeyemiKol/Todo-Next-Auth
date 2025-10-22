// components/AuthButton.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <button disabled>Loading...</button>;

  if (!session) {
    return (
      <button
        onClick={() => router.push("/login")} // redirect to login page
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Sign in
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span>Hi, {session.user?.name ?? session.user?.email}</span>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
      >
        Sign out
      </button>
    </div>
  );
}
