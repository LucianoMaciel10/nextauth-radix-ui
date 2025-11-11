import { NextResponse } from "next/server";
import { prisma } from "@/src/libs/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  const newUser = await prisma.user.create({data});
  return NextResponse.json(newUser, { status: 201 });
}
