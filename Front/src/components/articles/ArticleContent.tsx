import styled from "styled-components";
import tw from "tailwind-styled-components";
import { ArticleDetailInterface } from "./ArticleInterface";
import Likes from "./Likes";

const Container = tw.div`
  max-w p-6 bg-white shadow-md rounded-md"
`;

const Title = tw.h2`
  text-3xl font-bold mb-4
`;

const LineStyle = styled.div`
  position: relative;
  height: 1rem;

  div {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: black;
  }
`;

const ContentContainer = styled.div`
  img {
    margin: 0 auto;
  }
`;

const Nickname = styled.span``;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Line = () => {
  return (
    <LineStyle>
      <div />
    </LineStyle>
  );
};

const ArticleContent: React.FC<ArticleDetailInterface> = ({
  title,
  content,
  nickname,
  like,
  likeCnt,
}) => {
  return (
    <Container>
      <HeadContainer>
        <Title>{title}</Title>
        <Nickname>{nickname}</Nickname>
      </HeadContainer>
      <Line />
      <ContentContainer></ContentContainer>
      <div
        className="leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div>
      <Likes like={like} likeCnt={likeCnt} />
    </Container>
  );
};

export default ArticleContent;
