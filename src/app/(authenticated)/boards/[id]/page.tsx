"use client";
import CardDetailsModal from "@/components/board/CardDetailsModal";
import List from "@/components/board/List";
import { fetcher } from "@/lib/swr";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Prisma } from "@prisma/client";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";

type BoardWithLists = Prisma.BoardGetPayload<{
  include: { lists: { include: { cards: true } } };
}>;

const BoardPage = () => {
  const { id } = useParams();
  // Fetch board data using SWR
  const { data: boardData, error } = useSWR<BoardWithLists>(
    `/api/boards/${id}`,
    fetcher
  );

  return (
    <div className="container mx-auto p-2 pt-8">
      <h1 className="text-3xl font-semibold mb-4">Board</h1>
      <div className="flex space-x-4">
        <Link href="/" as={NextLink}>
          Back to Home
        </Link>
      </div>
      <div className="flex space-x-4 mt-6">
        <Button color="primary">Add List</Button>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-8 mt-4 w-full">
        {boardData?.lists?.map((list) => (
          <List key={list.id} {...list} />
        ))}
        <CardDetailsModal />
      </div>
    </div>
  );
};

export default BoardPage;
