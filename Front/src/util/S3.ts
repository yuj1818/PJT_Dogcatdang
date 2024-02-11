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

const isURL = (str: string) => {
  var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(str);
};

const getPresignedURL = async (filename: string) => {
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

  return YYMMDD + nickname + randomNumber + ".jpeg";
};

const base64toFile = (
  base64String: string,
  filename: string,
  mimeType: string
) => {
  const byteCharacters: string = atob(base64String);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });

  // Create a File from the Blob
  const file = new File([blob], filename, { type: mimeType });

  return file;
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
      const filename = getFileName(nickname);
      const imgSrc = imgTag.getAttribute("src");

      if (isURL(imgSrc!)) {
        return imgSrc?.split("/")[3];
      }
      const base64ImgData = imgSrc?.split(",")[1];
      const [file, uploadURL] = await Promise.allSettled([
        resizeFile(base64toFile(base64ImgData!, filename, "image/jpeg")),
        getPresignedURL(filename),
      ]);
      if (file.status === "fulfilled" && uploadURL.status === "fulfilled") {
        try {
          axios.put(uploadURL.value, file.value, {
            headers: {
              "Content-Type": file.value.type,
            },
          });
          return filename;
        } catch (error) {
          console.log("이미지 업로드 실패", error);
          const err = new Error();
          err.message = "인터넷 연결을 다시 확인하여 주세요";
          err.name = "게시글 업로드 실패";
          throw err;
        }
      } else {
        const error = new Error();
        error.name = "이미지 처리중 에러가 발생하였습니다.";
        error.message =
          uploadURL.status === "rejected"
            ? "업로드 요청 실패"
            : "올바르지 않은 파일";
        throw error;
      }
    })
  );

  for (let i = 0; i < imageURLs.length; i++) {
    imageTags[i].setAttribute(
      "src",
      `https://dogcatdang.s3.ap-northeast-2.amazonaws.com/${imageURLs[i]}`
    );
    imageTags[i].setAttribute("loading", "lazy");
  }

  const thumnailImgURL = firstImgTag?.getAttribute("src") ?? null;

  const tempDivAsString = tempDiv.innerHTML;

  return [tempDivAsString, thumnailImgURL] as string[];
};

interface RequestS3 {
  name: string;
  file: File;
}

export const requestS3 = async ({ name, file }: RequestS3) => {
  const fileName = getFileName(name);
  const [uploadURLResult, resizedFileResult] = await Promise.allSettled([
    getPresignedURL(fileName),
    resizeFile(file),
  ]);

  if (
    uploadURLResult.status === "fulfilled" &&
    resizedFileResult.status === "fulfilled"
  ) {
    axios.put(uploadURLResult.value, resizedFileResult.value, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return `https://dogcatdang.s3.ap-northeast-2.amazonaws.com/${fileName}`;
  } else {
    const error = new Error();
    error.name = "이미지 처리중 에러가 발생하였습니다.";
    error.message =
      uploadURLResult.status === "rejected"
        ? "업로드 요청 실패"
        : "올바르지 않은 파일";
    throw error;
  }
};
