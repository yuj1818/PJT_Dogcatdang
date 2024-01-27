import { QueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ArticleInterface } from "../components/articles/ArticleInterface";
import { API } from "./index";

export const queryClient = new QueryClient();
interface FetchEventsOptions {
  signal: AbortSignal;
  boardId?: string;
}

export async function requestArticle({ signal, boardId }: FetchEventsOptions) {
  const response: AxiosResponse<ArticleInterface[] | ArticleInterface> =
    await API().get(boardId ? `boards/${boardId}` : "boards", { signal });

  if (response.status !== 200) {
    const { status, data } = response;
    console.error(status);
    console.error(data);
    return;
  }

  return response.data;
}
