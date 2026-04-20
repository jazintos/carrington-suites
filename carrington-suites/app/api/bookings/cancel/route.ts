import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reference, bookingId } = body;

    if (!reference && !bookingId) {
      return NextResponse.json(
        { error: "Reference or bookingId required" },
        { status: 400 }
      );
    }

    let booking;

    // ✅ ADMIN FLOW (cancel by ID)
    if (bookingId) {
      booking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: "CANCELLED", // ✅ YOUR STANDARD
        },
      });
    }

    // ✅ PUBLIC FLOW (cancel by reference)
    else if (reference) {
      booking = await prisma.booking.update({
        where: { reference },
        data: {
          status: "CANCELLED", // ✅ YOUR STANDARD
        },
      });
    }

    return NextResponse.json({
      success: true,
      booking,
    });

  } catch (error) {
    console.error("CANCEL ERROR:", error);

    return NextResponse.json(
      { success: false, error: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}