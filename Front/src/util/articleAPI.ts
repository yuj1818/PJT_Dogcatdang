import { CommentInterface } from "../components/articles/ArticleInterface";
import API from "./axios";
// import { imageHandler } from "./imageHandler";
import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    // 2XX번이 아닌 상태 코드를 받았다.
    console.log("axios error status:", error.response.status);
    console.log("axios error data:", error.response.data);
    console.log("axios error headers:", error.response.headers);
  } else if (error.request) {
    // 요청은 보내졌으나 응답이 없다.
    console.log("axios error request:", error.request);
  } else {
    // 그 외의 상황
    console.log("axios error message:", error.message);
  }
  console.log("axios error:", error);
};
export interface ArticlePostData {
  title: string;
  content: string;
  isSaved: boolean;
  boardId?: number;
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
      response = await API.put(URL + "/" + data!.boardId!, proccesedData, {
        signal,
      });
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

export interface CommentRequstInterface {
  signal: AbortSignal;
  data?: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  boardId: string;
  commentId?: number;
}

export const requestComment = async ({
  data,
  method,
  boardId,
  commentId,
  signal,
}: CommentRequstInterface) => {
  const URL = `api/${boardId}/comments`;
  let response;

  try {
    if (method === "GET") {
      response = await API.get(URL, { signal });
    } else if (method === "POST") {
      const requestbody = { content: data, boardId };
      response = await API.post(URL, requestbody, { signal });
    } else if (method === "PUT") {
      if (!commentId) {
        console.error("commentId 필요");
        return;
      }
      const requestbody = { content: data, boardId };
      response = await API.put(URL + "/" + boardId, requestbody, { signal });
    } else if (method === "DELETE") {
      response = await API.delete(URL + "/" + boardId, { signal });
    } else {
      throw Error("잘못된 접근입니다.");
    }
    return response.data as CommentInterface[];
  } catch (error) {
    handleAxiosError(error as AxiosError);
  }
};
