import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Card } from "@prisma/client";

const card = {
  title: "Sample Card",
  description: "This is a sample card with details.",
  dueDate: "2023-09-30",
  assignedMembers: [
    {
      name: "John Doe",
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      name: "Jane Smith",
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
  ],
  comments: [
    { author: "John Doe", text: "This looks great!" },
    { author: "Jane Smith", text: "I agree, let's move forward." },
  ],
  files: [{ name: "Document.pdf", url: "/document.pdf" }],
  links: [{ name: "Example Link", url: "https://example.com" }],
};

type Props = {
  card: Card;
  isBoardCreator: boolean;
};

const CardDetailsModal = ({ card, isBoardCreator }: Props) => (
  <>
    {isBoardCreator && <Button size="sm">Add</Button>}

    <Modal isOpen={false}>
      <ModalContent className="container mx-auto">
        <ModalHeader>
          <h1 className="text-3xl font-semibold mb-4">{card.title}</h1>
        </ModalHeader>
        <ModalBody>
          <h2>{card.description}</h2>
          <Divider />
          <div className="mb-4">
            {/* <Chip color="warning">{card.dueDate || ""}</Chip> */}
            <span className="ml-2">Due Date</span>
          </div>
          <div className="mb-4">
            <span>Assigned Members:</span>
            {/* <div className="flex flex-col gap-2">
            {card.memberIDs.map((member, index) => (
              // <div key={index}>
              //   <Avatar src={member ||""} size="md" />
              //   <p className="text-sm">{member.name}</p>
              // </div>
            ))}
          </div> */}
          </div>
          <Divider />
          <div className="mb-4">
            <h2 className="text-xl mb-2">Comments</h2>
            {/* <ul>
            {card.comments.map((comment, index) => (
              <li key={index} className="mb-2">
                <p className="font-semibold">{comment.author}</p>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul> */}
          </div>
          <Divider />
          <div className="mb-4">
            <h2 className="text-xl mb-2">Files</h2>
            {/* <ul>
            {card.files.map((file, index) => (
              <li key={index} className="mb-2">
                <Link
                  as={NextLink}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.name}
                </Link>
              </li>
            ))}
          </ul> */}
          </div>
          <Divider />
          <div className="mb-4">
            <h2 className="text-xl mb-2">Links</h2>
            {/* <ul>
            {card.links.map((link, index) => (
              <li key={index} className="mb-2">
                <Link
                  as={NextLink}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul> */}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" size="sm">
            Edit Card
          </Button>
          <Button color="danger" size="sm">
            Delete Card
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);

export default CardDetailsModal;
