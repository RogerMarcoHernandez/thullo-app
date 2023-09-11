"use client";
import { storage } from "@/lib/storage";
import { Button } from "@nextui-org/button";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Input, Textarea } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Prisma } from "@prisma/client";
import { getDownloadURL, ref } from "firebase/storage";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaComment, FaEye, FaPen, FaSave } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
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
  | "uploadCardFiles"
  | "deleteCardFiles"
>;

const EditCardModal = ({
  editCard,
  createComment,
  editComment,
  deleteComment,
  isBoardCreator,
  uploadCardFiles,
  deleteCardFiles,
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
  const newLabelInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [labels, setLabels] = useState<string[]>(card.labels);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(card.labels);
  const editingCommentRef = useRef<HTMLInputElement>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [attachmentsDownloadUrls, setAttachmentsDownloadUrls] = useState<
    string[]
  >([]);
  const [attachmentsToDelete, setAttachmentsToDelete] = useState<string[]>([]);
  const [isEditingAttachments, setIsEditingAttachments] = useState(false);
  const getBeautyAttachmentName = useCallback((attachment: string) => {
    const split = attachment.split("/");
    return split[split.length - 1];
  }, []);

  useEffect(() => {
    Promise.all(
      card.attachments.map(async (attachment) => {
        const storageRef = ref(storage, attachment);
        return await getDownloadURL(storageRef);
      })
    ).then((downloadUrls) => {
      setAttachmentsDownloadUrls(downloadUrls);
    });
  }, [card.attachments]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleEditCard = () => {
    if (
      !inputRef.current ||
      !inputRef.current.value ||
      !textareaRef.current ||
      !textareaRef.current.value
    )
      return;

    editCard(card.listId, card.id, {
      title: inputRef.current.value,
      description: textareaRef.current.value,
      labels: selectedLabels,
    }).then(() => {
      closeModal();
    });
  };

  const handleUploadFiles = () => {
    if (fileInputRef.current?.files?.length) {
      uploadCardFiles(card.listId, card.id, fileInputRef.current.files).then(
        () => {
          closeModal();
        }
      );
    }
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

  const handleDeleteFiles = () => {
    console.log(attachmentsToDelete);
    if (!attachmentsToDelete.length) return;

    setIsEditingAttachments(false);
    deleteCardFiles(card.listId, card.id, attachmentsToDelete).then(() => {
      closeModal();
    });

    setAttachmentsToDelete([]);
  };

  const handleCancelDeleteFiles = () => {
    setIsEditingAttachments(false);
    setAttachmentsToDelete([]);
  };

  return (
    <>
      <Button
        onClick={openModal}
        size="sm"
        isIconOnly
        endContent={isBoardCreator ? <FaPen /> : <FaEye />}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>Edit {card.title}</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <Input
              isReadOnly={!isBoardCreator}
              type="text"
              placeholder="Card Name"
              ref={inputRef}
              defaultValue={card.title}
            />
            <Textarea
              isReadOnly={!isBoardCreator}
              ref={textareaRef}
              placeholder="Description"
              defaultValue={card.description || ""}
            />
            {isBoardCreator && (
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
            )}
            <Select
              isDisabled={!isBoardCreator}
              selectionMode="multiple"
              selectedKeys={selectedLabels}
              items={labels}
              placeholder="Select labels"
              onChange={(e) =>
                setSelectedLabels(e.target.value.split(",").filter(Boolean))
              }
            >
              {labels.map((label) => (
                <SelectItem key={label} value={label}>
                  {label}
                </SelectItem>
              ))}
            </Select>
            {isBoardCreator && (
              <Input
                type="file"
                variant="underlined"
                multiple
                placeholder="Upload files"
                ref={fileInputRef}
                endContent={
                  <Button
                    onClick={handleUploadFiles}
                    color="primary"
                    isIconOnly
                    size="sm"
                  >
                    <FaSave />
                  </Button>
                }
              />
            )}
            <div className="flex flex-col gap-2">
              {isEditingAttachments ? (
                <div className="flex justify-between">
                  <Button
                    color="danger"
                    endContent={<MdOutlineCancel />}
                    isIconOnly
                    size="sm"
                    onClick={handleCancelDeleteFiles}
                  />
                  <Button
                    color="success"
                    endContent={<FaSave />}
                    isIconOnly
                    size="sm"
                    onClick={handleDeleteFiles}
                  />
                </div>
              ) : (
                <>
                  {isBoardCreator && (
                    <Button
                      color="primary"
                      endContent={<FaPen />}
                      isIconOnly
                      size="sm"
                      onClick={() => setIsEditingAttachments(true)}
                    />
                  )}
                </>
              )}

              {isEditingAttachments ? (
                <CheckboxGroup
                  label="Select attachments to delete"
                  value={attachmentsToDelete}
                  color="warning"
                  onValueChange={setAttachmentsToDelete}
                >
                  {card.attachments.map((attachment) => (
                    <Checkbox
                      key={`delete-attachment-${attachment}`}
                      value={attachment}
                    >
                      {getBeautyAttachmentName(attachment)}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              ) : (
                <ul className="overflow-auto">
                  {card.attachments.map((attachment, index) => (
                    <li key={attachment} className="mb-2">
                      <Link
                        href={attachmentsDownloadUrls[index]}
                        as={NextLink}
                        target="_blank"
                      >
                        {getBeautyAttachmentName(attachment)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
