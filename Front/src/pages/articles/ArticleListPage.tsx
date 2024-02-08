import { useEffect, useState } from "react";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

import TextSearch from "../../components/common/TextSearch";
import ArticleList from "../../components/articles/ArticleList";
import Pagination from "../../components/common/Pagination";
import { ArticleInterface } from "../../components/articles/ArticleInterface";
import { requestArticle } from "../../util/articleAPI";
import { LoadingOrError } from "./LoadingOrError";
import { retryFn } from "../../util/tanstackQuery";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/common/Button";

const ArticleListPage: React.FC = () => {
  const navigate = useNavigate();
  const { searchKey } = useParams();
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(parseInt(page ?? "1"));
  const itemsPerPage = 12;
  const [content, setContent] = useState(<></>);
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
    retryDelay: 300,
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const submitHandler = (searchword: string) => {
    const searchResult = data!.filter((article) =>
      article.title.includes(searchword)
    );

    setContent(
      <ArticleList
        data={searchResult}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      ></ArticleList>
    );

    navigate(`/articles/search/title=${searchword}`);
  };

  useEffect(() => {
    if (searchKey) {
      return;
    }
    if (isError || isLoading) {
      setContent(
        <>
          <LoadingOrError
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        </>
      );
    }

    if (data) {
      setContent(
        <>
          {/* <h2>인기글</h2>
      <ArticleListStyle $itemsPerRow={5}>
        <PopularArticles articles={articles?.slice(0, 5)} />
      </ArticleListStyle> */}
          <ArticleList
            data={data}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        </>
      );
    }
  }, [data, searchKey]);

  return (
    <>
      <div>
        <TextSearch onSubmit={submitHandler} text="입양 후 이야기" />
      </div>
      {content}
      <div className="flex">
        <Link to="/articles/new" className="ml-auto">
          <Button $paddingX={0.3} $paddingY={0.5}>
            글쓰기
          </Button>
        </Link>
      </div>
      {data && (
        <Pagination
          totalItems={data!.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
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
