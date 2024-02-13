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
  overflow: hidden;
`;

const NicknameAndLikeCntContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  overflow: hidden;
`;

const NicknameAndLikeCnt = styled.p`
  white-space: nowrap;
`;

const Img = styled.img`
  object-fit: contain;
`;

const ArticleCard: React.FC<{
  article: ArticleListInterface;
}> = (props) => {
  const { boardId, title, thumbnailImgUrl, nickname, likeCnt } = props.article;
  return (
    <CardStyle className="max-w-md mx-auto bg-white rounded-md shadow-md my-4">
      <NavLink
        to={`/articles/detail/${boardId}`}
        style={{ width: "100%" }}
        className="block h-full"
      >
        <Img
          className="w-full h-40 object-cover object-center"
          src={thumbnailImgUrl}
          alt="thumnail"
        />
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <NicknameAndLikeCntContainer>
          <NicknameAndLikeCnt className="text-gray-700 overflow-hidden">
            작성자: {nickname}
          </NicknameAndLikeCnt>
          <NicknameAndLikeCnt className="text-gray-700 overflow-hidden">
            좋아요: {likeCnt}
          </NicknameAndLikeCnt>
        </NicknameAndLikeCntContainer>
      </NavLink>
    </CardStyle>
  );
};

export default ArticleCard;
