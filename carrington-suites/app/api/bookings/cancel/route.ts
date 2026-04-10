import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { reference } = await req.json();
  
    await prisma.booking.update({
      where: { reference },
      data: { status: "CANCELLED" },
    });
  
    return NextResponse.json({ success: true });
  }