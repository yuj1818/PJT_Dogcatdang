import { useParams } from "react-router-dom";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import ArticleList from "../../components/articles/ArticleList";
import { requestArticle } from "../../util/HTTP";
import { ArticleInterface } from "../../components/articles/ArticleInterface";
import { LoadingOrError } from "./LoadingOrError";
import { ARTICLESCONST } from "./ARTICLECONST";

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
        {data.imageList.map((element) => (
          <img src={element.imgUrl} key={element.sequence} />
        ))}
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
