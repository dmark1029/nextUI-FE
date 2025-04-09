"use client";

import { usePathname } from "next/navigation";

import { Footer } from "./footer";

import Sidebar from "@/app/sidebar";
import { Navbar } from "@/components/navbar";

export function RouteHandler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignInPage = pathname.includes("signin");

  return (
    <div className="relative flex flex-col h-screen">
      <div className="flex flex-grow max-h-screen">
        {!isSignInPage && <Sidebar />}
        <div className="flex flex-col w-full">
          {!isSignInPage && <Navbar />}
          <main className="container mx-auto max-w-7xl flex-grow max-h-screen overflow-auto">
            {children}
          </main>
          {!isSignInPage && <Footer />}
        </div>
      </div>
    </div>
  );
}
