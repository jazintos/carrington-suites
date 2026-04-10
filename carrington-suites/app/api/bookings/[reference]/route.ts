import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // ================= GET REFERENCE FROM URL =================
    const url = new URL(req.url);
    const reference = url.pathname.split("/").pop();

    if (!reference) {
      return NextResponse.json(
        { error: "Reference is required" },
        { status: 400 }
      );
    }

    // ================= FETCH BOOKING =================
    const booking = await prisma.booking.findUnique({
      where: { reference },
      include: {
        unit: {
          include: {
            apartmentType: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);

  } catch (error) {
    console.error("FETCH BOOKING ERROR:", error);

    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}