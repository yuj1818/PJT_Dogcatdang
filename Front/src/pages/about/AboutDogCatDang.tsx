import { useEffect, useState } from "react";
import { useRef } from "react";
import Dots from "./Dot";
import styled from "styled-components";
import img from "../../assets/auth-image.png";
import { useNavigate } from "react-router-dom";
import main from "../../assets/main.png";

const Leftside = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-left: auto 0;
  margin-bottom: 10px;
  margin-top: 5px;
`;
const Rightside = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin: 0 auto;
`;

const Outer = styled.div`
  height: 100vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Page1 = styled.div`
  height: 100vh;
  display: flex;
  font-size: 20px;
`;
const Page2 = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  white-space: pre-line;
`;
const Page3 = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
  font-size: 50px;
  white-space: pre-line;
`;

const Button = styled.button`
  background-color: #ff8331;
  color: white;
  border-radius: 10px;
  font-size: 25px;
`;

const LeftinLeftside = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 500px;
`;

function AboutDogCatDang() {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const gotoBroad = () => {
    navigate("/broadcast");
  };

  const gotoMung = () => {
    navigate("/mung");
  };
  // const gotoVisited = () => {
  //   navigate("/mung");
  // };
  const gotoArticle = () => {
    navigate("/articles/1");
  };
  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();

      const outerDivRefCurrent = outerDivRef.current;

      if (outerDivRefCurrent) {
        const { deltaY } = e;
        const { scrollTop } = outerDivRefCurrent;
        const pageHeight = window.innerHeight;
        if (deltaY > 0) {
          // Scroll down
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            console.log("현재 1페이지, down");
            outerDivRefCurrent.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(2);
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            console.log("현재 2페이지, down");
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(3);
          } else {
            console.log("현재 3페이지, down");
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
              left: 0,
              behavior: "smooth",
            });
          }
        } else {
          // 스크롤 올릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            //현재 1페이지
            console.log("현재 1페이지, up");
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            console.log("현재 2페이지, up");
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(1);
          } else {
            console.log("현재 3페이지, up");
            outerDivRef.current.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(2);
          }
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    if (outerDivRefCurrent) {
      outerDivRefCurrent.addEventListener("wheel", wheelHandler);
      return () => {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      };
    }
  }, [outerDivRef]);

  return (
    <Outer ref={outerDivRef}>
      <Dots currentPage={currentPage} />
      <Page1>
        <img
          src={main}
          alt="main"
          style={{ width: "100%", height: "74.5%", objectFit: "cover" }}
        />
        {/* <Leftside>
          <div>유기견, 유기묘 입양</div>
          <div>독캣당</div>
          <div>새로운 가족을 만나보세요</div>
        </Leftside>
        <Rightside>
          <img src={img} alt="gl"></img>
        </Rightside> */}
      </Page1>
      <Page2>
        <Leftside>
          <LeftinLeftside>
            <div style={{ textAlign: "center" }}>
              <div>스트리밍 서비스</div>
              <div style={{ fontSize: "20px" }}>
                스트리밍 서비스를 통해 우리의 가족이 될 아이를 미리 만나 보세요.
              </div>
              <Button style={{ width: "30%" }} onClick={gotoBroad}>
                바로가기
              </Button>
            </div>
            <div style={{ textAlign: "center", justifyContent: "start" }}>
              <div>멍 BTI</div>
              <div style={{ fontSize: "20px" }}>
                나와 비슷한 동물의 성격을 알아보세요 !
              </div>
              <Button style={{ width: "30%" }} onClick={gotoMung}>
                바로가기
              </Button>
            </div>
          </LeftinLeftside>
        </Leftside>
        <Rightside>
          <div style={{ textAlign: "center" }}>
            <div>방문 예약</div>
            <div style={{ fontSize: "20px" }}>
              예약 서비스를 통해 간편하게 보호 센터와 소통할 수 있습니다.
            </div>
            <Button style={{ width: "30%" }}>바로가기</Button>
          </div>
        </Rightside>
      </Page2>
      <Page3>
        <div>입양 후 이야기</div>
        <Button style={{ width: "10%" }} onClick={gotoArticle}>
          바로가기
        </Button>
      </Page3>
    </Outer>
  );
}

export default AboutDogCatDang;
