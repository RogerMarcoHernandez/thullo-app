import { config } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (
  req: NextRequest,
  { params }: { params: { id: string; list_id: string } }
) => {
  const session = await getServerSession(config);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  switch (req.method) {
    case "GET": {
      const cards = await prisma.card.findMany({
        where: {
          boardId: params.id,
          listId: params.list_id,
        },
      });
      return NextResponse.json(cards);
    }
    case "POST": {
      const { title } = await req.json();
      const card = await prisma.card.create({
        data: {
          title,
          boardId: params.id,
          listId: params.list_id,
        },
      });
      return NextResponse.json(card);
    }
    default:
      return NextResponse.next();
  }
};

export { handler as GET, handler as POST };
