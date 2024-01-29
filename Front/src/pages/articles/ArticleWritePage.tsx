import ArticleEditor from "../../components/articles/ArticleEditor";

const ArticleWritePage = () => {
  return (
    <>
      <ArticleEditor />
    </>
  );
};

export default ArticleWritePage;

export const articleWriteLoader = () => {
  return true;
};
