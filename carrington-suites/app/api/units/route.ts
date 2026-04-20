import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const units = await prisma.unit.findMany({
      include: {
        bookings: true,
      },
    });

    const enrichedUnits = units.map((unit) => {
      let status = "available";
      let activeBooking = null;

      for (const b of unit.bookings) {
        if (!b.status) continue;

        const s = b.status.toLowerCase();

        if (s === "confirmed") {// || s === "completed") {
          status = "occupied";
          activeBooking = b;
          break;
        }
      }

      return {
        id: unit.id,
        name: unit.name,
        status,
        activeBooking,
      };
    });

    return NextResponse.json(enrichedUnits);

  } catch (error) {
    console.error("UNITS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load units" },
      { status: 500 }
    );
  }
}