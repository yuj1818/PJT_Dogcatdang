import styled from "styled-components";

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
    padding: .2rem .4rem;
  }
}

.custom-button {
  padding: 5px;
  margin-left: 30%;
  background-color: #FF8331;
  color: white;
  border-radius: 10px;
  width: 15%;
  text-align: center;

}
`