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
      const boards = await prisma.board.findUnique({
        where: { id: params.id, userId: session.user.id },
        include: {
          lists: {
            include: {
              cards: true,
            },
          },
          members: true,
        },
      });
      return NextResponse.json(boards);
    }
    case "PUT": {
      const { name, description, memberIds } = await req.json();
      const board = await prisma.board.update({
        where: { id: params.id, userId: session.user.id },
        data: {
          name,
          description,
          members:
            memberIds.length > 0
              ? {
                  connect: memberIds.map((memberId: string) => ({
                    id: memberId,
                  })),
                }
              : { set: [] },
        },
      });
      return NextResponse.json(board);
    }
    case "DELETE": {
      const board = await prisma.board.delete({
        where: { id: params.id, userId: session.user.id },
      });
      return NextResponse.json(board);
    }
    default:
      return NextResponse.next();
  }
};

export { handler as DELETE, handler as GET, handler as PUT };
