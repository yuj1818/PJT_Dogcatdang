import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const IMG = tw.img`
  mt-4 ms-4
`;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  margin-right: 10rem;

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

  ul {
    font-weight: bold;
    position: relative;
  }

  p,
  a,
  button {
    padding: 0 1rem;
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
    width: 100%;
    height: 100%;
  }
  ul:hover {
    box-shadow: 0 -3px 0 0 #f9d29b inset;
  }
`;

// -----------NavBar-----------------------------------------------
const NavBar = () => {
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
        <StyledNavLink to="/about">독캣당 소개</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/save-animals">보호 동물</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/broadcast/list">보호 동물 방송</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/lost-animals">실종 동물</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/visit-application-mangement">
          방문 일정 보기
        </StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/articles/1">후기 게시판</StyledNavLink>
      </ul>
    </NavTitle>
  ) : (
    <NavTitle>
      <ul>
        <StyledNavLink to="/about">독캣당 소개</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/save-animals">보호 동물</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/broadcast/list">방송 시청</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/lost-animals">실종 동물</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/articles/1">후기 게시판</StyledNavLink>
      </ul>
      <ul>
        <StyledNavLink to="/mung">멍BTI</StyledNavLink>
      </ul>
    </NavTitle>
  );

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
            <IMG src={logo} alt="메인화면으로" className="w-40 min-w-40" />
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

            {navTitles}
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
