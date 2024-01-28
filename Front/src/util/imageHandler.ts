import { API } from "./axios";

export const imageHandler = async (data: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = data;

  const imageTags = tempDiv.getElementsByTagName("img");

  const imagePromises = Array.from(imageTags).map(async (imgTag, idx) => {
    const img = imgTag.getAttribute("src");
    return API()
      .post("boards/img", { src: img })
      .then((response) => {
        imgTag.setAttribute("src", `${response.data.src}`);
        return { status: "fulfilled", value: response };
      })
      .catch((error: unknown) => {
        imgTag.setAttribute("src", `${idx}`);
        return error;
      });
  });

  await Promise.allSettled(imagePromises);

  const tempDivAsString = tempDiv.innerHTML;
  const firstImgTag = tempDiv.querySelector("img");
  const thumnailImg = firstImgTag?.getAttribute("src") ?? null;

  if (thumnailImg) {
    return [tempDivAsString, firstImgTag];
  }
  const error = new Error();
  error.message = "최소 한 장 이상의 사진이 필요합니다.";
  error.name = "게시글 작성 오류";
  throw error;
};
