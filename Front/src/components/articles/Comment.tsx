import { useState } from "react";
import { Button } from "../common/Button";
import CommentForm from "./CommentForm";
import styled from "styled-components";

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

  const handleEditButton = () => {
    if (editMode) {
    }
  };

  return (
    <CommentContainer>
      <CommentId>{commentId}</CommentId>
      <CreateDate>{createDate}</CreateDate>
      <Content>{content}</Content>
      {editMode && <CommentForm boardId={boardId} edit={editMode} />}
      <Button onClick={handleEditButton}>{editMode ? "저장" : "수정"}</Button>
    </CommentContainer>
  );
};

export default Comment;
