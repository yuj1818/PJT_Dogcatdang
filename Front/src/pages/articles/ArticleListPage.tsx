import { useEffect, useState } from "react";
import {
  useQuery,
  QueryFunctionContext,
  useMutation,
} from "@tanstack/react-query";

import TextSearch from "../../components/common/TextSearch";
import ArticleList from "../../components/articles/ArticleList";
import Pagination from "../../components/common/Pagination";
import { ArticleListInterface } from "../../components/articles/ArticleInterface";
import {
  requestArticle,
  requestPopular,
  requestSearchArticle,
} from "../../util/articleAPI";
import { LoadingOrError } from "../../components/common/LoadingOrError";
import { retryFn } from "../../util/tanstackQuery";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/common/Button";
import styled from "styled-components";

const HeadContainer = styled.div`
  display: flex;
`;

const ArticleListPage: React.FC = () => {
  const navigate = useNavigate();
  const { searchKey, page } = useParams();
  const currentPage = parseInt(page!);
  const itemsPerPage = 12;
  const [content, setContent] = useState(<></>);
  const itemsPerLine = 4;
  const { data, isLoading, isError, error } = useQuery<
    ArticleListInterface[],
    Error,
    ArticleListInterface[]
  >({
    queryKey: ["articleList"],
    queryFn: async ({
      signal,
    }: QueryFunctionContext): Promise<ArticleListInterface[]> => {
      const result = await requestArticle({ signal });
      return result as ArticleListInterface[];
    },
    staleTime: 5 * 1000,
    retry: retryFn,
    retryDelay: 300,
  });

  const { mutate, isError: isSearchError } = useMutation({
    mutationFn: requestSearchArticle,
    onSuccess: (data: ArticleListInterface[]) => {
      if (data) {
        setContent(
          <ArticleList
            data={data}
            itemsPerPage={itemsPerPage}
            currentPage={1}
            itemsPerLine={itemsPerLine}
          />
        );
      } else {
        const error = new Error();
        error.name = "검색 결과 없음";
        error.message = `${searchKey}에 대한 검색 결과가 존재하지 않습니다.`;
        setContent(
          <>
            <LoadingOrError isLoading={false} isError={true} error={error}>
              <NavLink to="/articles/1">
                <Button background="black">전체 목록 보기</Button>
              </NavLink>
            </LoadingOrError>
          </>
        );
      }
    },
    onError: (error) => {
      <LoadingOrError
        isLoading={false}
        isError={isSearchError}
        error={error}
      />;
    },
  });

  const handlewriteButton = () => {
    navigate("/articles/new");
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/articles/${newPage}`);
  };

  const submitHandler = (searchword: string) => {
    navigate(`/articles/search/${searchword}`);
  };

  useEffect(() => {
    if (searchKey?.trim()) {
      mutate({ keyword: searchKey });
    } else {
      if (isError || isLoading) {
        setContent(
          <LoadingOrError
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        );
      }

      if (data) {
        setContent(
          <ArticleList
            data={data}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            itemsPerLine={itemsPerLine}
          />
        );
      }
    }
  }, [searchKey, isError, isLoading, data, currentPage]);

  return (
    <>
      <PopularArticles />
      <HeadContainer>
        <TextSearch onSubmit={submitHandler} text="입양 후 이야기">
          {" "}
        </TextSearch>
        <Button $paddingX={0.3} $paddingY={0.5} onClick={handlewriteButton}>
          글쓰기
        </Button>
      </HeadContainer>
      {content}
      {data && (
        <Pagination
          totalItems={data!.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default ArticleListPage;

export const PopularArticles: React.FC = ({}) => {
  const { data, isLoading, isError, error } = useQuery<
    ArticleListInterface[],
    Error,
    ArticleListInterface[]
  >({
    queryKey: ["articleList", "popular"],
    queryFn: async ({
      signal,
    }: QueryFunctionContext): Promise<ArticleListInterface[]> => {
      const result = await requestPopular({ signal });
      return result as ArticleListInterface[];
    },
    staleTime: 5 * 1000,
    retry: retryFn,
    retryDelay: 300,
  });
  let content = <></>;
  if (isLoading || isError) {
    content = (
      <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
    );
  }

  if (data) {
    content = (
      <ArticleList
        data={data}
        itemsPerPage={5}
        currentPage={1}
        itemsPerLine={5}
      />
    );
  }
  return <>{content}</>;
};
