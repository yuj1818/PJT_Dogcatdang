import { NavLink } from "react-router-dom";
import { ArticleListInterface } from "./ArticleInterface";
import styled from "styled-components";

const CardStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.3rem;
  margin: 0.2rem;
  text-align: center;
  width: 100%;
`;

const NicknameAndLikeCnt = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ArticleCard: React.FC<{
  article: ArticleListInterface;
}> = (props) => {
  const { boardId, title, thumbnailImgUrl, nickname, likeCnt } = props.article;
  return (
    <CardStyle className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md my-4">
      <NavLink
        to={`/articles/detail/${boardId}`}
        style={{ width: "100%" }}
        className="block h-full"
      >
        <img
          className="w-full h-40 object-cover object-center"
          src={thumbnailImgUrl}
          alt="thumnail"
        />
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <NicknameAndLikeCnt>
          <span className="text-gray-700">작성자: {nickname}</span>
          <span>좋아요: {likeCnt}</span>
        </NicknameAndLikeCnt>
      </NavLink>
    </CardStyle>
  );
};

export default ArticleCard;
