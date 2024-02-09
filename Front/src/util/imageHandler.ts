import { Cookies } from "react-cookie";
import Resizer from "react-image-file-resizer";
import API from "./axios";
import axios from "axios";

export const resizeFile = async (file: File) =>
  new Promise<File>((res) => {
    Resizer.imageFileResizer(
      file, // target file
      1000, // maxWidth
      1000, // maxHeight
      "JPEG", // compressFormat : Can be either JPEG, PNG or WEBP.
      80, // quality : 0 and 100. Used for the JPEG compression
      0, // rotation
      (uri) => res(uri as File), // responseUriFunc
      "file" // outputType : Can be either base64, blob or file.(Default type is base64)
    );
  });

export const getPresignedURL = async (filename: string) => {
  const cookie = new Cookies();
  const token = cookie.get("U_ID");

  const URL = "api/images/presigned/upload";
  const response = await API.get(URL, {
    method: "GET",
    params: { filename },
    headers: {
      Authorization: token,
    },
  });
  return response.data.url as string;
};

const getFileName = (nickname: string) => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const YYMMDD = year + month + day;
  const randomNumber = Math.ceil(Math.random() * 10000);

  return YYMMDD + nickname + randomNumber;
};
export const imageHandler = async (data: string, nickname: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = data;

  const imageTags = tempDiv.getElementsByTagName("img");
  const firstImgTag = tempDiv.querySelector("img");

  if (!firstImgTag) {
    const error = new Error();
    error.message = "최소 한 장 이상의 사진이 필요합니다.";
    error.name = "게시글 작성 오류";
    throw error;
  }

  const imageURLs = await Promise.all(
    Array.from(imageTags).map(async (imgTag) => {
      const uploadURL = await getPresignedURL(getFileName(nickname));

      const base64ImgData = imgTag.getAttribute("src")!.split(",")[1];
      const binaryData = atob(base64ImgData);
      const formData = new FormData();
      formData.append("file", binaryData);

      try {
        const response = await axios.post(uploadURL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("성공", response);
        return response.data;
      } catch (error) {
        console.log("이미지 업로드 실패", error);
        const err = new Error();
        err.message = "인터넷 연결을 다시 확인하여 주세요";
        err.name = "게시글 업로드 실패";
        throw err;
      }
    })
  );

  for (let i = 0; i < imageURLs.length; i++) {
    imageTags[i].setAttribute("src", imageURLs[i]);
  }

  const thumnailImgURL = firstImgTag?.getAttribute("src") ?? null;

  const tempDivAsString = tempDiv.innerHTML;

  return [tempDivAsString, thumnailImgURL] as string[];
};
