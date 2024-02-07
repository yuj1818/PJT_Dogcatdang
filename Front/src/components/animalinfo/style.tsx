import styled from "styled-components";
import tw from "tailwind-styled-components";

export const Input = tw.input`
focus:outline-none
focus:shadow-md
focus:placeholder:opacity-0
`;

export const Select = tw.select`
focus:outline-none
focus:shadow-md
focus:placeholder:opacity-0
`;

export const RegistForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  width: 80%;

  .box {
    display: flex;
    gap: 1rem;
    align-items: center;
    .item {
      text-align: center;
      width: 7rem;
      white-space: nowrap;
      font-weight: bold;
      padding: 7px;
    }
    .input {
      border: none;
      box-shadow: 0 3.5px 3.5px lightgrey;
      border-radius: 5px;
      width: 15rem;
      padding: 0.2rem 0.4rem;
    }
  }

  .custom-button {
    padding: 5px;
    margin-left: 30%;
    background-color: #ff8331;
    color: white;
    border-radius: 10px;
    width: 15%;
    text-align: center;
  }
`;
