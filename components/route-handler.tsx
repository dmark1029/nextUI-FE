"use client";

import Sidebar from "@/app/sidebar";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "./footer";

export function RouteHandler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignInPage = pathname.includes('signin');
  return (
    <div className="relative flex flex-col h-screen">
      <div className="flex flex-grow max-h-screen">
        {!isSignInPage && <Sidebar />}
        <div className="flex flex-col w-full">
          {!isSignInPage && <Navbar />}
          <main className="container mx-auto max-w-7xl px-6 flex-grow max-h-screen overflow-auto">
            {children}
          </main>
          {!isSignInPage && <Footer />}
        </div>
      </div>
    </div>
  );
}