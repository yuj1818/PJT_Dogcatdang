import styled from "styled-components";

import logo from "../../assets/main-logo-big.png";
import { ReactNode } from "react";
import { Button } from "./Button";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const ErrorBlockStyle = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  gap: 2rem;
  align-items: center;
  text-align: left;
  position: relative;
`;

const ErrorBlockIcon = styled.div`
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  color: #fff;
  background-color: #890b35;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorBlockHeading = styled.h2`
  color: inherit;
  font-size: 1.25rem;
  margin: 0;
`;

const ErrorBlockParagraph = styled.p`
  margin: 0;
`;

const CenteredImage = styled.img`
  width: 50%;
  top: 50%;
  left: 50%;
  z-index: 9000;
`;

const ErrorBlock: React.FC<{
  title?: string;
  message?: string;
  children?: ReactNode;
}> = ({ title, message, children }) => {
  return (
    <Container>
      <CenteredImage src={logo} alt="" />
      <ErrorBlockStyle>
        <ErrorBlockIcon>!</ErrorBlockIcon>
        <div>
          <ErrorBlockHeading>{title ?? "알 수없는 에러"}</ErrorBlockHeading>
          <ErrorBlockParagraph>
            {message ??
              "원인을 알 수 없는 에러가 발생하였습니다. 나중에 다시 시도해 주세요"}
          </ErrorBlockParagraph>
        </div>
      </ErrorBlockStyle>
      {children ? (
        <>{children}</>
      ) : (
        <NavLink to="/">
          <Button background="black">메인 화면으로 가기</Button>
        </NavLink>
      )}
    </Container>
  );
};

export default ErrorBlock;
