import styled from "styled-components";

import ArticleCard from "./ArticleCard";
import { ArticleInterface } from "./ArticleInterface";

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

const ArticleList: React.FC<{
  data: ArticleInterface[];
  itemsPerPage?: number;
  currentPage?: number;
  itemPerRow?: number;
}> = ({ data, itemsPerPage, currentPage, itemPerRow }) => {
  return (
    <>
      {itemPerRow && currentPage && itemsPerPage ? (
        <ArticleListStyle $itemsPerRow={itemPerRow}>
          {data
            .slice(
              (currentPage - 1) * itemsPerPage,
              Math.min(currentPage * itemsPerPage + 1, data!.length)
            )
            .map((element) => (
              <ArticleCard article={element} key={element.boardId} />
            ))}
        </ArticleListStyle>
      ) : (
        <ArticleListStyle $itemsPerRow={5}>
          {data.map((element) => (
            <ArticleCard article={element} key={element.boardId}></ArticleCard>
          ))}
        </ArticleListStyle>
      )}
    </>
  );
};

export default ArticleList;
