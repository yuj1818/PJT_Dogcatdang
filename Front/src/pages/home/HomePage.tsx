import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { retryFn } from "../../util/tanstackQuery";
import { ArticleInterface } from "../../components/articles/ArticleInterface";
import { requestArticle } from "../../util/articleAPI";
import ArticleList from "../../components/articles/ArticleList";

const MainPage: React.FC = () => {
  const { data } = useQuery<ArticleInterface[], Error, ArticleInterface[]>({
    queryKey: ["articleList"],
    queryFn: async ({
      signal,
    }: QueryFunctionContext): Promise<ArticleInterface[]> => {
      const result = await requestArticle({ signal });
      return result as ArticleInterface[];
    },
    staleTime: 5 * 1000,
    retry: retryFn,
    retryDelay: 100,
  });
  return (
    <>
      <h2>실시간 방송중</h2>
      <h2>함께해서 행복해요</h2>
      {data && <ArticleList data={data} itemsPerPage={4} currentPage={1} />}
      <h2>가족이 되어 주세요</h2>
    </>
  );
};

export default MainPage;
