import { NavLink } from "react-router-dom";
import { ArticleInterface } from "./ArticleInterface";
import styled from "styled-components";

const CardStyle = styled.div<{ $itemsPerRow: number }>`
  flex-basis: ${(props) => `calc(${100 / props.$itemsPerRow}%)`};
  display: flex;
  align-items: center;
  flex-direction: column;
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
      <NavLink to={`/articles/${boardId}`} className="block h-full">
        <img
          className="w-full h-40 object-cover object-center"
          src={thumbNailImgUrl}
          alt={title}
        />
        <div className="p-4">
          <h4 className="text-xl font-bold mb-2">{title}</h4>
          <p className="text-gray-700">{userName}</p>
        </div>
      </NavLink>
    </CardStyle>
  );
};

export default ArticleCard;
