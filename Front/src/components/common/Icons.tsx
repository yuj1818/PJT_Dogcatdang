import React from "react";
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
  box-sizing: content-box;
`;

const Line = styled.span`
  width: 12px;
  border: 2px solid #121212;
  border-radius: 2px;
  transform: translate3d(16px, -2px, 0) rotate(45deg);
  background-color: #121212;
  box-sizing: content-box;
`;

export const SearchGlasses = () => (
  <StyledReadingGlasses type="submit" aria-label="검색">
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

const MyBell = styled.div<{ $isNoti: number }>`
  font-size: 30px;
  position: relative;
  transform-origin: top;

  ${(props) =>
    props.$isNoti > 0 &&
    css`
      div {
        animation: ${bellAnimation} 2s infinite linear;
      }
    `}

  p {
    position: absolute;
    top: -6px;
    right: -6px;
    background-color: red;
    border: #f7f4eb 2px solid;
    color: white;
    border-radius: 50%;
    padding: 5px;
    font-size: 16px;
    height: 30px;
    width: 30px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }
`;

export const Bell = ({ isNoti }: { isNoti: number }) => {
  return (
    <MyBell $isNoti={isNoti}>
      <div role="img" aria-label="bell">
        🔔
      </div>
      {isNoti > 0 && <p>{isNoti < 10 ? isNoti : "9+"}</p>}
    </MyBell>
  );
};

const centeringStyles = `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingSpinner = styled.div<{ size: number }>`
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ${centeringStyles} // Add centering styles here

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    margin: ${(props) => `${Math.sqrt(props.size)}px`};
    border: ${(props) => `${Math.sqrt(props.size)}px`} solid transparent;
    border-radius: 50%;
    animation: ${keyframes`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `} 900ms infinite;

    &:nth-child(1) {
      border-top-color: #ab690b;
      border-bottom-color: #f9d29b;
      animation-delay: 100ms;
    }

    &:nth-child(2) {
      border-top-color: #ab690b;
      border-bottom-color: #f9d29b;
      animation-delay: 200ms;
    }

    &:nth-child(3) {
      border-top-color: #ab690b;
      border-bottom-color: #f9d29b;
      animation-delay: 300ms;
    }
  }
`;

export const LoadingIndicator: React.FC<{ size?: number }> = ({
  size = 64,
}) => {
  return (
    <LoadingSpinner size={size}>
      <div></div>
      <div></div>
      <div></div>
    </LoadingSpinner>
  );
};

const ErrorBlockIcon = styled.div`
  font-size: 3rem;
  padding: 0px;
  background-color: #890b35;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AlertIcon: React.FC = () => {
  return <ErrorBlockIcon>🚨</ErrorBlockIcon>;
};

const InfoIconStyle = styled.div`
  font-size: 3rem;
  padding: 0px;
  background-color: #7079ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
`;

export const InfoIcon: React.FC = () => {
  return <InfoIconStyle>!</InfoIconStyle>;
};
