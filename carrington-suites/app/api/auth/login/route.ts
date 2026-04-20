import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isMatch = await comparePassword(password, admin.password);

  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = generateToken(admin.id);

  return NextResponse.json({ token });
}