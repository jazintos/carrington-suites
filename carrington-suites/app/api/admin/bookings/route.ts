import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const unitIdParam = searchParams.get("unitId");

    // ✅ Convert to number safely
    const unitId = unitIdParam ? Number(unitIdParam) : undefined;

    const bookings = await prisma.booking.findMany({
      where: unitId
        ? { unitId: unitId }
        : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        checkIn: true,
        checkOut: true,
        totalPrice: true,
        unitId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);

  } catch (error) {
    console.error("ADMIN BOOKINGS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}