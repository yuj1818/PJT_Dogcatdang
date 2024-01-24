export const ARTICLESCONST = [
  {
    boardId: 1,
    title: "제목1",
    content: "내용내용",
    thumbnailImgName: "img.png",
    userId: 1,
    userName: "유저1",
  },
];
for (let i = 2; i < 101; i++) {
  ARTICLESCONST.push({
    boardId: i,
    title: `제목${i}`,
    content: `내용내용${i}`,
    thumbnailImgName: `img${i}.png`,
    userId: i,
    userName: `유저${i}`,
  });
}
