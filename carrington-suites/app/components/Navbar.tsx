"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">

        <Link href="/">
          <Image
            src="/logo.png"
            alt="Carrington Suites"
            width={200}
            height={80}
            className="w-40 md:w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 font-medium text-sm tracking-wide items-center">

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
            className="bg-[#0B2C5F] text-white px-5 py-2 hover:bg-[#C6A85B] transition"
          >
            BOOK NOW
          </Link>

        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-6 space-y-4 text-center">

          <Link href="/" onClick={() => setOpen(false)}>HOME</Link>
          <Link href="/apartments" onClick={() => setOpen(false)}>APARTMENTS</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>CONTACT</Link>
          <Link href="/booking" onClick={() => setOpen(false)} className="block bg-[#0B2C5F] text-white py-2 mt-4">
            BOOK NOW
          </Link>

        </div>
      )}

    </nav>
  );
}