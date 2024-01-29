import { useParams } from "react-router-dom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import ArticleList from "../../components/articles/ArticleList";
import { requestArticle } from "../../util/HTTP";
import { ArticleInterface } from "../../components/articles/ArticleInterface";
import { LoadingOrError } from "./LoadingOrError";
import { ARTICLESCONST } from "./ARTICLECONST";
import { retryFn } from "../../util/tanstackQuery";

const ArticleDetail: React.FC = () => {
  const { boardId } = useParams();
  const { data, isLoading, isError, error } = useQuery<
    ArticleInterface,
    Error,
    ArticleInterface
  >({
    queryKey: ["articleList"],
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const result = await requestArticle({ signal, boardId });
      return result as ArticleInterface;
    },
    staleTime: 15 * 1000,
    retry: retryFn,
  });

  let content;

  if (isError || isLoading) {
    content = (
      <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
    );
  }

  if (data) {
    content = (
      <>
        <h2>{data.boardId}번 게시글입니다.</h2>
        <h3>{data.title}</h3>
        <p>{data.content}</p>
      </>
    );
  }

  return (
    <>
      {content}
      <ArticleList data={ARTICLESCONST.slice(0, 5)} />
    </>
  );
};

export default ArticleDetail;
