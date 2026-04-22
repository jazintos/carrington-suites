export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = (await headers()).get("x-paystack-signature");

  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret) {
    return NextResponse.json(
      { error: "Missing Paystack secret" },
      { status: 500 }
    );
  }

  const hash = crypto
    .createHmac("sha512", secret)
    .update(rawBody)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const payment = event.data;
    const reference = payment.reference;

    const booking = await prisma.booking.findUnique({
      where: { reference },
    });

    if (!booking) return NextResponse.json({ ok: true });

    // 🔥 PREVENT DOUBLE PROCESSING
    if (booking.paymentStatus === "PAID") {
      return NextResponse.json({ ok: true });
    }

    const TEST_MODE = true;

    const isAmountValid = TEST_MODE
      ? true
      : payment.amount / 100 === booking.totalPrice;

    if (isAmountValid) {

      // 🔥 UPDATE BOOKING (RECONCILED)
      const updatedBooking = await prisma.booking.update({
        where: { reference },
        data: {
          status: "CONFIRMED",
          paymentStatus: "PAID",            // ✅ NEW
          paidAt: new Date(),               // ✅ KEEP
          paymentRef: reference,            // ✅ NEW
          paymentData: JSON.stringify(payment),
        },
      });

      // 🔥 SEND EMAIL (FIXED)
      await sendBookingConfirmationEmail(updatedBooking);

    } else {

      await prisma.booking.update({
        where: { reference },
        data: {
          status: "FAILED",
          paymentStatus: "FAILED",          // ✅ NEW
          paymentData: JSON.stringify(payment),
        },
      });

    }
  }

  return NextResponse.json({ received: true });
}