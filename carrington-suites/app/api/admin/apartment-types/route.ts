import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const types = await prisma.apartmentType.findMany({
      select: {
        id: true,
        name: true,
        price: true,
      },
    });

    return NextResponse.json(types);

  } catch (error) {
    console.error("APARTMENT TYPES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch apartment types" },
      { status: 500 }
    );
  }
}