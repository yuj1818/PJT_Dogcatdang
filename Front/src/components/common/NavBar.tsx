import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Cookies } from "react-cookie";
import { isOrg as org } from "../../pages/users/SignInPage";
import { Bell } from "./Icons";
import tw from "tailwind-styled-components";
import { logout } from "../../util/UserAPI";
import logo from "../../assets/main-logo-big.png";

// -----------Styled Component-----------------------------------------------
const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  background-color: #fafafa;

  @media screen and (max-width: 1024px) {
    .container {
      width: 80%; /* Adjust the width for screens 1024px and below */
    }
  }
`;

const FlexColumnContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  text-align: center;
  padding: 0px 10px;

  li {
    position: relative;
    width: 150px;
  }
`;

const StyledNav = styled.nav`
  position: absolute;
  display: flex;
  width: 100%;
  left: 0;
  top: 100%;
  background-color: #fafafa;
  padding: 0px 10px 3px 10px;
  z-index: 99999;

  ul {
    list-style: none;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }

  li {
    width: 150px;
    text-align: center;
    padding: 15px 0px;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const OutLet = tw.div`
mx-4 sm:mx-60
`;

// -----------NavBar-----------------------------------------------
const NavBar = () => {
  const [navContent, setNavContent] = useState(<></>);
  const [isNoti, setIsNoti] = useState(false);
  const isOrg = org();
  const nickName = "독캣당";

  const handleNoti = () => {
    setIsNoti((prev) => !prev);
  };

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

  const commontNavTitles = (
    <>
      {" "}
      <li>
        <StyledNavLink to="/about">독캣당 소개</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/notice">공지사항</StyledNavLink>
      </li>
    </>
  );

  const navTitles = isOrg ? (
    <StyledUl>
      <li>
        <StyledNavLink to="/save-animals">동물 관리</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/visit-application-mangement">
          방문 일정 관리
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/watch">방송</StyledNavLink>
      </li>
      {commontNavTitles}
    </StyledUl>
  ) : (
    <StyledUl>
      <li>
        <StyledNavLink to="/save-animals">입양하기</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/articles">후기 게시판</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/watch">방송 시청</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/lost-animals">동물 찾기</StyledNavLink>
      </li>
      {commontNavTitles}
    </StyledUl>
  );

  const commonNavContent = (
    <>
      {" "}
      <StyledUl>
        <li>
          <StyledNavLink to="/about">독캣당 소개</StyledNavLink>
        </li>
      </StyledUl>
      <StyledUl>
        <li>
          <StyledNavLink to="/notice">공지사항</StyledNavLink>
        </li>
      </StyledUl>
    </>
  );

  const hoverHandler = () => {
    setNavContent(
      isOrg ? (
        <StyledNav>
          <ul>
            <li>
              <StyledNavLink to="/save-animals">보호 동물 보기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/lost-animals">실종 동물 보기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/articles">입양 근황 보기</StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/visit/approval">방문 신청 관리</StyledNavLink>
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
              <StyledNavLink to="/save-animals">보호 동물 보기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/profile">관심 동물 보기</StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/articles">전체 글 보기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/articles/new">글 작성하기</StyledNavLink>
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
              <StyledNavLink to="/lost-animals">
                실종 동물 전체 보기
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/lost-animals/aisearch">AI 검색</StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/about">독캣당 소개</StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/notice">공지사항</StyledNavLink>
            </li>
          </ul>
          {commonNavContent}
          <ul></ul>
        </StyledNav>
      )
    );
  };
  return (
    <>
      <NavBarContainer>
        <StyledNavLink to="/">
          <img src={logo} alt="메인화면으로" className="w-60 min-w-60" />
        </StyledNavLink>
        <FlexColumnContainer>
          <StyledUl style={{ gap: "20px", marginRight: "20px" }}>
            {isOrg && <p style={{ margin: 0 }}>기관 회원</p>}
            <StyledNavLink to={`profile/${nickName}`}>
              {nickName}님
            </StyledNavLink>
            <StyledNavLink to="notification">
              <Bell isNoti={isNoti} />
            </StyledNavLink>
            <button onClick={onClickLogout}>로그아웃</button>
          </StyledUl>
          <div
            onMouseEnter={hoverHandler}
            onMouseLeave={() => {
              setNavContent(<></>);
            }}
          >
            {navTitles}
            {navContent}
          </div>
        </FlexColumnContainer>
      </NavBarContainer>
      <button onClick={handleNoti}>알람 상태 변경</button>
      <OutLet style={{ minWidth: "400px" }}>
        <Outlet />
      </OutLet>
    </>
  );
};

export default NavBar;
