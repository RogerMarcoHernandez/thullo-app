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
import { useRef, useState } from "react";

type Props = {
  createCard: (listId: string, title: string) => Promise<void>;
  listId: string;
  isBoardCreator: boolean;
};

const AddCardModal = ({ listId, createCard, isBoardCreator }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleCreateCard = () => {
    if (!inputRef.current || !inputRef.current.value) return;
    createCard(listId, inputRef.current.value).then(() => {
      closeModal();
    });
  };

  return (
    <>
      <Button color="success" onClick={openModal}>
        Add Card
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>Create a New Card</ModalHeader>
          <ModalBody>
            <Input type="text" placeholder="Card Name" ref={inputRef} />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={handleCreateCard}>
              Create
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

export default AddCardModal;
