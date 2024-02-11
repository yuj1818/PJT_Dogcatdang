import styled from "styled-components";

import ArticleCard from "./ArticleCard";
import { ArticleListInterface } from "./ArticleInterface";

const ArticleListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    flex: 0 0 calc(25% - 2%);
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
}

const ArticleList: React.FC<Props> = ({ data, itemsPerPage, currentPage }) => {
  console.log(data);
  return (
    <>
      <ArticleListStyle>
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
