import API from "./axios";

export const imageHandler = async (data: string) => {
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

  const images = Array.from(imageTags).map(async (imgTag) => {
    const img = imgTag.getAttribute("src");
    return img;
  });

  const response = await API.post("imgURL", { src: images });
  const imageURLs = response.data.src;

  for (let i = 0; i < images.length; i++) {
    imageTags[i].setAttribute("src", imageURLs[i]);
  }

  const thumnailImgURL = firstImgTag?.getAttribute("src") ?? null;

  const tempDivAsString = tempDiv.innerHTML;
  return [tempDivAsString, thumnailImgURL];
};
