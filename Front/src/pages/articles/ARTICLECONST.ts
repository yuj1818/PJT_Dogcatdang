export const ARTICLESCONST = [
  {
    boardId: 1,
    title: "제목1",
    content: "내용내용",
    userId: 1,
    userName: "유저1",
    isSave: true,
    thumbNailImgUrl: "abc.png",
  },
];
for (let i = 2; i < 101; i++) {
  ARTICLESCONST.push({
    boardId: i,
    title: `제목${i}`,
    content: `내용내용${i}`,
    userId: i,
    userName: `유저${i}`,
    isSave: true,
    thumbNailImgUrl: "abc.png",
  });
}
