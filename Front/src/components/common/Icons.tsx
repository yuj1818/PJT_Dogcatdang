import styled, { css, keyframes } from "styled-components";

// 검색 (돋보기) 아이콘
const StyledReadingGlasses = styled.button`
  display: flex;
  flex-direction: column;
  width: 32px;
  height: 32px;
  margin: auto;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Circle = styled.span`
  width: 16px;
  height: 16px;
  border: 4px solid #121212;
  border-radius: 50%;
`;

const Line = styled.span`
  width: 12px;
  border: 2px solid #121212;
  border-radius: 2px;
  transform: translate3d(16px, -2px, 0) rotate(45deg);
  background-color: #121212;
`;

export const ReadingGlasses = () => (
  <StyledReadingGlasses type="submit">
    <Circle />
    <Line />
  </StyledReadingGlasses>
);

// 알림 (종, bell) 아이콘
const bellAnimation = keyframes`
  0%, 50% {
    transform: rotate(0deg);
  }
  5%, 15%, 25%, 35%, 45% {
    transform: rotate(13deg);
  }
  10%, 20%, 30%, 40% {
    transform: rotate(-13deg);
  }
`;

const MyBell = styled.div<{ $isNoti: boolean }>`
  font-size: 30px;
  transform-origin: top;

  ${(props) =>
    props.$isNoti &&
    css`
      animation: ${bellAnimation} 2s infinite linear;
    `}
`;

export const Bell = ({ isNoti }: { isNoti: boolean }) => {
  return (
    <MyBell $isNoti={isNoti}>
      <span role="img" aria-label="bell">
        🔔
      </span>
    </MyBell>
  );
};
