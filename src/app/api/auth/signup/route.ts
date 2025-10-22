// app/api/auth/signup/route.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // safer for TS
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Define a type for creating a new user
type NewUser = {
  name: string | null;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
      } as NewUser, // ✅ Type assertion fixes TS error
    });

    return NextResponse.json({ message: "User created", userId: user.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
