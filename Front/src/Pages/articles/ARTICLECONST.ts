export const ARTICLESCONST = [
  {
    boardId: 1,
    title: "제목1",
    content: "내용내용",
    thumbNailImgUrl: "img.png",
    userId: 1,
    userName: "유저1",
    imageList: [
      {
        sequence: 1,
        imgName: "Dwa",
        originImaName: "fwa.png",
        imgUrl: "FAwfwa",
        thumbnail: true,
      },
    ],
  },
];
for (let i = 2; i < 101; i++) {
  ARTICLESCONST.push({
    boardId: i,
    title: `제목${i}`,
    content: `내용내용${i}`,
    thumbNailImgUrl: `img${i}.png`,
    userId: i,
    userName: `유저${i}`,
    imageList: [
      {
        sequence: i,
        imgName: `img${i}`,
        originImaName: `img${i}`,
        imgUrl: `img${i}.png`,
        thumbnail: true,
      },
    ],
  });
}
