import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  switch (req.method) {
    case "GET": {
      const users = await prisma.user.findMany();
      return NextResponse.json(users);
    }
    default:
      return NextResponse.next();
  }
};

export { handler as GET };
