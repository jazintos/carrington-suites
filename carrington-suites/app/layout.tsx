import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Playfair_Display, Inter } from "next/font/google";

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
    "Carrington Suites offers luxury private executive residences in Victoria Island, Lagos. Experience refined comfort and elegant living.",
  keywords: [
    "Luxury apartments Victoria Island",
    "Short stay luxury Lagos",
    "Executive residences Lagos",
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

        {/* Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="min-h-screen">
          {children}
        </main>

        <a
  href="https://wa.me/2349030009716?text=Hello%20Carrington%20Suites%20I%20would%20like%20to%20make%20a%20reservation"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-8 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-xl text-sm md:text-base font-medium transition"
>
  WhatsApp Concierge
</a>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}