import { QueryClient } from "@tanstack/react-query";
import { API } from "./axios";
import { imageHandler } from "./imageHandler";

export const queryClient = new QueryClient();

interface ArticlePostData {
  title: string;
  content: string;
  isSaved: boolean;
}

interface FetchEventsOptions {
  signal?: AbortSignal;
  boardId?: string;
  data?: ArticlePostData;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "temporaryDelete";
}

export const requestArticle = async ({
  signal,
  boardId,
  data,
  method,
}: FetchEventsOptions) => {
  const URL = "boards";
  let response;
  let proccesedData;
  if (data) {
    const [content, thumnailImg] = await imageHandler(data.content);
    proccesedData = { ...data, content, thumnailImg };
  }
  try {
    if (!method || method === "GET") {
      // 리스트 조회 + 상세 조회
      response = await API().get(boardId ? `${URL}/${boardId}` : URL, {
        signal,
      });
    } else if (method === "POST") {
      if (data?.isSaved) {
        // 등록
        response = await API().post(URL, proccesedData, { signal });
      } else {
        response = await API().post(`${URL}/temporary`, proccesedData, {
          signal,
        });
      }
    } else if (method === "PUT") {
      // 수정
      response = await API().put(URL, proccesedData, { signal });
    } else if (method === "DELETE") {
      // 삭제
      response = await API().delete(`${URL}/${boardId}`, { signal });
    } else if (method === "temporaryDelete") {
      // 임시저장 삭제
      response = await API().delete(`${URL}/${boardId}/temporary`, { signal });
    } else {
      throw Error("잘못된 접근입니다.");
    }
    return response.data;
  } catch (error) {
    console.log("axios error:", response);
    throw error;
  }
};
