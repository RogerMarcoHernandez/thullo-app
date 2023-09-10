import { config } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(config);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  switch (req.method) {
    case "GET": {
      const lists = await prisma.list.findMany({
        where: {
          boardId: params.id,
        },
      });
      return NextResponse.json(lists);
    }
    case "POST": {
      const { name } = await req.json();
      const list = await prisma.list.create({
        data: {
          name,
          boardId: params.id,
        },
      });
      return NextResponse.json(list);
    }
    default:
      return NextResponse.next();
  }
};

export { handler as GET, handler as POST };
