import { config } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
      list_id: string;
      card_id: string;
      comment_id: string;
    };
  }
) => {
  const session = await getServerSession(config);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  switch (req.method) {
    case "GET": {
      const comment = await prisma.comment.findUnique({
        where: {
          id: params.comment_id,
          cardId: params.card_id,
          userId: session.user.id,
        },
      });
      return NextResponse.json(comment);
    }
    case "PUT": {
      const { text } = await req.json();
      const comment = await prisma.comment.update({
        where: {
          id: params.comment_id,
          cardId: params.card_id,
          userId: session.user.id,
        },
        data: { text },
      });
      return NextResponse.json(comment);
    }
    case "DELETE": {
      const comment = await prisma.comment.delete({
        where: {
          id: params.comment_id,
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

export { handler as DELETE, handler as GET, handler as PUT };
