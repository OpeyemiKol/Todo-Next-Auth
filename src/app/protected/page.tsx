// app/protected/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // redirect to signin page
    return redirect("/api/auth/signin");
  }

  return (
    <div>
      <h2>Protected content</h2>
      <p>Welcome, {session.user?.name}</p>
    </div>
  );
}
