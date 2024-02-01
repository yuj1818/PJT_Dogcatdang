import { QueryClient } from "@tanstack/react-query";
import API from "./axios";
// import { imageHandler } from "./imageHandler";
import { AxiosError } from "axios";

export const queryClient = new QueryClient();

function handleAxiosError(error: AxiosError): void {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log("axios error status:", error.response.status);
    console.log("axios error data:", error.response.data);
    console.log("axios error headers:", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.log("axios error request:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("axios error message:", error.message);
  }

  console.log("axios error:", error);
}
export interface ArticlePostData {
  title: string;
  content: string;
  isSaved: boolean;
}

export interface FetchEventsOptions {
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
  const URL = "api/boards";
  let response;
  let proccesedData;
  if (data) {
    if (!data.title.trim()) {
      const error = new Error();
      error.name = "제목이 없습니다.";
      error.message = "제목을 입력하세요";
      throw error;
    }

    if (!data.content.trim()) {
      const error = new Error();
      error.name = "내용이 없습니다.";
      error.message = "내용을 입력하세요";
      throw error;
    }
    // const [content, thumnailImg] = await imageHandler(data.content);
    // proccesedData = { ...data, content, thumnailImg };
    proccesedData = data;
  }

  try {
    if (!method || method === "GET") {
      // 리스트 조회 + 상세 조회
      response = await API.get(boardId ? `${URL}/${boardId}` : URL, {
        signal,
      });
    } else if (method === "POST") {
      if (data?.isSaved) {
        // 등록
        response = await API.post(URL, proccesedData, { signal });
      } else {
        response = await API.post(`${URL}/temporary`, proccesedData, {
          signal,
        });
      }
    } else if (method === "PUT") {
      // 수정
      response = await API.put(URL, proccesedData, { signal });
    } else if (method === "DELETE") {
      // 삭제
      response = await API.delete(`${URL}/${boardId}`, { signal });
    } else if (method === "temporaryDelete") {
      // 임시저장 삭제
      response = await API.delete(`${URL}/${boardId}/temporary`, { signal });
    } else {
      throw Error("잘못된 접근입니다.");
    }

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError);
    throw error;
  }
};
