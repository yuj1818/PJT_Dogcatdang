import { useNavigate, useParams } from "react-router-dom";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { requestArticle } from "../../util/articleAPI";
import { ArticleInterface } from "../../components/articles/ArticleInterface";
import { LoadingOrError } from "./LoadingOrError";
import { queryClient, retryFn } from "../../util/tanstackQuery";
import ArticleContent from "../../components/articles/ArticleContent";
import { Button } from "../../components/common/Design";
import { getUserInfo } from "../../util/uitl";
import { useState } from "react";
import ArticleEditor from "../../components/articles/ArticleEditor";
import CommentList from "../../components/articles/CommentList";

const ArticleDetail: React.FC = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery<
    ArticleInterface,
    Error,
    ArticleInterface
  >({
    queryKey: ["articleList", boardId],
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const result = await requestArticle({ signal, boardId });
      return result as ArticleInterface;
    },
    staleTime: 15 * 1000,
    retry: retryFn,
  });
  const { id } = getUserInfo();
  const [modificationMode, setModificationMod] = useState(false);

  const {
    mutate,
    isError: isdeleteEror,
    error: deleteError,
  } = useMutation({
    mutationFn: requestArticle,
    onSuccess: () => {
      // Invalidate the query and navigate on successful delete
      queryClient.invalidateQueries({ queryKey: ["articleList"] });
      navigate("/articles");
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
          <ArticleContent title={data.title} content={data.content} />
          <Button onClick={handleDelte}>삭제하기</Button>
          {id === data.userId && (
            <Button onClick={handleModificaion}>수정하기</Button>
          )}
        </>
      );
    } else {
      content = <ArticleEditor {...data} />;
    }
  }

  return (
    <>
      {content}
      <CommentList></CommentList>
    </>
  );
};

export default ArticleDetail;
