import styled from "styled-components";

const StyledTitle = styled.p`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
`

const Title: React.FC<{ title: string }> = ({title}) => {
  return (
    <StyledTitle>{title}</StyledTitle>
  )
}

export default Title;