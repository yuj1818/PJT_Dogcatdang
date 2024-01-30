import { Suspense, lazy } from "react";
import { LoadingIndicator } from "../../components/common/Icons";

const ArticleEditor = lazy(
  () => import("../../components/articles/ArticleEditor")
);

const ArticleWritePage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ArticleEditor />
    </Suspense>
  );
};

export default ArticleWritePage;

export const articleWriteLoader = () => {
  return true;
};
