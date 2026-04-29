export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      apartment,
      checkin,
      checkout,
      notes,
    } = body;

    // ================= VALIDATION =================
    if (!name || !email || !apartment || !checkin || !checkout) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const today = new Date();
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);

    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return NextResponse.json(
        { error: "Check-in date cannot be in the past." },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: "Check-out must be after check-in." },
        { status: 400 }
      );
    }

    // ================= 🔥 FLEXIBLE MATCH =================
    const apartmentMap: any = {
      "one-bedroom": "One-Bedroom Penthouse Residence",
      "two-bedroom": "Two-Bedroom Signature Penthouse",
      "three-bedroom": "Three-Bedroom Premium Residence",
    };

    const apartmentName = apartmentMap[apartment] || apartment;

    // ================= FIND APARTMENT TYPE =================
    const apartmentType = await prisma.apartmentType.findUnique({
      where: { name: apartmentName },
      include: { units: true },
    });

    if (!apartmentType) {
      return NextResponse.json(
        { error: "Invalid apartment type." },
        { status: 400 }
      );
    }
    
    // ================= FIND AVAILABLE UNIT =================
    let availableUnit = null;

    for (const unit of apartmentType.units) {

      // 🔥 1. CHECK OVERLAPPING BOOKINGS
      const overlappingBooking = await prisma.booking.findFirst({
        where: {
          unitId: unit.id,
          status: {
            notIn: ["CANCELLED"],
          },
          AND: [
            { checkIn: { lt: checkOutDate } },
            { checkOut: { gt: checkInDate } },
          ],
        },
      });

      if (overlappingBooking) continue;

      // 🔥 2. CHECK BLOCKED DATES
      const blocked = await prisma.blockedDate.findFirst({
        where: {
          unitId: unit.id,
          date: {
            gte: checkInDate,
            lte: checkOutDate,
          },
        },
      });

      if (blocked) continue;

      // ✅ UNIT IS VALID
      availableUnit = unit;
      break;
    }

    if (!availableUnit) {
      return NextResponse.json(
        { error: "No available units for selected dates." },
        { status: 400 }
      );
    }

    // ================= CALCULATE =================
    const nights =
      (checkOutDate.getTime() - checkInDate.getTime()) /
      (1000 * 60 * 60 * 24);

    const totalPrice = nights * apartmentType.price;

    // ================= CREATE BOOKING =================
    const booking = await prisma.booking.create({
      data: {
        reference: `TCS-${Date.now()}`,
        name,
        email,
        phone,
        unitId: availableUnit.id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights,
        totalPrice,
        status: "PENDING",
        notes,
      },
    });

    // ================= RESPONSE =================
    return NextResponse.json({
      success: true,
      bookingReference: booking.reference,
      unitAssigned: availableUnit.name,
      nights,
      totalPrice,
    });

  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}