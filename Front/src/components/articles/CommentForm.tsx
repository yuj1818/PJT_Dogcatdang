import { ChangeEvent, useState } from "react";
import { FormContainer, Input } from "../common/Design";
import { Button } from "../common/Button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../util/tanstackQuery";
import { requestComment } from "../../util/articleAPI";

interface Props {
  boardId: string;
  edit: boolean;
  commentId?: number;
}

const CommentForm = ({ boardId, edit, commentId }: Props) => {
  const [comment, setComment] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: requestComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commentList", boardId] });
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    if (data.length <= 255) {
      setComment(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (edit) {
      mutate({ method: "PUT", boardId, commentId });
    } else {
      mutate({ method: "POST", boardId });
    }
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input onChange={handleChange} value={comment} />
      <Button height={2.5} $marginTop={0.5} type="submit">
        {isPending ? "작성 중" : "작성하기"}
      </Button>
    </FormContainer>
  );
};

export default CommentForm;
