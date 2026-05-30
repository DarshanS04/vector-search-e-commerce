// components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand area */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold tracking-tight text-indigo-600 transition-colors group-hover:text-indigo-700">
              eCommerce
            </span>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 border border-indigo-100">
              AI Vector Search
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/about" 
              className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}