import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function NavBar() {
  const [isOrg, setIsOrg] = useState(true);
  const [navContent, setNavContent] = useState(<></>);

  const navTitles = isOrg ? (
    <>
      <NavLink to="/">
        <img src="/src/assets/main-logo.png" alt="홈으로" />
      </NavLink>
      <ul>
        <li>동물 관리</li>
        <li>방문 일정 관리</li>
        <li>방송</li>
        <li>독캣당 소개</li>
        <li>공지사항</li>
      </ul>
    </>
  ) : (
    <>
      <NavLink to="/">
        <img src="/src/assets/main-logo.png" alt="홈으로" />
      </NavLink>
      <ul>
        <li>입양하기</li>
        <li>후기 게시판</li>
        <li>방송 시청</li>
        <li>동물 찾기</li>
        <li>독캣당 소개</li>
        <li>공지사항</li>
      </ul>
    </>
  );

  const hoverHandler = () => {
    setNavContent(
      isOrg ? (
        <>
          <nav>
            <ul>
              <li>
                <NavLink to="/save-animals">보호 동물 보기</NavLink>
              </li>
              <li>
                <NavLink to="/lost-animals">실종 동물 보기</NavLink>
              </li>
              <li>
                <NavLink to="/articles">입양 근황 보기</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="/visit-application-mangement">
                  방문 신청 관리
                </NavLink>
              </li>
              <li>
                <NavLink to="/visitmangement">방문 예약 관리</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="/watch">방송 보기</NavLink>
              </li>
              <li>
                <NavLink to="/broadcast">방송 하기</NavLink>
              </li>
              <li>
                <NavLink to="/breadcastingschedule">방송 일정 관리</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="/about">독캣당 소개</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="/notice">공지사항</NavLink>
              </li>
            </ul>
            <ul></ul>
            <ul></ul>
            <ul></ul>
          </nav>
        </>
      ) : (
        <nav>
          <ul>
            <li>
              <NavLink to="/save-animals">보호 동물 보기</NavLink>
            </li>
            <li>
              <NavLink to="/profile">관심 동물 보기</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/articles">전체 글 보기</NavLink>
            </li>
            <li>
              <NavLink to="/articles/write">글 작성하기</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/watch">방송 보기</NavLink>
            </li>
            <li>
              <NavLink to="/breadcastingschedule">방송 일정</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/lost-animals">실종 동물 전체 보기</NavLink>
            </li>
            <li>
              <NavLink to="/lost-animals/aisearch">AI 검색</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/about">독캣당 소개</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/notice">공지사항</NavLink>
            </li>
          </ul>
          <ul></ul>
          <ul></ul>
          <ul></ul>
        </nav>
      )
    );
  };

  return (
    <>
      <header>
        <div
          onMouseEnter={hoverHandler}
          onMouseLeave={() => {
            setNavContent(<></>);
          }}
        >
          {navTitles}
          {navContent}
        </div>
        <button onClick={() => [setIsOrg((prev) => !prev)]}>
          {isOrg ? "개인으로 변경" : "기관으로 변경"}
        </button>
      </header>
      <Outlet />
    </>
  );
}

export default NavBar;
