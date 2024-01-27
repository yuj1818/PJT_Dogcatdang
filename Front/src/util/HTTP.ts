import { QueryClient } from "@tanstack/react-query";
import { ArticleInterface } from "../components/articles/ArticleInterface";
import { API } from "./axios";

export const queryClient = new QueryClient();

interface FetchEventsOptions {
  signal?: AbortSignal;
  boardId?: string;
  data?: ArticleInterface | { title: string; content: string };
  method?: "GET" | "POST" | "PUT" | "DELETE" | "temporary" | "temporaryDelete";
}

export const requestArticle = async ({
  signal,
  boardId,
  data,
  method,
}: FetchEventsOptions) => {
  let response;

  if (!method || method === "GET") {
    response = await API().get(boardId ? `boards/${boardId}` : "boards", {
      signal,
    });
  } else if (method === "POST") {
    response = await API().post("boards", data);
  } else if (method === "PUT") {
    response = await API().put("boards", data);
  } else if (method === "DELETE") {
    response = await API().delete(`boards/${boardId}`);
  } else if (method === "temporary") {
    response = await API().get(`boards/temporary`);
  } else if (method === "temporaryDelete") {
    response = await API().delete(`boards/${boardId}/temporary`);
  } else {
    throw Error("잘못된 접근입니다.");
  }

  return response.data;
};
