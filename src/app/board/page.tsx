import List from "@/components/board/List";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

// Sample data for lists and cards (you can replace this with your data)

const lists = [
  {
    id: "1",
    title: "To Do",
    cards: [
      {
        title: "Task 1",
        dueDate: "2023-09-30", // Format: YYYY-MM-DD
        labels: ["Label 1", "Label 2"],
      },
      {
        title: "Task 2",
        dueDate: "2023-10-15",
        labels: ["Label 3"],
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    cards: [
      {
        title: "Task 3",
        dueDate: "2023-10-05",
        labels: ["Label 1"],
      },
    ],
  },
  {
    id: "3",
    title: "Done",
    cards: [],
  },
];

const BoardPage = () => (
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
      {lists.map((list) => (
        <List key={list.id} {...list} />
      ))}
    </div>
  </div>
);

export default BoardPage;
