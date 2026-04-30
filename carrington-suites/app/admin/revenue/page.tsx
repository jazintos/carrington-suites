'use client';

import RefreshButton from "@/app/components/RefreshButton";
import { useEffect, useState } from "react";

export default function RevenuePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="p-6">Loading revenue...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl mb-6 text-[var(--carrington-gold)]">
        Revenue Overview
      </h1>
      <RefreshButton /> {/* ✅ NEW */}
    </div>
    
      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="admin-card">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl mt-2">
            ₦{(data.totalRevenue || 0).toLocaleString()}
          </h2>
        </div>

        <div className="admin-card">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <h2 className="text-2xl mt-2">
            {data.totalBookings}
          </h2>
        </div>

        <div className="admin-card">
          <p className="text-sm text-gray-500">Avg Booking Value</p>
          <h2 className="text-2xl mt-2">
            ₦{Math.round(
              (data.totalRevenue || 0) / (data.totalBookings || 1)
            ).toLocaleString()}
          </h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="admin-card">

        <h2 className="mb-4">Revenue by Booking</h2>

        <table className="w-full text-sm">

          <thead className="border-b text-left">
            <tr>
              <th className="py-2">Guest</th>
              <th>Reference</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {(data.bookings || []).map((b: any) => (
              <tr key={b.id} className="border-b">

                <td className="py-2">{b.name}</td>
                <td>{b.reference}</td>
                <td>₦{b.totalPrice}</td>
                <td>{b.status}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}