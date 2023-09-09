import Card from "@/components/board/Card";
import { Button } from "@nextui-org/button";
import { CardBody, CardHeader, Card as NUICard } from "@nextui-org/card";

type ListProps = {
  id: string;
  title: string;
  cards: {
    title: string;
    dueDate?: string;
    labels: string[];
  }[];
};

const List = ({ id, title, cards }: ListProps) => (
  <div className="flex flex-col gap-2 grow">
    <NUICard>
      <CardHeader className="flex justify-between">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <Button color="danger">Delete list</Button>
      </CardHeader>
      <CardBody>
        {cards.map((card, index) => (
          <Card key={`${id}-${card.title}-${index}`} {...card} />
        ))}
      </CardBody>
    </NUICard>
    <Button color="success" size="sm">
      Add Card
    </Button>
  </div>
);

export default List;
