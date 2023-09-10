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
import { mutate } from "swr";

const CreateBoardModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const createBoard = async () => {
    if (!inputRef.current || !inputRef.current.value) return;

    try {
      const response = await fetch("/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputRef.current.value }),
      });

      if (response.ok) {
        // Trigger a revalidation of the data
        mutate("/api/boards");
        closeModal();
      } else {
        console.error("Failed to create board");
      }
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <>
      <Button color="primary" onClick={openModal}>
        Create Board
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>Create a New Board</ModalHeader>
          <ModalBody>
            {/* Add form elements or content for creating a board */}
            {/* Example: */}
            <Input type="text" placeholder="Board Name" ref={inputRef} />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={createBoard}>
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

export default CreateBoardModal;
