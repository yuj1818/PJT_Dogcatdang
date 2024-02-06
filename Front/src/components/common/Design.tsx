import styled from "styled-components";
import tw from "tailwind-styled-components";

export const Button = tw.button`
  w-30
  mr-3
  mt-3
  p-2
  bg-amber-500
  rounded-xl
  text-white
  font-bold
  text-lg

  hover:bg-amber-200
  hover:scale-105
  hover:transition
  hover:text-black
`;

export const Input = tw.input`
w-full mt-2 p-2 border border-gray-300 rounded mb-0

focus:outline-none
focus:shadow-md
focus:placeholder:opacity-0
`;

export const TextArea = tw.textarea`
h-32 border rounded-md p-2 resize-none block w-full
w-full mt-2 p-2 border border-gray-300 rounded mb-0

focus:outline-none
focus:shadow-md
focus:placeholder:opacity-0
`;

interface ContourProps {
  $thickness?: number;
  $marginTop?: number;
  $marginBottom?: number;
}

export const Contour = styled.hr<ContourProps>`
  border: ${(props) => `${props.$thickness || "1"}px`} solid #232323; /* Set thickness or default to 1px */
  margin: ${(props) => `${props.$marginTop || "0"}rem`} 0
    ${(props) => `${props.$marginBottom || "0"}rem`} 0;
`;

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
`;
