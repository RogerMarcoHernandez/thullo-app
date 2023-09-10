"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Prisma } from "@prisma/client";
import { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";

type ListWithCards = Prisma.ListGetPayload<{
  include: { cards: true };
}>;

type Props = {
  editList: (listId: string, name: string) => Promise<void>;
  isBoardCreator: boolean;
  list: ListWithCards;
};

const EditListModal = ({ editList, isBoardCreator, list }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleEditList = () => {
    if (!inputRef.current || !inputRef.current.value) return;
    editList(list.id, inputRef.current.value).then(() => {
      closeModal();
    });
  };

  return (
    <>
      {isBoardCreator && (
        <Button onClick={openModal} size="sm">
          <FaPen />
        </Button>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>Edit {list.name}</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="List Name"
              ref={inputRef}
              defaultValue={list.name}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={handleEditList}>
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

export default EditListModal;
