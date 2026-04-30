'use client';

import RefreshButton from "@/app/components/RefreshButton";
import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();

      if (Array.isArray(data)) {
        setPayments(data);
      } else {
        console.error("Invalid payments data:", data);
      }
    } catch (err) {
      console.error("Payments error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading payments...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl mb-6 text-[var(--carrington-gold)]">
        Payments (Directly Form Paystack)
      </h1>
      <RefreshButton /> {/* ✅ NEW */}
    </div>

      <div className="admin-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-left">
            <tr>
              <th className="py-2">Customer</th>
              <th>Email</th>
              <th>Reference</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.bookingName  || "-"}</td>
                <td>{p.bookingEmail}</td>
                <td className="font-mono text-xs">{p.reference}</td>
                <td>₦{(p.amount / 100).toLocaleString()}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      p.status === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>
                  {new Date(p.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}