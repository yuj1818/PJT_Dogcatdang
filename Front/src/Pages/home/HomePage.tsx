import tw from "tailwind-styled-components";

const Button = tw.button`
    w-60
    p-2
    bg-indigo-600
    rounded-xl
    text-white
    font-bold
    text-lg

    hover:bg-indigo-800
    hover:scale-105
    hover:transition
`;

const MainPage: React.FC = () => {
  // HTTP 요청
  return (
    <>
      <h2>실시간 방송중</h2>
      <h2>함께해서 행복해요</h2>
      <h2>공지사항</h2>
      <h2>가족이 되어 주세요</h2>
    </>
  );
};

export default MainPage;
