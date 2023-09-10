import Card from "@/components/board/Card";
import { Button } from "@nextui-org/button";
import { CardBody, CardHeader, Card as NUICard } from "@nextui-org/card";
import { Prisma } from "@prisma/client";
import { useDrop } from "react-dnd";
import AddCardModal from "./AddCardModal";
import EditListModal from "./EditListModal";

type ListWithCards = Prisma.ListGetPayload<{
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
}>;

export type Props = ListWithCards & {
  deleteList: (listId: string) => Promise<void>;
  editList: (listId: string, name: string) => Promise<void>;
  isBoardCreator: boolean;
  editCard: (
    listId: string,
    cardId: string,
    Card: Prisma.CardUpdateInput
  ) => Promise<void>;
  deleteCard: (listId: string, cardId: string) => Promise<void>;
  createCard: (listId: string, title: string) => Promise<void>;
  createComment: (
    listId: string,
    cardId: string,
    text: string
  ) => Promise<void>;
  editComment: (
    listId: string,
    cardId: string,
    commentId: string,
    text: string
  ) => Promise<void>;
  deleteComment: (
    listId: string,
    cardId: string,
    commentId: string
  ) => Promise<void>;
  onDrop: (
    cardId: string,
    oldListId: string,
    newListId: string
  ) => Promise<void>;
};

const List = ({
  deleteList,
  editList,
  editCard,
  deleteCard,
  createCard,
  onDrop,
  isBoardCreator,
  createComment,
  editComment,
  deleteComment,
  ...list
}: Props) => {
  const cardProps = {
    editCard,
    deleteCard,
    isBoardCreator,
    createComment,
    editComment,
    deleteComment,
  };
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "CARD" as const,
      canDrop: (item: { id: string; listId: string }) =>
        item.listId !== list.id,
      drop: (item: { id: string; listId: string }) =>
        onDrop(item.id, item.listId, list.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );

  return (
    <div
      className="flex flex-col gap-2 grow"
      style={{ outline: isOver && canDrop ? "2px dashed #FFF" : "none" }}
    >
      <NUICard ref={drop}>
        <CardHeader className="flex justify-between">
          <div className="flex gap-2">
            <h2 className="text-xl font-semibold mb-2">{list.name}</h2>
            <EditListModal
              list={list}
              editList={editList}
              isBoardCreator={isBoardCreator}
            />
          </div>
          <Button color="danger" onClick={() => deleteList(list.id)}>
            Delete list
          </Button>
        </CardHeader>
        <CardBody>
          {list.cards?.map((card, index) => (
            <Card
              key={`list-card:${list.id}-${card.title}-${card.id}`}
              {...card}
              {...cardProps}
            />
          ))}
        </CardBody>
      </NUICard>
      <AddCardModal
        createCard={createCard}
        isBoardCreator={isBoardCreator}
        listId={list.id}
      />
    </div>
  );
};

export default List;
