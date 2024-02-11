import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { retryFn } from "../../util/tanstackQuery";
import { ArticleInterface } from "../../components/articles/ArticleInterface";
import { requestArticle } from "../../util/articleAPI";
import ArticleList from "../../components/articles/ArticleList";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "../../components/common/Button";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const MoreButton = tw(Button)`
absolute
right-0
`;

const Title = tw.h2`
  text-3xl font-bold mb-4 border-b-2 border-amber-300 pb-2
`;
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
    <Container>
      <Title>
        실시간 방송중
        <NavLink to="/broadcast/list">
          <MoreButton>더 보러 가기</MoreButton>
        </NavLink>
      </Title>
      <Title>
        함께해서 행복해요 - 근황 게시글
        <NavLink to="/articles/1">
          <MoreButton>더 보러 가기</MoreButton>
        </NavLink>
      </Title>

      {data && <ArticleList data={data} itemsPerPage={4} currentPage={1} />}
      <Title>가족이 되어 주세요</Title>
    </Container>
  );
};

export default MainPage;
