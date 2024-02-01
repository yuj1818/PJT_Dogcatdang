import { useNavigate, useParams } from "react-router-dom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { queryClient, requestArticle } from "../../util/articleAPI";
import { ArticleInterface } from "../../components/articles/ArticleInterface";
import { LoadingOrError } from "./LoadingOrError";
import { retryFn } from "../../util/tanstackQuery";
import ArticleContent from "../../components/articles/ArticleContent";
import { Button } from "../../components/common/CommonComponents";

const ArticleDetail: React.FC = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery<
    ArticleInterface,
    Error,
    ArticleInterface
  >({
    queryKey: ["articleList", boardId],
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const result = await requestArticle({ signal, boardId });
      return result as ArticleInterface;
    },
    staleTime: 15 * 1000,
    retry: retryFn,
  });

  const handleDelte = () => {
    requestArticle({ method: "DELETE", boardId });
    queryClient.invalidateQueries({ queryKey: ["articleList"] });
    navigate("/articles");
  };

  let content;

  if (isError || isLoading) {
    content = (
      <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
    );
  }

  if (data) {
    content = (
      <>
        <ArticleContent title={data.title} content={data.content} />
        <Button onClick={handleDelte}>삭제하기</Button>
      </>
    );
  }

  return <>{content}</>;
};

export default ArticleDetail;
