import { useLocation } from "react-router-dom";
import ArticleList from "../../components/articles/ArticleList";
import ArticleListStyle from "../../components/articles/ArticleListStyle";
import { ARTICLESCONST } from "./ARTICLECONST";

const ArticleDetail: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");

  const detail = {
    boardId: pathSegments[pathSegments.length - 1],
    title: "제목",
    content: "내용내용",
    imageList: [
      {
        isThumbnail: true,
        sequence: 0,
        imgUrl: "img.png",
        boardId: 1,
      },
      {
        isThumbnail: false,
        sequence: 1,
        imgUrl: "img1.png",
        boardId: 1,
      },
    ],
    userId: 1,
    userName: "유저1",
  };

  return (
    <>
      <h2>{detail.boardId}번 게시글입니다.</h2>
      <h3>{detail.title}</h3>
      <p>{detail.content}</p>
      {detail.imageList.map((element) => (
        <img src={element.imgUrl} key={element.sequence} />
      ))}
      <ArticleListStyle $itemsPerRow={4}>
        {ARTICLESCONST.slice(0, 4).map((article) => (
          <ArticleList article={article} key={article.boardId} />
        ))}
      </ArticleListStyle>
    </>
  );
};

export default ArticleDetail;
