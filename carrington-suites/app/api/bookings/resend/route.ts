import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  const { reference } = await req.json();

  const booking = await prisma.booking.findUnique({
    where: { reference },
    include: {
      unit: {
        include: { apartmentType: true },
      },
    },
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await sendBookingConfirmationEmail(booking);

  return NextResponse.json({ success: true });
}