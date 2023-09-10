"use client";
import AddListModal from "@/components/board/AddListModal";
import CardDetailsModal from "@/components/board/CardDetailsModal";
import List from "@/components/board/List";
import { fetcher } from "@/lib/swr";
import { Link } from "@nextui-org/link";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import useSWR, { mutate } from "swr";

type BoardWithListsAndMembers = Prisma.BoardGetPayload<{
  include: { lists: { include: { cards: true } }; members: true };
}>;

const BoardPage = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  // Fetch board data using SWR
  const { data: boardData, error } = useSWR<BoardWithListsAndMembers>(
    `/api/boards/${id}`,
    fetcher
  );

  const createList = useCallback(
    async (name: string) => {
      try {
        const response = await fetch(`/api/boards/${id}/lists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });

        if (response.ok) {
          console.log("List created successfully");
          // Trigger a revalidation of the data
          mutate(`/api/boards/${id}`);
        } else {
          console.error("Failed to create list");
        }
      } catch (error) {
        console.error("Error creating list:", error);
      }
    },
    [id]
  );

  const deleteList = useCallback(
    async (listId: string) => {
      try {
        const response = await fetch(`/api/boards/${id}/lists/${listId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("List deleted successfully");
          // Trigger a revalidation of the data
          mutate(`/api/boards/${id}`);
        } else {
          console.error("Failed to delete list");
        }
      } catch (error) {
        console.error("Error deleting list:", error);
      }
    },
    [id]
  );

  const editList = useCallback(
    async (listId: string, name: string) => {
      try {
        const response = await fetch(`/api/boards/${id}/lists/${listId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });

        if (response.ok) {
          console.log("List edited successfully");
          // Trigger a revalidation of the data
          mutate(`/api/boards/${id}`);
        } else {
          console.error("Failed to edit list");
        }
      } catch (error) {
        console.error("Error editing list:", error);
      }
    },
    [id]
  );

  const isBoardCreator = useMemo(
    () =>
      session?.user?.id
        ? !boardData?.memberIds.includes(session?.user?.id)
        : null,
    [boardData, session]
  );

  return (
    <div className="container mx-auto p-2 pt-8">
      <h1 className="text-3xl font-semibold mb-4">{boardData?.name}</h1>
      <div className="flex space-x-4">
        <Link href="/" as={NextLink}>
          Back to Home
        </Link>
      </div>
      <div className="flex space-x-4 mt-6">
        {boardData && <AddListModal createList={createList} />}
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-8 mt-4 w-full">
        {boardData?.lists?.map((list) => (
          <List
            key={list.id}
            {...list}
            deleteList={deleteList}
            editList={editList}
            isBoardCreator={isBoardCreator || false}
          />
        ))}
        <CardDetailsModal />
      </div>
    </div>
  );
};

export default BoardPage;
