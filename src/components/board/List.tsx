import Card from "@/components/board/Card";
import { Button } from "@nextui-org/button";
import { CardBody, CardHeader, Card as NUICard } from "@nextui-org/card";
import { Prisma } from "@prisma/client";
import EditListModal from "./EditListModal";

type ListWithCards = Prisma.ListGetPayload<{
  include: { cards: true };
}>;

type Props = ListWithCards & {
  deleteList: (listId: string) => Promise<void>;
  editList: (listId: string, name: string) => Promise<void>;
  isBoardCreator: boolean;
};

const List = ({ deleteList, editList, isBoardCreator, ...list }: Props) => (
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
          <Card key={`${list.id}-${card.title}-${index}`} {...card} />
        ))}
      </CardBody>
    </NUICard>
    <Button color="success" size="sm">
      Add Card
    </Button>
  </div>
);

export default List;
