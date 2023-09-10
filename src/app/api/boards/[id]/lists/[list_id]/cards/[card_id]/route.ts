import { config } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (
  req: NextRequest,
  { params }: { params: { id: string; list_id: string; card_id: string } }
) => {
  const session = await getServerSession(config);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  switch (req.method) {
    case "GET": {
      const card = await prisma.card.findUnique({
        where: {
          id: params.card_id,
          boardId: params.id,
          listId: params.list_id,
        },
      });
      return NextResponse.json(card);
    }
    case "PUT": {
      const { title } = await req.json();
      const card = await prisma.card.update({
        where: {
          id: params.card_id,
          boardId: params.id,
          listId: params.list_id,
        },
        data: {
          title,
        },
      });
      return NextResponse.json(card);
    }
    case "DELETE": {
      const card = await prisma.card.delete({
        where: {
          id: params.card_id,
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

export { handler as DELETE, handler as GET, handler as PUT };
