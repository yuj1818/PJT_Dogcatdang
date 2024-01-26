interface ImageList {
  sequence: number;
  imgName: string;
  originImaName: null | string;
  imgUrl: string;
  thumbnail: boolean;
}

export interface ArticleInterface {
  boardId: number;
  title: string;
  content: string;
  thumbNailImgUrl: string;
  imageList: ImageList[];
  userId: number;
  userName: string;
}
