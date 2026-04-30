'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RefreshButton from "@/app/components/RefreshButton"; 


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p className="p-6">Loading dashboard...</p>;

  const totalRevenue = data.totalRevenue || 0;
  const totalBookings = data.totalBookings || 0;

  // 🔥 STATUS DATA (FIXED)
  const statusData = [
    { name: "Pending", value: data.pending || 0, color: "#C6A85B" },
    { name: "Confirmed", value: data.confirmed || 0, color: "#3F6A64" },
    { name: "Cancelled", value: data.cancelled || 0, color: "#EF4444" },
    { name: "Completed", value: data.completed || 0, color: "#6B7280" },
  ].filter(s => s.value > 0); // remove empty slices

  // 🔥 STATUS BADGE
  const getStatusBadge = (status: string) => {
    const s = status?.toUpperCase();

    if (s === "PENDING")
      return "bg-yellow-100 text-yellow-700";

    if (s === "CONFIRMED")
      return "bg-green-100 text-green-700";

    if (s === "CANCELLED")
      return "bg-red-100 text-red-700";

    if (s === "COMPLETED")
      return "bg-gray-200 text-gray-700";

    return "bg-gray-100";
  };

  return (
    <div>

    <div className="flex items-center justify-between mb-6">
      {/* TITLE */}
      <h1 className="text-2xl mb-6 text-[var(--carrington-gold)]">
        Dashboard
      </h1>
      
      <RefreshButton /> {/* ✅ NEW */}

    </div>

      {/* KPI CARDS (CLICKABLE) */}
      <div className="grid md:grid-cols-4 gap-6">

        <div
          onClick={() => router.push("/admin/bookings")}
          className="admin-card cursor-pointer hover:shadow-lg"
        >
          <p className="text-sm text-gray-500">Total Bookings</p>
          <h2 className="text-2xl mt-2">{totalBookings}</h2>
        </div>

        <div
          onClick={() => router.push("/admin/revenue")}
          className="admin-card cursor-pointer hover:shadow-lg"
        >
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-2xl mt-2">
            ₦{totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div
          onClick={() => router.push("/admin/bookings?status=PENDING")}
          className="admin-card cursor-pointer hover:shadow-lg"
        >
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="text-2xl mt-2">{data.pending || 0}</h2>
        </div>

        <div
          onClick={() => router.push("/admin/bookings?status=CONFIRMED")}
          className="admin-card cursor-pointer hover:shadow-lg"
        >
          <p className="text-sm text-gray-500">Confirmed</p>
          <h2 className="text-2xl mt-2">{data.confirmed || 0}</h2>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">

        {/* REVENUE */}
        <div className="admin-card">
          <h2 className="mb-4">Monthly Revenue</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.revenueChart || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* STATUS PIE */}
        <div className="admin-card">
          <h2 className="mb-4">Booking Status</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* RECENT BOOKINGS */}
      <div className="mt-10">

        <h2 className="text-lg mb-4">Recent Bookings</h2>

        <div className="admin-card space-y-3">

          {(data.bookings || []).slice(0, 5).map((b: any) => (
            <div
              key={b.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{b.name}</p>
                <p className="text-sm text-gray-500">
                  {b.reference} • ₦{b.totalPrice}
                </p>
              </div>

              {/* 🔥 STATUS BADGE */}
              <span className={`px-2 py-1 text-xs rounded ${getStatusBadge(b.status)}`}>
                {b.status}
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}