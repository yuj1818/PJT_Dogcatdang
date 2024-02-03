import { FormEvent, useRef, useState } from "react";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

import TextSearch from "../../components/common/TextSearch";
import ArticleList from "../../components/articles/ArticleList";
import Pagination from "../../components/common/Pagination";
import { ArticleInterface } from "../../components/articles/ArticleInterface";
import { requestArticle } from "../../util/articleAPI";
import { LoadingOrError } from "./LoadingOrError";
import { retryFn } from "../../util/tanstackQuery";
import { Link } from "react-router-dom";

const ArticleListPage: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const { data, isLoading, isError, error } = useQuery<
    ArticleInterface[],
    Error,
    ArticleInterface[]
  >({
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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(searchRef.current!.value);
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
        {/* <h2>인기글</h2>
    <ArticleListStyle $itemsPerRow={5}>
      <PopularArticles articles={articles?.slice(0, 5)} />
    </ArticleListStyle> */}
        <ArticleList
          data={data}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          itemPerRow={4}
        />
        <Pagination
          totalItems={data!.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </>
    );
  }

  return (
    <>
      <Link to="new">글쓰기</Link>
      <div>
        <TextSearch
          searchRef={searchRef}
          onSubmit={submitHandler}
          text="입양 후 이야기"
        />
      </div>
      {content}
    </>
  );
};

export default ArticleListPage;

// 인기글 5개
// const PopularArticles: React.FC<{ articles: ArticleInterface[] }> = ({
//   articles,
// }) => {
//   return (
//     <>
//       {articles.slice(0, 5).map((element) => (
//         <ArticleList article={element} key={element.boardId} />
//       ))}
//     </>
//   );
// };
