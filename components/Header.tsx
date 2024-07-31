"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="bg-slate-800 text-white sticky top-0 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Dashboard
        </Link>
        {status === "authenticated" ? (
          <button onClick={() => signOut({ callbackUrl: "/" })}>Signout</button>
        ) : (
          <button onClick={() => signIn("github")}>Sign In</button>
        )}
      </div>
    </header>
  );
}
