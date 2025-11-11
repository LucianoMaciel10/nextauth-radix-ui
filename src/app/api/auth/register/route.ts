/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "@/src/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });
    const { password: _, ...user } = newUser;
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
