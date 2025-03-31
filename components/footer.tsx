"use client";
import React, { useEffect, useState } from "react";
import { Link } from "@heroui/react";

export const Footer = () => {
  const [isSignInPage, setIsSignInPage] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;

    setIsSignInPage(pathname.includes("signin"));
  }, []);

  if (isSignInPage) {
    return null;
  }

  return (
    <footer className="w-full flex items-center justify-center py-3 mt-auto shrink-0">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://heroui.com?utm_source=next-app-template"
        title="heroui.com homepage"
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">HeroUI</p>
      </Link>
    </footer>
  );
};
