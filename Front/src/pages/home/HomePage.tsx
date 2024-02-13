import styled from "styled-components";
import tw from "tailwind-styled-components";

import { NavLink } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { PopularArticles } from "../articles/ArticleListPage";

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
  return (
    <Container>
      <Title>
        실시간 방송중
        <NavLink to="/broadcast/list">
          <MoreButton>더 보러 가기</MoreButton>
        </NavLink>
      </Title>
      <Title>
        함께해서 행복해요 - 인기 근황 게시글
        <NavLink to="/articles/1">
          <MoreButton>더 보러 가기</MoreButton>
        </NavLink>
      </Title>
      <PopularArticles />
      <Title>
        가족이 되어 주세요
        <NavLink to="/save-animals">
          <MoreButton>더 보러 가기</MoreButton>
        </NavLink>
      </Title>
    </Container>
  );
};

export default MainPage;
