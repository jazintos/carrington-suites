import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ Define allowed status types
type StatusKey = "pending" | "confirmed" | "cancelled" | "completed";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany();

    console.log("BOOKINGS DATA:", bookings);

    const totalBookings = bookings.length;

    const totalRevenue = bookings.reduce(
      (sum, b) => sum + (b.totalPrice || 0),
      0
    );

    // ✅ Strongly typed status object
    const statusCount: Record<StatusKey, number> = {
      pending: 0,
      confirmed: 0,
      cancelled: 0,
      completed: 0,
    };

    bookings.forEach((b) => {
      if (!b.status) return;

      const status = String(b.status).toLowerCase();

      // ✅ Safe check before increment
      if (status in statusCount) {
        statusCount[status as StatusKey]++;
      }
    });

    // 📊 Monthly Revenue
    const monthlyRevenue: Record<string, number> = {};

    bookings.forEach((b) => {
      if (!b.createdAt) return;

      const month = new Date(b.createdAt).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyRevenue[month]) {
        monthlyRevenue[month] = 0;
      }

      monthlyRevenue[month] += b.totalPrice || 0;
    });

    const revenueChart = Object.entries(monthlyRevenue).map(
      ([month, value]) => ({
        month,
        revenue: value,
      })
    );

        // 🔥 OCCUPANCY CALCULATION

const totalUnits = await prisma.unit.count();

const activeBookings = bookings.filter((b) => {
  if (!b.status) return false;

  const status = String(b.status).toLowerCase();

  return status === "confirmed" || status === "completed";
});

const occupiedUnits = new Set(
  activeBookings.map((b) => b.unitId)
).size;

const occupancyRate =
  totalUnits === 0
    ? 0
    : Math.round((occupiedUnits / totalUnits) * 100);

    return NextResponse.json({
      totalBookings,
      totalRevenue,
      pending: statusCount.pending,
      confirmed: statusCount.confirmed,
      cancelled: statusCount.cancelled,
      completed: statusCount.completed,
      revenueChart,
      bookings,
      occupancyRate,
    });

  } catch (error) {
    console.error("DASHBOARD API ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}