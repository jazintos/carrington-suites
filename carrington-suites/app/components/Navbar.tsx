"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resOpen, setResOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 
      ${scrolled
        ? "bg-white shadow-md py-3"
        : "bg-white/70 backdrop-blur-lg py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 lg:px-16">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Carrington Suites"
            width={320}
            height={120}
            priority
            className={`transition-all duration-500 ${
              scrolled ? "w-40 md:w-44" : "w-48 md:w-56"
            }`}
          />
        </Link>


        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-12 text-sm tracking-widest text-[#0B2C5F] font-medium">

          <Link
            href="/"
            className="hover:text-[#3F6A64] transition duration-300"
          >
            HOME
          </Link>


          {/* RESIDENCES DROPDOWN */}
          <div className="relative group">

            <Link
              href="/apartments"
              className="hover:text-[#3F6A64] transition duration-300"
            >
              RESIDENCES
            </Link>

            <div className="absolute left-0 top-full mt-4 hidden group-hover:block bg-white shadow-xl rounded-lg overflow-hidden min-w-[220px] border">

              <Link
                href="/apartments/executive"
                className="block px-6 py-3 text-sm hover:bg-gray-50"
              >
                Executive Residence
              </Link>

              <Link
                href="/apartments/premium"
                className="block px-6 py-3 text-sm hover:bg-gray-50"
              >
                Premium Residence
              </Link>

              <Link
                href="/apartments/signature"
                className="block px-6 py-3 text-sm hover:bg-gray-50"
              >
                Signature Residence
              </Link>

            </div>

          </div>


          <Link
            href="/gallery"
            className="hover:text-[#3F6A64] transition duration-300"
          >
            GALLERY
          </Link>

          <Link
            href="/contact"
            className="hover:text-[#3F6A64] transition duration-300"
          >
            CONTACT
          </Link>

          <Link
            href="/booking"
            className="ml-4 border border-[#3F6A64] text-[#3F6A64] px-8 py-3 tracking-widest hover:bg-[#3F6A64] hover:text-white transition duration-300"
          >
            RESERVE
          </Link>

        </div>


        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1"
          aria-label="Toggle Menu"
        >

          <span
            className={`w-7 h-[2px] bg-[#3F6A64] transition ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>

          <span
            className={`w-7 h-[2px] bg-[#3F6A64] transition ${
              open ? "opacity-0" : ""
            }`}
          ></span>

          <span
            className={`w-7 h-[2px] bg-[#3F6A64] transition ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>

        </button>

      </div>


      {/* MOBILE MENU */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >

        <div className="bg-white border-t border-gray-200 px-6 py-10 text-center space-y-8">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block text-xl font-medium text-[#0B2C5F]"
          >
            Home
          </Link>


          {/* MOBILE RESIDENCES SUBMENU */}
          <div>

            <button
              onClick={() => setResOpen(!resOpen)}
              className="block w-full text-xl font-medium text-[#0B2C5F]"
            >
              Residences
            </button>

            {resOpen && (
              <div className="mt-4 space-y-4 text-lg text-gray-700">

                <Link
                  href="/apartments/executive"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  Executive Residence
                </Link>

                <Link
                  href="/apartments/premium"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  Premium Residence
                </Link>

                <Link
                  href="/apartments/signature"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  Signature Residence
                </Link>

              </div>
            )}

          </div>


          <Link
            href="/gallery"
            onClick={() => setOpen(false)}
            className="block text-xl font-medium text-[#0B2C5F]"
          >
            Gallery
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-xl font-medium text-[#0B2C5F]"
          >
            Contact
          </Link>

          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className="inline-block border border-[#3F6A64] text-[#3F6A64] px-10 py-4 mt-4 hover:bg-[#3F6A64] hover:text-white transition"
          >
            Reserve Your Stay
          </Link>

        </div>

      </div>

    </nav>
  );
}