import { useState } from "react";
import { Button } from "../common/Button";
import CommentForm from "./CommentForm";
import styled from "styled-components";
import { requestComment } from "../../util/articleAPI";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../util/tanstackQuery";

export interface CommentData {
  boardId: string;
  commentId: number;
  content: string;
  createDate: string;
}

const CommentContainer = styled.div`
  border: 1px solid #e2e8f0;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentId = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CreateDate = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.5rem;
`;

const Content = styled.p`
  margin-bottom: 1rem;
`;

const Comment: React.FC<CommentData> = ({
  commentId,
  content,
  createDate,
  boardId,
}) => {
  const [editMode, setEditMode] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: requestComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commentList", boardId] });
    },
  });

  const handleEditButton = () => {
    setEditMode((prev) => !prev);
  };

  const handleDelete = () => {
    mutate({ method: "DELETE", boardId, commentId });
  };

  return (
    <CommentContainer>
      <CommentId>{commentId}</CommentId>
      <CreateDate>{createDate}</CreateDate>
      <Content>{content}</Content>
      {editMode ? (
        <CommentForm boardId={boardId} edit={editMode} />
      ) : (
        <Button onClick={handleEditButton}>수정</Button>
      )}
      <button onClick={handleDelete}>{isPending ? "-" : "X"}</button>
    </CommentContainer>
  );
};

export default Comment;
