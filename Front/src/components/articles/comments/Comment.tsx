import { useState } from "react";
import CommentForm from "./CommentForm";
import styled from "styled-components";
import { requestComment } from "../../../util/articleAPI";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../util/tanstackQuery";
import tw from "tailwind-styled-components";

const CommentContainer = styled.div`
  border: 1px solid #e2e8f0;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CreateDate = styled.p`
  font-size: 0.5rem;
  color: #718096;
  align-self: center;
  margin-right: 0.4rem;
`;

const Content = styled.p`
  margin-bottom: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = tw.div`
  flex justify-end
`;

const Gutter = styled.span`
  margin: 0.3rem;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export interface CommentData {
  boardId: string;
  commentId: number;
  content: string;
  createTime: string;
  nickname: string;
}

const Comment: React.FC<CommentData> = ({
  commentId,
  content,
  createTime,
  boardId,
  nickname,
}) => {
  const [editMode, setEditMode] = useState(false);
  const inputDate = new Date(createTime);
  const formattedDate = `${inputDate.getFullYear()}-${String(
    inputDate.getMonth() + 1
  ).padStart(2, "0")}-${String(inputDate.getDate()).padStart(2, "0")} ${String(
    inputDate.getHours()
  ).padStart(2, "0")}:${String(inputDate.getMinutes()).padStart(2, "0")}`;

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
      <Header>
        <Nickname>{nickname}</Nickname>
        <HeadContainer>
          <CreateDate>{formattedDate}</CreateDate>
          <ButtonContainer>
            {editMode ? (
              <CommentForm
                boardId={boardId}
                edit={editMode}
                commentId={commentId}
                onDelete={() => {
                  setEditMode(false);
                }}
              />
            ) : (
              <button onClick={handleEditButton}>수정</button>
            )}
            <Gutter>|</Gutter>
            <button onClick={handleDelete}>{isPending ? "..." : "삭제"}</button>
          </ButtonContainer>
        </HeadContainer>
      </Header>

      <Content>{content}</Content>
    </CommentContainer>
  );
};

export default Comment;
