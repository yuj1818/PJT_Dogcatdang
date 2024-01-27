import styled, { keyframes } from "styled-components";

const LoadingSpinner = styled.div`
  z-index: 9000;
  width: 100%;
  display: flex;
  height: 64px;
  justify-content: center;
  align-items: center;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid transparent;
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

export default function LoadingIndicator() {
  return (
    <LoadingSpinner>
      <div></div>
      <div></div>
      <div></div>
    </LoadingSpinner>
  );
}
