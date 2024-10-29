import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("Received data:", { email, password });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log("User created:", user);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json({ message: 'User already exists or another error occurred' }, { status: 400 });
  }
}