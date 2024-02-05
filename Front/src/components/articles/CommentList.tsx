import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { requestComment } from "../../util/articleAPI";
import { useParams } from "react-router-dom";
import { retryFn } from "../../util/tanstackQuery";
import { LoadingOrError } from "../../pages/articles/LoadingOrError";
import { CommentInterface } from "./ArticleInterface";

const CommentList = () => {
  const { boardId } = useParams();

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

  return (
    <>
      {(isLoading || isError) && (
        <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
      )}
      {data &&
        data.map((comment: CommentInterface) => (
          <div key={comment.commentId}></div>
        ))}
    </>
  );
};

export default CommentList;
