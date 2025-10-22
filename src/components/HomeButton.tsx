// components/HomeButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="bg-yellow-400 text-blue-900 p-2 rounded hover:bg-yellow-500 transition"
    >
      Home
    </button>
  );
}
