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
      const comments = await prisma.comment.findMany({
        where: {
          cardId: params.card_id,
          userId: session.user.id,
        },
      });
      return NextResponse.json(comments);
    }
    case "POST": {
      const { text } = await req.json();
      const comment = await prisma.comment.create({
        data: {
          text,
          cardId: params.card_id,
          userId: session.user.id,
        },
      });
      return NextResponse.json(comment);
    }
    default:
      return NextResponse.next();
  }
};

export { handler as GET, handler as POST };
