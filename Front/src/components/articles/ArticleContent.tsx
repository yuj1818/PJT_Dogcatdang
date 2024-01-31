import styled from "styled-components";
import tw from "tailwind-styled-components";

interface ArticleContentInterface {
  title: string;
  content: string;
}

const Container = tw.div`
  max-w p-6 bg-white shadow-md rounded-md
`;

const Title = tw.h2`
  text-3xl font-bold mb-4
`;

const LineStyle = styled.div`
  position: relative;
  height: 100px;

  div {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: black;
    transform-origin: 0 50%;
    transform: translateY(-50%);
  }
`;

const Line = () => {
  return (
    <LineStyle>
      <div />
    </LineStyle>
  );
};

const ArticleContent: React.FC<ArticleContentInterface> = ({
  title,
  content,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Line />
      <div
        className="leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div>
    </Container>
  );
};

export default ArticleContent;
