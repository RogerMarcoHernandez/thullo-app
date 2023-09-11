"use client";
import CreateBoardModal from "@/components/dashboard/CreateBoardModal";
import EditBoardModal from "@/components/dashboard/EditBoardModal";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Board } from "@prisma/client";
import Link from "next/link";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DashboardPage = () => {
  // Fetch boards from the API using SWR
  const { data: userBoards, error } = useSWR("/api/boards", fetcher);

  const deleteBoard = async (boardId: string) => {
    try {
      const response = await fetch(`/api/boards/${boardId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Trigger a revalidation of the data to update the board list
        mutate("/api/boards");
      } else {
        console.error("Failed to delete board");
      }
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="bg-gray-100 p-4 rounded-lg">
        {/* Dashboard Header */}
        <h2 className="text-lg font-semibold mb-4 text-background">Boards</h2>
        {/* Create New Board Button */}
        <CreateBoardModal />
      </div>

      <div className="bg-white p-4 mt-4 border border-gray-300 rounded-lg shadow">
        {/* User Boards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {error ? (
            <p>Error loading boards.</p>
          ) : !userBoards ? (
            <p>Loading...</p>
          ) : (
            userBoards.map((board: Board) => (
              <Card key={`user-boards-${board.id}`}>
                <CardBody>
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{board.name}</h3>
                    <EditBoardModal board={board} />
                  </div>
                  {/* Add more board details or actions here */}
                  <div className="mt-4 flex justify-between">
                    <Button
                      color="primary"
                      as={Link}
                      href={`/boards/${board.id}`}
                    >
                      Go to Board
                    </Button>

                    <Button
                      color="danger"
                      onClick={() => deleteBoard(board.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
