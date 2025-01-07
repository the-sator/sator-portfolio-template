import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center">
      <p>No Homepage yet lol</p>
      <Link
        href="/admin-panel"
        className="mt-4 text-blue-500 transition-all hover:underline"
      >
        Visit Admin
      </Link>
    </div>
  );
}
