import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reference } = body;

    if (!reference) {
      return NextResponse.json(
        { error: "Booking reference is required" },
        { status: 400 }
      );
    }

    // ================= FETCH BOOKING =================
    const booking = await prisma.booking.findUnique({
      where: { reference },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // ================= TEST MODE =================
    const TEST_MODE = true;

    const amount = TEST_MODE
      ? 1000 // ₦10 (Paystack uses kobo)
      : booking.totalPrice * 100;

    // ================= PAYSTACK REQUEST =================
    const paystackRes = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: booking.email,
          amount,
          reference: booking.reference,
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/verify`,
          metadata: {
            bookingId: booking.id,
          },
        }),
      }
    );

    const data = await paystackRes.json();

    if (!data.status) {
      return NextResponse.json(
        { error: "Payment initialization failed" },
        { status: 500 }
      );
    }

    // ================= RESPONSE =================
    return NextResponse.json({
      paymentUrl: data.data.authorization_url,
    });

  } catch (error) {
    console.error("PAYMENT ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}