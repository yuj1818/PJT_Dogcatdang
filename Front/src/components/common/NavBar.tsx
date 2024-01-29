import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { logout } from "../../util/UserAPI";
import { Cookies } from "react-cookie";

import { Bell } from "./Icons";
import tw from "tailwind-styled-components";

// -----------Styled Component-----------------------------------------------
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  background-color: #fafafa;

  div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    > ul {
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
    }

    > nav {
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
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit; /* Inherit color from parent */
`;

const OutLet = tw.div`
mx-4 lg:mx-60
`;

// -----------NavBar-----------------------------------------------
const NavBar = () => {
  const [isOrg, setIsOrg] = useState(true);
  const [navContent, setNavContent] = useState(<></>);
  const [isNoti, setIsNoti] = useState(false);
  const nickName = "독캣당";

  const navTitles = isOrg ? (
    <ul>
      <li>동물 관리</li>
      <li>방문 일정 관리</li>
      <li>방송</li>
      <li>독캣당 소개</li>
      <li>공지사항</li>
    </ul>
  ) : (
    <ul>
      <li>입양하기</li>
      <li>후기 게시판</li>
      <li>방송 시청</li>
      <li>동물 찾기</li>
      <li>독캣당 소개</li>
      <li>공지사항</li>
    </ul>
  );

  const hoverHandler = () => {
    setNavContent(
      isOrg ? (
        <nav>
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
              <StyledNavLink to="/visit-application-mangement">
                방문 신청 관리
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/visitmangement">방문 예약 관리</StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/watch">방송 보기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/broadcast">방송 하기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/breadcastingschedule">
                방송 일정 관리
              </StyledNavLink>
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
          <ul></ul>
          <ul></ul>
          <ul></ul>
        </nav>
      ) : (
        <nav>
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
              <StyledNavLink to="/articles/write">글 작성하기</StyledNavLink>
            </li>
          </ul>
          <ul>
            <li>
              <StyledNavLink to="/watch">방송 보기</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/breadcastingschedule">
                방송 일정
              </StyledNavLink>
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
          <ul></ul>
          <ul></ul>
          <ul></ul>
        </nav>
      )
    );
  };

  const navigate = useNavigate();

  const cookie = new Cookies();

  // api 구현 후 수정 필요
  const onClickLogout = () => {
    // const response = await logout();
    // console.log(response);
    cookie.remove('U_ID');
    localStorage.removeItem('userInfo');

    navigate("/landing");
  }

  return (
    <>
      <Header>
        <StyledNavLink to="/">
          <img
            src="/src/assets/main-logo.png"
            alt="메인화면으로"
            className="w-60 min-w-60"
          />
        </StyledNavLink>
        <div>
          <ul style={{ gap: "20px", marginRight: "20px" }}>
            {isOrg && <p style={{ margin: 0 }}>기관 회원</p>}
            <StyledNavLink to="profile/">{nickName}님</StyledNavLink>
            <StyledNavLink to="notification">
              <Bell isNoti={isNoti} />
            </StyledNavLink>
            <button onClick={onClickLogout}>로그아웃</button>
          </ul>
          <div
            onMouseEnter={hoverHandler}
            onMouseLeave={() => {
              setNavContent(<></>);
            }}
          >
            {navTitles}
            {navContent}
          </div>
        </div>
      </Header>
      <div>
        <button onClick={() => [setIsOrg((prev) => !prev)]}>
          {isOrg ? "개인으로 변경" : "기관으로 변경"}
        </button>
        <button onClick={() => [setIsNoti((prev) => !prev)]}>
          {isNoti ? "알람 없애기" : "알람 생성하기"}
        </button>
      </div>
      <OutLet style={{ minWidth: "400px" }}>
        <Outlet />
      </OutLet>
    </>
  );
};

export default NavBar;
