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
import { Card } from "@prisma/client";
import { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";

type Props = {
  editCard: (listId: string, cardId: string, title: string) => Promise<void>;
  isBoardCreator: boolean;
  card: Card;
};

const EditCardModal = ({ editCard, isBoardCreator, card }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleEditCard = () => {
    if (!inputRef.current || !inputRef.current.value) return;
    editCard(card.listId, card.id, inputRef.current.value).then(() => {
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
          <ModalHeader>Edit {card.title}</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Card Name"
              ref={inputRef}
              defaultValue={card.title}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={handleEditCard}>
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

export default EditCardModal;
