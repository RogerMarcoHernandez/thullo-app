"use client";
import { fetcher } from "@/lib/swr";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Board, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import useSWR, { mutate } from "swr";

type Props = {
  board: Board;
};

const EditBoardModal = ({ board }: Props) => {
  const { data: session } = useSession();
  const { data: users, error } = useSWR<User[]>("/api/users", fetcher);
  const [isModalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const availableMembers = useMemo(
    () => users?.filter((user) => user.id !== session?.user?.id),
    [users, session]
  );
  const isBoardCreator = useMemo(
    () =>
      session?.user?.id ? !board.memberIds.includes(session?.user?.id) : null,
    [board, session]
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const editBoard = async () => {
    if (!inputRef.current || !inputRef.current.value) return;

    try {
      const response = await fetch(`/api/boards/${board.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputRef.current.value,
          description: textareaRef.current?.value,
          memberIds: selectRef.current?.value.split(",").filter(Boolean),
        }),
      });

      if (response.ok) {
        // Trigger a revalidation of the data
        mutate("/api/boards");
        closeModal();
      } else {
        console.error("Failed to edit board");
      }
    } catch (error) {
      console.error("Error editing board:", error);
    }
  };

  return (
    <>
      {isBoardCreator && (
        <Button onClick={openModal}>
          <FaPen />
        </Button>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>Edit {board.name}</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            {/* Add form elements or content for creating a board */}
            {/* Example: */}
            <Input
              type="text"
              placeholder="Board Name"
              ref={inputRef}
              defaultValue={board.name}
            />
            <Textarea
              placeholder="Describe your board"
              ref={textareaRef}
              defaultValue={board.description || ""}
            />
            {availableMembers && (
              <Select
                placeholder="Select members"
                selectionMode="multiple"
                ref={selectRef}
                defaultSelectedKeys={board.memberIds}
              >
                {availableMembers.map((user: User) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={editBoard}>
              Save
            </Button>
            <Button color="danger" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditBoardModal;
