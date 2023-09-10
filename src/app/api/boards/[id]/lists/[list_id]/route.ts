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
      const list = await prisma.list.findUnique({
        where: { id: params.list_id, boardId: params.id },
      });
      return NextResponse.json(list);
    }
    case "PUT": {
      const { name } = await req.json();
      const list = await prisma.list.update({
        where: { id: params.list_id, boardId: params.id },
        data: {
          name,
        },
      });
      return NextResponse.json(list);
    }
    case "DELETE": {
      const list = await prisma.list.delete({
        where: { id: params.list_id, boardId: params.id },
      });
      return NextResponse.json(list);
    }
    default:
      return NextResponse.next();
  }
};

export { handler as DELETE, handler as GET, handler as PUT };
