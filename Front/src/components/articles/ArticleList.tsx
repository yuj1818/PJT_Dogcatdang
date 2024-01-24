import { NavLink } from "react-router-dom";

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
    <div>
      <NavLink to={`/articles/${boardId}`}>
        <h5>{title}</h5>
      </NavLink>
      <p>{thumbnailImgName}</p>
      <p>{userName}</p>
    </div>
  );
};

export default ArticleList;
