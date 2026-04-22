'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";

export default function AdminLayout({ children }: any) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    // ✅ Allow login page
    if (pathname === '/admin/login') return;

    // ❌ Redirect if not logged in
    if (!token) {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  // ✅ LOGIN PAGE (NO SIDEBAR)
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white">
        {children}
      </div>
    );
  }

  return (
    <div className="admin-layout">

      {/* 🔥 SIDEBAR */}
      <aside className="admin-sidebar">

        {/* TOP SECTION */}
        <div>

          {/* ✅ LOGO + BRAND (CLEANED) */}
          <div className="mb-10">

            <Image
              src="/logo.png"
              alt="Carrington Suites"
              width={180}
              height={60}
              className="object-contain mb-4"
              priority
            />

            <h1 className="text-lg font-semibold text-[var(--carrington-navy)]">
              The Carrington Suites
            </h1>

            <p className="text-xs text-gray-500 mt-1">
              Admin Panel
            </p>

            <div className="divider" />

          </div>

          {/* 🔥 NAVIGATION WITH ACTIVE STATE */}
          <nav className="flex flex-col space-y-2 mt-6">

            <NavItem
              href="/admin/dashboard"
              label="Dashboard"
              pathname={pathname}
            />

            <NavItem
              href="/admin/bookings"
              label="Bookings"
              pathname={pathname}
            />

            <NavItem
              href="/admin/apartments"
              label="Apartments"
              pathname={pathname}
            />

            <NavItem 
            href="/admin/payments" 
            label="Payments"
            pathname={pathname}
            /> 
   
          </nav>

        </div>

        {/* 🔻 LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem('adminToken');
            router.replace('/admin/login');
          }}
          className="text-sm text-red-500 mt-6"
        >
          Sign out
        </button>

      </aside>

      {/* 🔥 MAIN CONTENT */}
      <main className="admin-main">
        {children}
      </main>

    </div>
  );
}


// 🔥 NAV ITEM COMPONENT (ACTIVE HIGHLIGHT)
function NavItem({ href, label, pathname }: any) {
  const isActive = pathname.startsWith(href);
  
  return (
    <Link
      href={href}
      className={`
        px-3 py-2 rounded-md text-sm transition
        ${isActive
          ? "bg-[var(--carrington-green)] text-white"
          : "text-gray-700 hover:bg-gray-100"}
      `}
    >
      {label}
    </Link>
  );
}