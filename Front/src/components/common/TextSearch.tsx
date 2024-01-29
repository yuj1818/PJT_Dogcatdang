import { FormEvent } from "react";
import styled from "styled-components";

import { SearchGlasses } from "./Icons";

const FormLayout = styled.form`
  display: flex;
  height: 32px;
  justify-content: space-between;

  p {
    flex: 1 0 auto;
    font-size: 30px;
    font-weight: bold;
    margin: 0;
    line-height: 32px;
    overflow: hidden;
    white-space: nowrap;
  }

  label {
    align-self: center;
  }
`;

const FormMolecule = styled.div`
  display: flex;
  flex: 3 0 auto;
  justify-content: flex-end;

  input {
    background-color: #dddddd;
    border: 0;
    border-radius: 10px;
    width: 80%;
  }

  button {
    margin: 0px 10px;
  }
`;

const TextSearch: React.FC<{
  searchRef: React.RefObject<HTMLInputElement>;
  onSubmit: (event: FormEvent) => void;
  text?: string;
}> = ({ searchRef, onSubmit, text }) => {
  return (
    <FormLayout onSubmit={onSubmit}>
      <p>{text}</p>
      <FormMolecule>
        <label htmlFor="search">검색:</label>
        <input id="search" type="text" ref={searchRef} />
        <SearchGlasses />
      </FormMolecule>
    </FormLayout>
  );
};

export default TextSearch;
