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
  createList: (name: string) => Promise<void>;
};

const AddListModal = ({ createList }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleCreateList = () => {
    if (!inputRef.current || !inputRef.current.value) return;
    createList(inputRef.current.value).then(() => {
      closeModal();
    });
  };

  return (
    <>
      <Button color="primary" onClick={openModal}>
        Create List
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>Create a New List</ModalHeader>
          <ModalBody>
            <Input type="text" placeholder="List Name" ref={inputRef} />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={handleCreateList}>
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

export default AddListModal;
