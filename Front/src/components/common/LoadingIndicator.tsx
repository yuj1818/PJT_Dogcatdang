import styled, { keyframes } from "styled-components";

const LoadingSpinner = styled.div<{ size: number }>`
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

const LoadingIndicator: React.FC<{ size: number }> = ({ size }) => {
  return (
    <LoadingSpinner size={size}>
      <div></div>
      <div></div>
      <div></div>
    </LoadingSpinner>
  );
};
export default LoadingIndicator;
