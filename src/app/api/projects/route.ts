import prisma from "@/src/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        user: { connect: { id: session?.user.id } },
      },
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
