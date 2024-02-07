import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { Cookies } from "react-cookie";
import { isOrg as org } from "../../pages/users/SignInPage";
import { Bell } from "./Icons";
import tw from "tailwind-styled-components";
import { logout } from "../../util/UserAPI";
import logo from "../../assets/main-logo-big.png";

// -----------Styled Component-----------------------------------------------
const Color = styled.div`
  background-color: #fff;
`;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;

  @media screen and (max-width: 1024px) {
    .container {
      width: 80%;
    }
  }
`;

const FlexColumnContainer = styled.div`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  li {
    font-weight: bold;
    position: relative;
  }

  p,
  a,
  button {
    padding: 0 1rem;
  }
`;

const drawFromAbove = keyframes`
  0% {
    transform: translateY(-30%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyledNav = styled.nav`
  position: absolute;
  display: flex;
  width: 100%;
  background-color: #fff;
  z-index: 99999;
  border-radius: 1rem;
  justify-content: space-around;

  ul {
    flex-grow: 1;
    list-style: none;
    justify-content: space-around;
    align-items: center;
    padding: 0px;
    animation: ${drawFromAbove} 0.5s ease-out;
  }

  li {
    text-align: center;
    padding: 15px 0px;

    :hover {
      background-color: antiquewhite;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const OutLet = tw.div`
mx-4 sm:mx-60
`;

const NavTitle = styled.div`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  ul {
    flex-grow: 1;
    text-align: center;
    padding: 15px 0px;
  }
`;

// -----------NavBar-----------------------------------------------
const commontNavTitles = (
  <>
    <ul>
      <StyledNavLink to="/about">독캣당 소개</StyledNavLink>
    </ul>
    <ul>
      <StyledNavLink to="/mung">멍BTI</StyledNavLink>
    </ul>
  </>
);

const commonNavContent = (
  <>
    <ul>
      <li>
        <StyledNavLink to="/about/">독캣당 소개</StyledNavLink>
      </li>
    </ul>
    <ul>
      <li>
        <StyledNavLink to="/mung">멍BTI</StyledNavLink>
      </li>
    </ul>
  </>
);

const NavBar = () => {
  const [navContent, setNavContent] = useState(<></>);
  // const [isNoti, setIsNoti] = useState(false);
  const isOrg = org();
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const cookie = new Cookies();

  const onClickLogout = async () => {
    const response = await logout();
    if (response.status === 200) {
      cookie.remove("U_ID");
      localStorage.removeItem("userInfo");
      navigate("/landing");
    }
  };

  const navTitles = isOrg ? (
    <NavTitle>
      <ul>
        <StyledNavLink to="/save-animals">동물 관리</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/visit-application-mangement">
          방문 일정 관리
        </StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/broadcast/list">보호 동물 방송</StyledNavLink>
      </ul>
      {commontNavTitles}
      <ul></ul>
    </NavTitle>
  ) : (
    <NavTitle>
      <ul>
        <StyledNavLink to="/save-animals">입양하기</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/articles/1">후기 게시판</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/broadcast/list">방송 시청</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/lost-animals">실종 동물</StyledNavLink>
      </ul>
      {commontNavTitles}
      <ul></ul>
    </NavTitle>
  );

  const hoverHandler = () => {
    setNavContent(
      isOrg ? (
        <StyledNav>
          <ul>
            <li>
              <StyledNavLink to="/save-animals">보호 동물</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/lost-animals">실종 동물</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/articles/1">입양 근황</StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/visit/approval">방문 관리</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/visit/mangement">
                방문 예약 관리
              </StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/broadcast/list">방송 보기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/broadcast/trans">방송 하기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/breadcast/manage">
                방송 일정 관리
              </StyledNavLink>
            </li>
          </ul>
          {commonNavContent}
          <ul></ul>
        </StyledNav>
      ) : (
        <StyledNav>
          <ul>
            <li>
              <StyledNavLink to="/save-animals">보호 동물</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/profile">관심 동물</StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/articles/1">후기 글 보기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/articles/new">작성하기</StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/broadcast/list">방송 보기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/broadcast/schedule">방송 일정</StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/lost-animals">동물 검색</StyledNavLink>
            </li>
          </ul>
          {commonNavContent}
          <ul></ul>
        </StyledNav>
      )
    );
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "");
    setNickname(() => userInfo.nickname);
    setUserId(() => userInfo.id);
  }, []);

  return (
    <>
      <Color style={{ marginBottom: "2rem" }}>
        <NavBarContainer>
          <StyledNavLink to="/">
            <img src={logo} alt="메인화면으로" className="w-40 min-w-40" />
          </StyledNavLink>
          <FlexColumnContainer>
            <StyledUl>
              {isOrg && <p style={{ margin: 0 }}>기관 회원</p>}
              <StyledNavLink to={`profile/${userId}`}>
                {nickname}님
              </StyledNavLink>
              <StyledNavLink to="notification">
                <Bell isNoti={false} />
              </StyledNavLink>
              <button onClick={onClickLogout}>로그아웃</button>
            </StyledUl>
            <div
              onMouseEnter={hoverHandler}
              onMouseLeave={() => {
                setNavContent(<></>);
              }}
              style={{ width: "100%" }}
            >
              {navTitles}
              {navContent}
            </div>
          </FlexColumnContainer>
        </NavBarContainer>
      </Color>
      <OutLet style={{ minWidth: "700px" }}>
        <Outlet />
      </OutLet>
    </>
  );
};

export default NavBar;
