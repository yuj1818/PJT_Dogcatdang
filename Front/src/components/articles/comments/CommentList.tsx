import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { requestComment } from "../../../util/articleAPI";
import { retryFn } from "../../../util/tanstackQuery";
import { LoadingOrError } from "../../../pages/articles/LoadingOrError";
import { CommentInterface } from "../ArticleInterface";
import Comment from "./Comment";
import tw from "tailwind-styled-components";

const Container = tw.div`
 mt-2 p-4 bg-white rounded-md shadow-md
`;

interface Props {
  boardId: string;
}

const CommentList = ({ boardId }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    CommentInterface[],
    Error,
    CommentInterface[]
  >({
    queryKey: ["commentList", boardId],
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const result = await requestComment({
        signal,
        method: "GET",
        boardId: boardId!,
      });
      return result as CommentInterface[];
    },
    staleTime: 15 * 1000,
    retry: retryFn,
  });

  console.log(data);
  return (
    <Container>
      {(isLoading || isError) && (
        <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
      )}
      {data && data.length > 0 ? (
        data.map((comment: CommentInterface) => (
          <Comment key={comment.commentId} boardId={boardId} {...comment} />
        ))
      ) : (
        <p>작성된 댓글이 없습니다. 첫 번째 댓글을 작성해 보세요!</p>
      )}
    </Container>
  );
};

export default CommentList;
