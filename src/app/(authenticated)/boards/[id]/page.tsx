"use client";
import AddListModal from "@/components/board/AddListModal";
import List from "@/components/board/List";
import { fetcher } from "@/lib/swr";
import { Link } from "@nextui-org/link";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useSWR, { mutate } from "swr";

type BoardWithListsAndMembers = Prisma.BoardGetPayload<{
  include: {
    lists: {
      include: {
        cards: {
          include: {
            comments: {
              include: { user: true };
            };
            members: true;
          };
        };
      };
    };
    members: true;
  };
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

  const editCard = useCallback(
    async (
      listId: string,
      cardId: string,
      { title, description }: Prisma.CardUpdateInput
    ) => {
      try {
        const response = await fetch(
          `/api/boards/${id}/lists/${listId}/cards/${cardId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
          }
        );

        if (response.ok) {
          console.log("Card edited successfully");
          // Trigger a revalidation of the data
          mutate(`/api/boards/${id}`);
        } else {
          console.error("Failed to edit card");
        }
      } catch (error) {
        console.error("Error editing card:", error);
      }
    },
    [id]
  );

  const deleteCard = useCallback(
    async (listId: string, cardId: string) => {
      try {
        const response = await fetch(
          `/api/boards/${id}/lists/${listId}/cards/${cardId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Card deleted successfully");
          // Trigger a revalidation of the data
          mutate(`/api/boards/${id}`);
        } else {
          console.error("Failed to delete card");
        }
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    },
    [id]
  );

  const createCard = useCallback(
    async (listId: string, title: string) => {
      try {
        const response = await fetch(
          `/api/boards/${id}/lists/${listId}/cards`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
          }
        );

        if (response.ok) {
          console.log("Card created successfully");
          // Trigger a revalidation of the data
          mutate(`/api/boards/${id}`);
        } else {
          console.error("Failed to create card");
        }
      } catch (error) {
        console.error("Error creating card:", error);
      }
    },
    [id]
  );

  const switchCardFromListToList = useCallback(
    async (cardId: string, oldListId: string, newListId: string) => {
      try {
        const response = await fetch(
          `/api/boards/${id}/lists/${oldListId}/cards/${cardId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ listId: newListId }),
          }
        );

        if (response.ok) {
          console.log("Card switched successfully");
          // Trigger a revalidation of the data
          mutate(`/api/boards/${id}`);
        } else {
          console.error("Failed to switch card");
        }
      } catch (error) {
        console.error("Error switching card:", error);
      }
    },
    [id]
  );

  const createComment = useCallback(
    async (listId: string, cardId: string, text: string) => {
      try {
        const response = await fetch(
          `/api/boards/${id}/lists/${listId}/cards/${cardId}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
          }
        );

        if (response.ok) {
          console.log("Comment created successfully");
          // Trigger a revalidation of the data
          mutate(`/api/boards/${id}`);
        } else {
          console.error("Failed to create comment");
        }
      } catch (error) {
        console.error("Error creating comment:", error);
      }
    },
    [id]
  );

  const editComment = useCallback(
    async (listId: string, cardId: string, commentId: string, text: string) => {
      try {
        const response = await fetch(
          `/api/boards/${id}/lists/${listId}/cards/${cardId}/comments/${commentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
          }
        );

        if (response.ok) {
          console.log("Comment edited successfully");
          // Trigger a revalidation of the data
          mutate(`/api/boards/${id}`);
        } else {
          console.error("Failed to edit comment");
        }
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    },
    [id]
  );

  const deleteComment = useCallback(
    async (listId: string, cardId: string, commentId: string) => {
      try {
        const response = await fetch(
          `/api/boards/${id}/lists/${listId}/cards/${cardId}/comments/${commentId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Comment deleted successfully");
          // Trigger a revalidation of the data
          mutate(`/api/boards/${id}`);
        } else {
          console.error("Failed to delete comment");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    },
    [id]
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
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 mt-4 w-full">
          {boardData?.lists?.map((list) => (
            <List
              key={`list-${list.boardId}:${list.id}`}
              {...list}
              deleteList={deleteList}
              editList={editList}
              editCard={editCard}
              deleteCard={deleteCard}
              createCard={createCard}
              onDrop={switchCardFromListToList}
              isBoardCreator={isBoardCreator || false}
              createComment={createComment}
              editComment={editComment}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default BoardPage;
