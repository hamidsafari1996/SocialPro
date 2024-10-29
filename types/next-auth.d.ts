// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // اضافه کردن id به user
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // اضافه کردن id به user
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}