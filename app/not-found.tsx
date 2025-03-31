"use client";

import { Button } from "@heroui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-500 mb-4">Oops! Page not found.</p>
      <Link href="/">
        <Button className="mt-4" color="primary">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
