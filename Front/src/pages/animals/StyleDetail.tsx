import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.7px solid;
  border-radius:10px;
  padding: 0px;
  background: white;
  margin-bottom: 20px
`
export const Top = styled.div`
  font-weight: bold;
  font-size: 25px;
  padding: 1rem;
`
export const Leftside = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4%;
  margin-bottom: 10px;
  margin-top: 5px;
`
export const Rightside = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2px;
  
  p {
    font-weight: bold;
    margin-right: 10px;
  }
`