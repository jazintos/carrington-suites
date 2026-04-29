import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Playfair_Display, Inter } from "next/font/google";
import LayoutClient from "./LayoutClient"; // ✅ NEW

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The Carrington Suites | Private Luxury Residences",
  description:
    "Carrington Suites offers luxury private residences in Victoria Island, Lagos. Experience refined comfort and elegant living.",
  keywords: [
    "Luxury apartments Victoria Island",
    "Short stay luxury Lagos",
    "Signature residences Lagos",
    "Carrington Suites",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
        ${inter.variable} 
        ${playfair.variable}
        font-sans 
        bg-[#F8F6F2] 
        text-[#111111]
        antialiased
        `}
      >
        {/* ✅ CLIENT WRAPPER HANDLES ADMIN VS PUBLIC */}
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}