import { Cookies } from "react-cookie";
import { AxiosError } from "axios";
import API from "./axios";

import {
  ArticleInterface,
  CommentInterface,
} from "../components/articles/ArticleInterface";
import { imageHandler } from "./S3";

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    // 2XX번이 아닌 상태 코드를 받았다.
    console.log("axios error status:", error.response.status);
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
  nickname?: string;
}

export const requestArticle = async ({
  signal,
  boardId,
  data,
  method,
  nickname,
}: FetchEventsOptions) => {
  const cookie = new Cookies();
  const token = cookie.get("U_ID");
  const URL = "api/boards";
  let thumnailImgURL = "";
  let response;
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

    const [imgTagProcessed, imgURL] = await imageHandler(
      data.content,
      nickname!
    );
    data.content = imgTagProcessed;
    thumnailImgURL = imgURL;
  }

  try {
    if (!method || method === "GET") {
      // 리스트 조회 + 상세 조회
      response = await API.get(boardId ? `${URL}/${boardId}` : URL, {
        signal,
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
    } else if (method === "POST") {
      if (data?.isSaved) {
        // 등록
        response = await API.post(
          URL,
          { ...data, thumnailImgURL },
          {
            signal,
            method: "POST",
            headers: {
              Authorization: token,
            },
          }
        );
      } else {
        response = await API.post(
          `${URL}/temporary`,
          { ...data, thumnailImgURL },
          {
            signal,
            method: "POST",
            headers: {
              Authorization: token,
            },
          }
        );
      }
    } else if (method === "PUT") {
      // 수정
      response = await API.put(
        URL + "/" + data!.boardId!,
        { ...data, thumnailImgURL },
        {
          signal,
          method: "PUT",
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (method === "DELETE") {
      // 삭제
      response = await API.delete(`${URL}/${boardId}`, {
        signal,
        method: "PUT",
        headers: {
          Authorization: token,
        },
      });
    } else if (method === "temporaryDelete") {
      // 임시저장 삭제
      response = await API.delete(`${URL}/${boardId}/temporary`, {
        signal,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
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
  signal?: AbortSignal;
  content?: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  boardId: string;
  commentId?: number;
}

export const requestComment = async ({
  content,
  method,
  boardId,
  commentId,
  signal,
}: CommentRequstInterface) => {
  const cookie = new Cookies();
  const token = cookie.get("U_ID");
  const URL = `api/${boardId}/comments`;
  let response;

  try {
    if (method === "GET") {
      response = await API.get(URL, {
        signal,
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
    } else if (method === "POST") {
      const requestbody = { content, boardId };
      response = await API.post(URL, requestbody, {
        signal,
        method: "POST",
        headers: {
          Authorization: token,
        },
      });
    } else if (method === "PUT") {
      if (!commentId) {
        console.error("commentId 필요");
        return;
      }
      const requestbody = { content: content, boardId, commentId };
      response = await API.put(URL + "/" + boardId, requestbody, {
        signal,
        method: "PUT",
        headers: {
          Authorization: token,
        },
      });
    } else if (method === "DELETE") {
      response = await API.delete(URL + "/" + commentId, {
        signal,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
    } else {
      throw Error("잘못된 접근입니다.");
    }
    return response.data as CommentInterface[];
  } catch (error) {
    handleAxiosError(error as AxiosError);
  }
};

interface RequestLikeInterface {
  boardId: string | undefined;
  like: boolean;
}

export const requestLike = async ({ boardId, like }: RequestLikeInterface) => {
  const cookie = new Cookies();
  const token = cookie.get("U_ID");
  const URL = `api/boards/${boardId}/likes`;
  let response;
  try {
    if (like) {
      response = await API.delete(URL, {
        method: "DELTE",
        headers: {
          Authorization: token,
        },
      });
    } else {
      response = await API.post(
        URL,
        {},
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
        }
      );
    }
    return response.data;
  } catch (error) {
    console.log(error);
    const err = new Error();
    err.message = "인터넷 연결을 확인하시고 나중에 다시 시도해 주세요";
    err.name = "인터넷이 불안정합니다.";
    throw err;
  }
};

interface RequestSearchArticleInterface {
  keyword: string;
}

export const requestSearchArticle = async ({
  keyword,
}: RequestSearchArticleInterface) => {
  const cookie = new Cookies();
  const token = cookie.get("U_ID");
  const URL = "api/boards/filter";

  try {
    const respone = await API.post(
      URL,
      { keyword },
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      }
    );
    return respone.data as ArticleInterface[];
  } catch (error) {
    throw error;
  }
};
