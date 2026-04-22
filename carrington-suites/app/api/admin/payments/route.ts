import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 🔥 1. FETCH FROM PAYSTACK
    const res = await fetch(
      "https://api.paystack.co/transaction?perPage=50",
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Paystack error:", data);
      return NextResponse.json(
        { error: "Failed to fetch transactions" },
        { status: 500 }
      );
    }

    const transactions = data.data || [];

    // 🔥 2. EXTRACT REFERENCES
    const references = transactions.map((t: any) => t.reference);

    // 🔥 3. FETCH MATCHING BOOKINGS FROM DB
    const bookings = await prisma.booking.findMany({
      where: {
        reference: {
          in: references,
        },
      },
      select: {
        reference: true,
        name: true,
        email: true,
      },
    });

    // 🔥 4. CREATE LOOKUP MAP
    const bookingMap = new Map(
      bookings.map((b) => [b.reference, b])
    );

    // 🔥 5. MERGE PAYSTACK + DB DATA
    const merged = transactions.map((t: any) => {
      const booking = bookingMap.get(t.reference);

      return {
        ...t,
        bookingName: booking?.name || null,
        bookingEmail: booking?.email || t.customer?.email || null,
      };
    });

    return NextResponse.json(merged);

  } catch (error) {
    console.error("PAYMENTS API ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}