export interface ArticleInterface {
  boardId: number;
  title: string;
  content: string;
  userId: number;
  userName: string;
  isSave: boolean;
  thumbNailImgUrl: string;
  isSaved: boolean;
}

export interface CommentInterface {
  commentId: number;
  content: string;
  createTime: string;
  nikname: string;
  parentId: null;
  nickname: string;
}
