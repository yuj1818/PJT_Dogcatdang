import { NavLink } from "react-router-dom";
import { ArticleInterface } from "./ArticleInterface";

const ArticleList: React.FC<{
  article: ArticleInterface;
}> = (props) => {
  const { boardId, title, thumbNailImgUrl, userName } = props.article;
  return (
    <div>
      <NavLink to={`/articles/${boardId}`}>
        <h5>{title}</h5>
        <img src={thumbNailImgUrl} alt="" />
      </NavLink>
      <p>{userName}</p>
    </div>
  );
};

export default ArticleList;
