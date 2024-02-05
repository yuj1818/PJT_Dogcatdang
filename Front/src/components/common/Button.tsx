import styled from "styled-components";

interface buttonInterface {
  background?: string;
  color?: string;
  fontSize?: number;
  height?: number;
  marginTop?: number;
}

export const Button = styled.button<buttonInterface>`
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.background || "#FF8331"};
  color: ${(props) => props.color || "white"};
  font-size: ${(props) => `${props.fontSize}rem` || "16px"};
  padding: 0.2rem 0.4rem;
  white-space: nowrap;
  height: ${(props) => `${props.height}rem` || "auto"};
  margin-top: ${(props) => `${props.marginTop}rem` || "auto"};

  &:hover {
    box-shadow: 3.5px 3.5px 3.5px lightgrey;
  }
`;
