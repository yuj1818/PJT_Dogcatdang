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
  createDate: string;
  nikname: string;
  parentId: null;
}
