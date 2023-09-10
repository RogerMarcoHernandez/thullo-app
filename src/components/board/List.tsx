import Card from "@/components/board/Card";
import { Button } from "@nextui-org/button";
import { CardBody, CardHeader, Card as NUICard } from "@nextui-org/card";
import { Prisma } from "@prisma/client";
import AddCardModal from "./AddCardModal";
import EditListModal from "./EditListModal";

type ListWithCards = Prisma.ListGetPayload<{
  include: { cards: true };
}>;

type Props = ListWithCards & {
  deleteList: (listId: string) => Promise<void>;
  editList: (listId: string, name: string) => Promise<void>;
  isBoardCreator: boolean;
  editCard: (listId: string, cardId: string, title: string) => Promise<void>;
  deleteCard: (listId: string, cardId: string) => Promise<void>;
  createCard: (listId: string, title: string) => Promise<void>;
};

const List = ({
  deleteList,
  editList,
  editCard,
  deleteCard,
  createCard,
  isBoardCreator,
  ...list
}: Props) => (
  <div className="flex flex-col gap-2 grow">
    <NUICard>
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
            isBoardCreator={isBoardCreator}
            editCard={editCard}
            deleteCard={deleteCard}
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

export default List;
