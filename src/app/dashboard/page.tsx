import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";

// Mock data for user boards
const userBoards = [
  { id: 1, title: "Project A" },
  { id: 2, title: "Project B" },
  { id: 3, title: "Project C" },
  // Add more boards as needed
];

const DashboardPage = () => (
  <div className="p-8">
    <div className="bg-gray-100 p-4 rounded-lg">
      {/* Dashboard Header */}
      <h2 className="text-lg font-semibold mb-4 text-background">Boards</h2>
      {/* Create New Board Button */}
      <Button color="primary">Create new board</Button>
    </div>

    <div className="bg-white p-4 mt-4 border border-gray-300 rounded-lg shadow">
      {/* User Boards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userBoards.map((board) => (
          <Card key={board.id} isPressable>
            <CardBody>
              <h3 className="text-lg font-semibold">{board.title}</h3>
              {/* Add more board details or actions here */}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardPage;
