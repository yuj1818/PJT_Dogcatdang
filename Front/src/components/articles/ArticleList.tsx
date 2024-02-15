import styled from "styled-components";

import ArticleCard from "./ArticleCard";
import { ArticleListInterface } from "./ArticleInterface";

interface Style {
  $perLine: number;
}

const ArticleListStyle = styled.div<Style>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 1rem;

  & > div {
    flex: 0 0 calc(100% / ${(props) => props.$perLine} - 2%);
    box-sizing: border-box;
    margin: 1%;
  }

  & > div:last-child {
    margin-right: auto;
  }
`;

interface Props {
  data: ArticleListInterface[];
  itemsPerPage: number;
  currentPage: number;
  itemsPerLine: number;
}

const ArticleList: React.FC<Props> = ({
  data,
  itemsPerPage,
  currentPage,
  itemsPerLine,
}) => {
  return (
    <>
      <ArticleListStyle $perLine={itemsPerLine}>
        {data
          .slice(
            (currentPage - 1) * itemsPerPage,
            Math.min(currentPage * itemsPerPage, data!.length)
          )
          .map((element) => (
            <ArticleCard article={element} key={element.boardId} />
          ))}
      </ArticleListStyle>
    </>
  );
};

export default ArticleList;
