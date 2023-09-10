import { config } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const session = await getServerSession(config);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  switch (req.method) {
    case "GET": {
      const boards = await prisma.board.findMany({
        where: {
          OR: [
            { userId: session.user.id }, // Include boards where the user is the creator
            { members: { some: { id: session.user.id } } }, // Include boards where the user is a member
          ],
        },
      });
      return NextResponse.json(boards);
    }
    case "POST": {
      const { name } = await req.json();
      const board = await prisma.board.create({
        data: {
          name,
          creator: { connect: { id: session.user.id } },
        },
      });
      return NextResponse.json(board);
    }
    default:
      return NextResponse.next();
  }
};

export { handler as GET, handler as POST };
