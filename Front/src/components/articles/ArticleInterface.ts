export interface ArticleInterface {
  boardId: number;
  title: string;
  content: string;
  userId: number;
  userName: string;
  isSave: boolean;
  thumbnailImgUrl: string;
  isSaved: boolean;
}

export interface ArticleDetailInterface {
  title: string;
  content: string;
  nickname: string;
  like: boolean;
  likeCnt: number;
  userId?: number;
}

export interface ArticleListInterface {
  boardId: number;
  title: string;
  nickname: string;
  thumbnailImgUrl: string;
  likeCnt: number;
}

export interface CommentInterface {
  commentId: number;
  content: string;
  createTime: string;
  nikname: string;
  parentId: null;
  nickname: string;
}
