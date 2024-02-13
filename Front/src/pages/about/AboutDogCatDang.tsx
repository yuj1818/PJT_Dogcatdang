import { useEffect, useState } from "react";
import { useRef } from "react";
import Dots from "./Dot";
import styled from "styled-components";
import img from "../../assets/auth-image.png";
import { useNavigate } from "react-router-dom";

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
  flex-direction: column;
  justify-content: start;
  align-items: center;
  font-size: 50px;
  white-space: pre-line;

`;
const Page3 = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  white-space: pre-line;
`;
const Page4 = styled.div`
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
  height:500px;
`

function AboutDogCatDang() {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const gotoMain = () => {
    navigate(`/`);
  };

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
        console.log(scrollTop);
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
          } else if (scrollTop >= pageHeight * 2 + DIVIDER_HEIGHT * 2) {
            console.log("현재 3페이지, down");
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(4);
          } else {
            console.log("현재 4페이지, down");
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 4 + DIVIDER_HEIGHT * 4,
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
          } else if (
            scrollTop >= pageHeight * 2 &&
            scrollTop < pageHeight * 3
          ) {
            console.log("현재 3페이지, up");
            outerDivRef.current.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(2);
          } else {
            console.log("현재 4페이지, up");
            outerDivRef.current.scrollTo({
              top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
              left: 0,
              behavior: "smooth",
            });
            setCurrentPage(3);
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
        <Leftside>
          <div>유기견, 유기묘 입양</div>
          <div>독캣당</div>
          <div>새로운 가족을 만나보세요</div>
          <Button style={{ width: "80%" }} onClick={gotoMain}>
            메인페이지
          </Button>
        </Leftside>
        <Rightside>
          <img src={img} alt="gl"></img>
        </Rightside>
      </Page1>
      <Page2>
        <div>진심 어린 마음으로</div>
        <div>우리의 영원한 가족이 되어주세요</div>
        <div style={{ textAlign: "center", fontSize: "30px" }}>
          <div>국내에서만 연간 12만 마리의 동물이 구조되고 있습니다.</div>
          <div>
            하지만 가족을 찾지 못하여 매일 65마리의 동물이 안락사됩니다.
          </div>
          <div>
            안락사 위기에 처한 동물들이 새로운 가족을 찾을 수 있도록 도와주세요.
          </div>
        </div>
      </Page2>
      <Page3>
        <Leftside>
          <LeftinLeftside>
            <div style={{textAlign:'center'}}>
          <div>스트리밍 서비스</div>
          <div style={{ fontSize: "20px" }}>
            스트리밍 서비스를 통해 우리의 가족이 될 아이를 미리 만나 보세요.
          </div>
          <Button style={{ width: "30%" }} onClick={gotoBroad}>
            바로가기
          </Button>
          </div>
          <div style={{textAlign:'center' , justifyContent: "start"}}>
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
          <div  style={{textAlign:'center'}}>
          <div>방문 예약</div>
          <div style={{ fontSize: "20px" }}>
            예약 서비스를 통해 간편하게 보호 센터와 소통할 수 있습니다.
          </div>
          <Button style={{ width: "30%" }}>바로가기</Button>
          </div>
        </Rightside>
      </Page3>
      <Page4>
        <div>입양 게시판</div>
        <Button style={{ width: "10%" }} onClick={gotoArticle}>
          바로가기
        </Button>
      </Page4>
    </Outer>
  );
}

export default AboutDogCatDang;
