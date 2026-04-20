import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { bookingId, status } = await req.json();

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      updated,
    });

  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}