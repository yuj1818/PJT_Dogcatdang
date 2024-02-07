import styled from "styled-components";

interface buttonInterface {
  background?: string;
  color?: string;
  fontSize?: number;
  height?: number;
  width?: number;
  marginTop?: number;
  paddingX?: number;
  paddingY?: number;
  fontFamily?: string;
}

export const Button = styled.button<buttonInterface>`
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.background || "#FF8331"};
  color: ${(props) => props.color || "white"};
  font-size: ${(props) => `${props.fontSize || 1}rem`};
  padding: ${(props) => props.paddingY === 0 || props.paddingY ? `${props.paddingY}rem` : '0.2rem'} ${(props) => props.paddingX === 0 || props.paddingX ?  `${props.paddingX}rem` : '0.4rem'};
  white-space: nowrap;
  height: ${(props) => props.height ? `${props.height}rem` : "auto"};
  width: ${(props) => props.width ? `${props.width}rem` : "auto"};
  margin-top: ${(props) => props.marginTop === 0 || props.marginTop ? `${props.marginTop}rem` : "auto"};
  font-family: ${(props) => props.fontFamily || "Pretendard-600"};

  &:hover {
    box-shadow: 3.5px 3.5px 3.5px lightgrey;
  }
`;
