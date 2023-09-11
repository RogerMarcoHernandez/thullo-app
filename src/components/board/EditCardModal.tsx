"use client";
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
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useCallback, useRef, useState } from "react";
import { FaComment, FaPen, FaSave } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Props as ListProps } from "./List";

type Props = {
  card: Prisma.CardGetPayload<{
    include: {
      comments: {
        include: { user: true };
      };
      members: true;
    };
  }>;
} & Pick<
  ListProps,
  | "createComment"
  | "deleteComment"
  | "editComment"
  | "editCard"
  | "isBoardCreator"
>;

const EditCardModal = ({
  editCard,
  createComment,
  editComment,
  deleteComment,
  isBoardCreator,
  card,
}: Props) => {
  const session = useSession();
  const isCommentCreator = useCallback(
    (
      comment: Prisma.CommentGetPayload<{
        include: { user: true };
      }>
    ) => comment.user.id === session.data?.user?.id,
    [session]
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLInputElement>(null);
  const labelsSelectRef = useRef<HTMLSelectElement>(null);
  const newLabelInputRef = useRef<HTMLInputElement>(null);
  const [labels, setLabels] = useState<string[]>(card.labels);
  const editingCommentRef = useRef<HTMLInputElement>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleEditCard = () => {
    if (
      !inputRef.current ||
      !inputRef.current.value ||
      !textareaRef.current ||
      !textareaRef.current.value ||
      !labelsSelectRef.current ||
      !labelsSelectRef.current.value
    )
      return;
    console.log(
      "labels",
      labelsSelectRef.current.value.split(",").filter(Boolean)
    );
    editCard(card.listId, card.id, {
      title: inputRef.current.value,
      description: textareaRef.current.value,
      labels: labelsSelectRef.current.value.split(",").filter(Boolean),
    }).then(() => {
      closeModal();
    });
  };

  const handleCreateComment = () => {
    if (!commentRef.current || !commentRef.current.value) return;
    createComment(card.listId, card.id, commentRef.current.value).then(() => {
      closeModal();
    });
  };

  const handleEditComment = () => {
    if (
      !editingCommentRef.current ||
      !editingCommentRef.current.value ||
      !editingCommentId
    )
      return;
    card.comments.find((comment) => comment.id === editingCommentId)?.text ===
    editingCommentRef.current.value
      ? setEditingCommentId(null)
      : editComment(
          card.listId,
          card.id,
          editingCommentId,
          editingCommentRef.current.value
        ).then(() => {
          setEditingCommentId(null);
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
            <Textarea
              ref={textareaRef}
              placeholder="Description"
              defaultValue={card.description || ""}
            />
            <Input
              type="text"
              placeholder="New label name"
              ref={newLabelInputRef}
              endContent={
                <Button
                  onClick={() => {
                    if (!newLabelInputRef.current?.value) return;
                    setLabels([...labels, newLabelInputRef.current.value]);
                    newLabelInputRef.current.value = "";
                  }}
                  color="primary"
                  isIconOnly
                  size="sm"
                >
                  <FaSave />
                </Button>
              }
            />
            <Select
              ref={labelsSelectRef}
              selectionMode="multiple"
              defaultSelectedKeys={card.labels ?? []}
              placeholder="Select labels"
            >
              {labels.map((label, index) => (
                <SelectItem key={label} value={label}>
                  {label}
                </SelectItem>
              ))}
            </Select>
            <ul className="overflow-auto">
              {card.comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  <div className="flex justify-between">
                    <p className="font-semibold">{comment.user.name}</p>
                    {isCommentCreator(comment) &&
                      editingCommentId !== comment.id && (
                        <div className="flex gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            onClick={() => setEditingCommentId(comment.id)}
                          >
                            <FaPen />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            onClick={() =>
                              deleteComment(card.listId, card.id, comment.id)
                            }
                          >
                            <FaDeleteLeft />
                          </Button>
                        </div>
                      )}
                  </div>
                  {editingCommentId === comment.id ? (
                    <Input
                      type="text"
                      placeholder="Comment"
                      ref={editingCommentRef}
                      defaultValue={comment.text}
                      endContent={
                        <Button
                          onClick={handleEditComment}
                          color="success"
                          isIconOnly
                          size="sm"
                        >
                          <FaSave />
                        </Button>
                      }
                    />
                  ) : (
                    <p>{comment.text}</p>
                  )}
                </li>
              ))}
            </ul>
            <Input
              type="text"
              placeholder="Comment"
              ref={commentRef}
              endContent={
                <Button
                  onClick={handleCreateComment}
                  color="primary"
                  isIconOnly
                  size="sm"
                >
                  <FaComment />
                </Button>
              }
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
