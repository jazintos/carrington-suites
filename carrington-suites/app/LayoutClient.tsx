'use client';

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function LayoutClient({ children }: any) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {/* ❌ HIDE NAVBAR IN ADMIN */}
      {!isAdmin && <Navbar />}

      {/* PAGE CONTENT */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* ❌ HIDE WHATSAPP + FOOTER IN ADMIN */}
      {!isAdmin && (
        <>
          <a
            href="https://wa.me/2349030009716?text=Hello%20Carrington%20Suites%20I%20would%20like%20to%20make%20a%20reservation"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-xl text-sm md:text-base font-medium transition"
          >
            WhatsApp Concierge
          </a>

          <Footer />
        </>
      )}
    </>
  );
}