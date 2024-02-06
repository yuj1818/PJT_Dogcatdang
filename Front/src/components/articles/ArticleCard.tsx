import { NavLink } from "react-router-dom";
import { ArticleInterface } from "./ArticleInterface";
import styled from "styled-components";

const CardStyle = styled.div<{ $itemsPerRow: number }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.3rem;
  margin: 0.2rem;
  text-align: center;
`;

const ArticleCard: React.FC<{
  article: ArticleInterface;
}> = (props) => {
  const { boardId, title, thumbNailImgUrl, userName } = props.article;
  return (
    <CardStyle
      $itemsPerRow={4}
      className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md my-4"
    >
      <NavLink to={`/articles/detail/${boardId}`} className="block h-full">
        <img
          className="w-full h-40 object-cover object-center"
          src={thumbNailImgUrl}
          alt={title}
        />
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-700">{userName}</p>
      </NavLink>
    </CardStyle>
  );
};

export default ArticleCard;
