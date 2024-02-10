import { useNavigate, useParams } from "react-router-dom";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { requestArticle } from "../../util/articleAPI";
import { ArticleDetailInterface } from "../../components/articles/ArticleInterface";
import { LoadingOrError } from "./LoadingOrError";
import { queryClient, retryFn } from "../../util/tanstackQuery";
import ArticleContent from "../../components/articles/ArticleContent";
import { Button } from "../../components/common/Button";
import { getUserInfo } from "../../util/uitl";
import { Suspense, lazy, useEffect, useState } from "react";
const ArticleEditor = lazy(
  () => import("../../components/articles/ArticleEditor")
);
import CommentList from "../../components/articles/comments/CommentList";
import CommentForm from "../../components/articles/comments/CommentForm";
import { LoadingIndicator } from "../../components/common/Icons";

const ArticleDetail: React.FC = () => {
  const params = useParams();
  const { boardId } = params;
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery<
    ArticleDetailInterface,
    Error,
    ArticleDetailInterface
  >({
    queryKey: ["articleList", boardId],
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const result = await requestArticle({ signal, boardId });
      return result as ArticleDetailInterface;
    },
    staleTime: 15 * 1000,
    retry: retryFn,
  });
  const { id } = getUserInfo();
  const [modificationMode, setModificationMod] = useState(
    params["*"] === "edit"
  );

  useEffect(() => {
    setModificationMod(params["*"] === "edit");
  }, [params["*"]]);

  const {
    mutate,
    isError: isdeleteEror,
    error: deleteError,
  } = useMutation({
    mutationFn: requestArticle,
    onSuccess: () => {
      // Invalidate the query and navigate on successful delete
      queryClient.invalidateQueries({ queryKey: ["articleList"] });
      navigate("/articles/1");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleDelte = () => {
    mutate({ method: "DELETE", boardId });
  };

  let content;

  if (isError || isLoading) {
    content = (
      <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
    );
  }

  const handleModificaion = () => {
    navigate("edit");
    setModificationMod(true);
  };

  if (data) {
    if (isdeleteEror) {
      content = (
        <LoadingOrError
          isLoading={isLoading}
          isError={isdeleteEror}
          error={deleteError}
        />
      );
    }
    if (!modificationMode) {
      content = (
        <>
          <ArticleContent
            title={data.title}
            content={data.content}
            nickname={data.nickname}
            like={data.like}
            likeCnt={data.likeCnt}
          />
          {id === data!.userId && (
            <>
              <Button $background="#ff0000" onClick={handleDelte}>
                삭제하기
              </Button>

              <Button onClick={handleModificaion}>수정하기</Button>
            </>
          )}
        </>
      );
    } else {
      content = (
        <Suspense fallback={<LoadingIndicator />}>
          <ArticleEditor {...data} />
        </Suspense>
      );
    }
  }

  return (
    <>
      {content}
      {!modificationMode && (
        <>
          <CommentList boardId={boardId!} />
          <CommentForm boardId={boardId!} edit={false} />
        </>
      )}
    </>
  );
};

export default ArticleDetail;
