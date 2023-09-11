import { config } from "@/lib/auth";
import prisma from "@/lib/db";
import { storage } from "@/lib/storage";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
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
      const attachments = await prisma.card.findMany({
        where: {
          id: params.card_id,
          listId: params.list_id,
          boardId: params.id,
        },
        select: {
          attachments: true,
        },
      });
      return NextResponse.json(attachments);
    }
    case "POST": {
      const formData = await req.formData();
      const formFiles = formData.getAll("files");
      const uploadResults = await Promise.all(
        formFiles.map(async (formFile) => {
          const file: File | null = formFile as unknown as File;
          const bytes = await file.arrayBuffer();
          const storageRef = ref(
            storage,
            `cards/${params.card_id}/${file.name}`
          );
          return await uploadBytes(storageRef, bytes);
        })
      );

      const existingCard = await prisma.card.findUnique({
        where: {
          id: params.card_id,
          listId: params.list_id,
          boardId: params.id,
        },
        select: {
          attachments: true,
        },
      });

      const currentAttachments = existingCard?.attachments || []; // Ensure it's an array

      // Concatenate the current attachments with the new ones
      const updatedAttachments = currentAttachments.concat(
        uploadResults.map((uploadResult) => uploadResult.ref.fullPath)
      );

      const updatedCard = await prisma.card.update({
        where: {
          id: params.card_id,
          listId: params.list_id,
          boardId: params.id,
        },
        data: {
          attachments: updatedAttachments,
        },
        select: {
          attachments: true,
        },
      });
      return NextResponse.json(updatedCard.attachments);
    }
    case "DELETE": {
      const { attachments } = await req.json();

      // Delete the attachments from Firebase Storage
      await Promise.all(
        attachments.map(async (attachment: string) => {
          const storageRef = ref(storage, attachment);
          await deleteObject(storageRef);
        })
      );

      // Update the card in the database
      const existingCard = await prisma.card.findUnique({
        where: {
          id: params.card_id,
          listId: params.list_id,
          boardId: params.id,
        },
        select: {
          attachments: true,
        },
      });

      const currentAttachments = existingCard?.attachments || []; // Ensure it's an array

      // Filter out the attachments that are being deleted
      const updatedAttachments = currentAttachments.filter(
        (attachment) => !attachments.includes(attachment)
      );

      const updatedCard = await prisma.card.update({
        where: {
          id: params.card_id,
          listId: params.list_id,
          boardId: params.id,
        },
        data: {
          attachments: updatedAttachments,
        },
        select: {
          attachments: true,
        },
      });
      return NextResponse.json(updatedCard.attachments);
    }

    default:
      return NextResponse.next();
  }
};

export { handler as DELETE, handler as GET, handler as POST };
