import { NavLink } from "react-router-dom";
import { ArticleInterface } from "./ArticleInterface";

const ArticleCard: React.FC<{
  article: ArticleInterface;
}> = (props) => {
  const { boardId, title, thumbNailImgUrl, userName } = props.article;
  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md my-4">
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
    </div>
  );
};

export default ArticleCard;
