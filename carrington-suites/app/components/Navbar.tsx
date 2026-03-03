"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-gray-200
      ${scrolled ? "bg-white shadow-md py-3" : "bg-white lg:bg-white/80 lg:backdrop-blur-md py-5 lg:py-6"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-8 lg:px-12">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Carrington Suites"
            width={300}
            height={120}
            className={`h-auto transition-all duration-300 ${
              scrolled ? "w-40 sm:w-44 lg:w-48" : "w-44 sm:w-52 lg:w-60"
            }`}
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex gap-12 font-medium text-sm tracking-wider items-center text-[#0B2C5F]">
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
            className="bg-[#0B2C5F] text-white px-8 py-3 hover:bg-[#C6A85B] transition"
          >
            BOOK NOW
          </Link>
        </div>

        {/* HAMBURGER */}
        <button
          className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <span
            className={`absolute w-8 h-0.5 bg-[#0B2C5F] transition-all duration-300 ${
              open ? "rotate-45" : "-translate-y-2"
            }`}
          ></span>
          <span
            className={`absolute w-8 h-0.5 bg-[#0B2C5F] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`absolute w-8 h-0.5 bg-[#0B2C5F] transition-all duration-300 ${
              open ? "-rotate-45" : "translate-y-2"
            }`}
          ></span>
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white shadow-xl border-t border-gray-200 px-6 sm:px-10 py-10 space-y-8 text-center">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block text-[#0B2C5F] font-semibold text-xl"
          >
            HOME
          </Link>

          <Link
            href="/apartments"
            onClick={() => setOpen(false)}
            className="block text-[#0B2C5F] font-semibold text-xl"
          >
            APARTMENTS
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-[#0B2C5F] font-semibold text-xl"
          >
            CONTACT
          </Link>

          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="block bg-[#0B2C5F] text-white py-4 mt-4 font-medium"
          >
            BOOK NOW
          </Link>

        </div>
      </div>
    </nav>
  );
}