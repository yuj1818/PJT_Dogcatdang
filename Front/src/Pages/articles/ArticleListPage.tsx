import React, { FormEvent, useRef, useState } from "react";
import TextSearch from "../../components/common/TextSearch";
import ArticleListStyle from "../../components/articles/ArticleListStyle";
import Pagination from "../../components/articles/Pagination";
import { ArticleInterface } from "../../components/articles/ArticleInterface";
import { requestArticleList } from "../../util/HTTPArticles";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import ArticleList from "../../components/articles/ArticleList";

const ArticleListPage: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const { data: articles, isLoading } = useQuery<
    ArticleInterface[],
    Error,
    ArticleInterface[]
  >({
    queryKey: ["articleList"],
    queryFn: async ({
      signal,
    }: QueryFunctionContext): Promise<ArticleInterface[]> => {
      const result = await requestArticleList({ signal });
      return result || [];
    },
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(searchRef.current!.value);
  };

  return (
    <>
      {!isLoading ? (
        <>
          {/* <h2>인기글</h2>
          <ArticleListStyle $itemsPerRow={5}>
            <PopularArticles articles={articles?.slice(0, 5)} />
          </ArticleListStyle> */}
          <div>
            <TextSearch
              searchRef={searchRef}
              onSubmit={submitHandler}
              text="입양 후 이야기"
            />
          </div>
          <ArticleListStyle $itemsPerRow={4}>
            {articles!
              .slice(
                (currentPage - 1) * itemsPerPage,
                Math.min(currentPage * itemsPerPage + 1, articles!.length)
              )
              .map((element) => (
                <ArticleList article={element} key={element.boardId} />
              ))}
          </ArticleListStyle>
          <Pagination
            totalItems={articles!.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        "Loading..."
      )}
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
