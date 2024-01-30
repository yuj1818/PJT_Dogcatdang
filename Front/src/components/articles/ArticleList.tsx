import styled from "styled-components";

import ArticleCard from "./ArticleCard";
import { ArticleInterface } from "./ArticleInterface";

const ArticleListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Space = styled.div`
  flex-grow: 1;
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
        <ArticleListStyle>
          {data
            .slice(
              (currentPage - 1) * itemsPerPage,
              Math.min(currentPage * itemsPerPage + 1, data!.length)
            )
            .map((element) => (
              <ArticleCard article={element} key={element.boardId} />
            ))}
          <Space></Space>
        </ArticleListStyle>
      ) : (
        <ArticleListStyle>
          {data.map((element) => (
            <ArticleCard article={element} key={element.boardId}></ArticleCard>
          ))}
          <Space></Space>
        </ArticleListStyle>
      )}
    </>
  );
};

export default ArticleList;
