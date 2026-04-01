import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  const rawBody = await req.text(); // IMPORTANT: raw body
  const signature = (await headers()).get("x-paystack-signature");

  // Generate hash
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(rawBody)
    .digest("hex");

  // 🔐 Verify request is from Paystack
  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  // Only handle successful payments
  if (event.event === "charge.success") {
    const payment = event.data;
    const reference = payment.reference;

    const booking = await prisma.booking.findUnique({
      where: { reference },
    });

    if (!booking) {
      return NextResponse.json({ ok: true });
    }

    // 🧠 Prevent duplicate processing
    if (booking.status === "CONFIRMED") {
      return NextResponse.json({ ok: true });
    }

    const isAmountValid = payment.amount / 100 === booking.totalPrice;

    if (isAmountValid) {
      await prisma.booking.update({
        where: { reference },
        data: {
          status: "CONFIRMED",
          paidAt: new Date(),
          paymentData: payment,
        },
      });
    } else {
      await prisma.booking.update({
        where: { reference },
        data: {
          status: "FAILED",
          paymentData: payment,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}