import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NUICard,
} from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

type CardProps = {
  title: string;
  dueDate?: string;
  labels: string[];
};

const Card = ({ title, dueDate, labels }: CardProps) => (
  <NUICard className="bg-foreground text-background rounded shadow mb-2 p-2 flex flex-col gap-2 group/card">
    <CardHeader className="flex justify-between">
      <h3>{title}</h3>
      <Button color="danger" className="group-hover/card:visible invisible">
        Delete card
      </Button>
    </CardHeader>
    <CardBody className="flex flex-row flex-wrap gap-1">
      {labels.map((label, labelIndex) => (
        <Chip
          key={labelIndex}
          color="primary"
          className="text-ellipsis overflow-hidden whitespace-nowrap px-1"
        >
          {label}
        </Chip>
      ))}
    </CardBody>
    <CardFooter className="flex justify-between">
      {dueDate && (
        <Chip color="warning" className="self-start">
          {dueDate}
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
