import styled from "styled-components";

const ArticleListStyle = styled.div<{ $itemsPerRow: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  div {
    flex-basis: ${(props) => `calc(${100 / props.$itemsPerRow}%)`};
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

export default ArticleListStyle;
