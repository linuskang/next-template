"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
      <p>You are being signed out. If you are not redirected, <a href="/">click here</a>.</p>
    </main>
  );
}
