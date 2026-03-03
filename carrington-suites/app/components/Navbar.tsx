"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white lg:bg-white/80 lg:backdrop-blur-md border-b border-gray-200">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-8 lg:px-10 py-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Carrington Suites"
            width={220}
            height={90}
            className="w-36 sm:w-40 lg:w-auto"
            priority
          />
        </Link>

        {/* DESKTOP MENU (Large screens only) */}
        <div className="hidden lg:flex gap-10 font-medium text-sm tracking-wide items-center text-[#0B2C5F]">

          <Link href="/" className="hover:text-[#C6A85B] transition">
            HOME
          </Link>

          <Link href="/apartments" className="hover:text-[#C6A85B] transition">
            APARTMENTS
          </Link>

          <Link href="/contact" className="hover:text-[#C6A85B] transition">
            CONTACT
          </Link>

          <Link
            href="/booking"
            className="bg-[#0B2C5F] text-white px-6 py-2 hover:bg-[#C6A85B] transition"
          >
            BOOK NOW
          </Link>

        </div>

        {/* HAMBURGER (Mobile + Tablet) */}
        <button
          className="lg:hidden text-3xl text-[#0B2C5F] focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

      </div>

      {/* MOBILE + TABLET DROPDOWN */}
      {open && (
        <div className="lg:hidden bg-white shadow-xl border-t border-gray-200 px-6 sm:px-10 py-8 space-y-6 text-center">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block text-[#0B2C5F] font-semibold text-lg"
          >
            HOME
          </Link>

          <Link
            href="/apartments"
            onClick={() => setOpen(false)}
            className="block text-[#0B2C5F] font-semibold text-lg"
          >
            APARTMENTS
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-[#0B2C5F] font-semibold text-lg"
          >
            CONTACT
          </Link>

          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="block bg-[#0B2C5F] text-white py-3 mt-4 font-medium"
          >
            BOOK NOW
          </Link>

        </div>
      )}

    </nav>
  );
}