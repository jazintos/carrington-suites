import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.redirect(new URL("/booking-failed", req.url));
  }

  const booking = await prisma.booking.findUnique({
    where: { reference },
  });

  if (!booking) {
    return NextResponse.redirect(new URL("/booking-failed", req.url));
  }

  if (booking.status === "CONFIRMED") {
    return NextResponse.redirect(
      new URL(`/booking-success?reference=${reference}`, req.url)
    );
  }

  if (booking.status === "FAILED") {
    return NextResponse.redirect(
      new URL(`/booking-failed?reference=${reference}`, req.url)
    );
  }

  // ⏳ Pending fallback
  return NextResponse.redirect(
    new URL(`/booking-pending?reference=${reference}`, req.url)
  );
}