import React, { FormEvent, useRef, useState } from "react";
import TextSearch from "../../components/common/TextSearch";
import { NavLink } from "react-router-dom";
import ArticleListStyle from "../../components/articles/ArticleListStyle";
import { ARTICLESCONST } from "./ARTICLECONST";
import Pagination from "../../components/articles/Pagination";

const ArticleListPage: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(searchRef.current!.value);
  };

  return (
    <>
      <h2>인기글</h2>
      <ArticleListStyle $itemsPerRow={5}>
        <PopularArticles />
      </ArticleListStyle>
      <div>
        <TextSearch
          searchRef={searchRef}
          onSubmit={submitHandler}
          text="입양 후 이야기"
        />
      </div>
      <ArticleListStyle $itemsPerRow={4}>
        {ARTICLESCONST.slice(
          (currentPage - 1) * itemsPerPage,
          Math.min(currentPage * itemsPerPage + 1, ARTICLESCONST.length)
        ).map((element) => (
          <ArticleList article={element} key={element.boardId} />
        ))}
      </ArticleListStyle>
      <Pagination
        totalItems={ARTICLESCONST.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ArticleListPage;

// 인기글 5개
const PopularArticles: React.FC = () => {
  return (
    <>
      {ARTICLESCONST.slice(0, 5).map((element) => (
        <ArticleList article={element} key={element.boardId} />
      ))}
    </>
  );
};

// 전체 글 목록
const ArticleList: React.FC<{
  article: {
    boardId: number;
    title: string;
    thumbnailImgName: string;
    userName: string;
  };
}> = (props) => {
  const { boardId, title, thumbnailImgName, userName } = props.article;
  return (
    <>
      <div>
        <NavLink to={`${boardId}`}>
          <h5>{title}</h5>
        </NavLink>
        <p>{thumbnailImgName}</p>
        <p>{userName}</p>
      </div>
    </>
  );
};
