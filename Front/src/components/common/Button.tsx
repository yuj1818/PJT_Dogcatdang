import styled from "styled-components";

interface buttonInterface {
  background?: string;
  color?: string;
  fontSize?: string;
}

export const Button = styled.button<buttonInterface>`
  border: none;
  border-radius: 5px;
  background-color: ${props => props.background || '#FF8331'};
  color: ${props => props.color || 'white'};
  font-size: ${props => props.fontSize || '16px'};
  padding: .2rem .4rem;
  white-space: nowrap;

  &:hover {
    box-shadow: 3.5px 3.5px 3.5px lightgrey;
  }
`