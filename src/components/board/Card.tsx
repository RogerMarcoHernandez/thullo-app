import { dateToString } from "@/lib/date";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NUICard,
} from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Card } from "@prisma/client";
import EditCardModal from "./EditCardModal";

type Props = Card & {
  editCard: (listId: string, cardId: string, title: string) => Promise<void>;
  deleteCard: (listId: string, cardId: string) => Promise<void>;
  isBoardCreator: boolean;
};

const Card = ({ editCard, deleteCard, isBoardCreator, ...card }: Props) => (
  <NUICard className="bg-foreground text-background rounded shadow mb-2 p-2 flex flex-col">
    <CardHeader className="flex justify-between">
      <div className="flex gap-2">
        <h3 className="font-semibold">{card.title}</h3>
        <EditCardModal
          card={card}
          editCard={editCard}
          isBoardCreator={isBoardCreator}
        />
      </div>
      {isBoardCreator && (
        <Button color="danger" onClick={() => deleteCard(card.listId, card.id)}>
          Delete card
        </Button>
      )}
    </CardHeader>
    <CardBody className="flex flex-row flex-wrap gap-1">
      {card.labels.map((label, labelIndex) => (
        <Chip
          key={`card-labels-${card.id}-${label}-${labelIndex}`}
          color="primary"
          className="text-ellipsis overflow-hidden whitespace-nowrap px-1"
        >
          {label}
        </Chip>
      ))}
    </CardBody>
    <CardFooter className="flex justify-between">
      {card.dueDate && (
        <Chip color="warning" className="self-start">
          {dateToString(card.dueDate)}
        </Chip>
      )}
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        className="w-6 h-6 text-tiny"
      />
    </CardFooter>
  </NUICard>
);

export default Card;
