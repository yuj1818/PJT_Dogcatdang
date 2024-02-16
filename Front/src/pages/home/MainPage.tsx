import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import mbti from "../../assets/MBTI.png";
import main from "../../assets/main.webp";
import streaming from "../../assets/streaming.png";
import calender from "../../assets/calender.png";
import { PopularArticles } from "../articles/ArticleListPage";
import API from "../../util/axios";
import { Cookies } from "react-cookie";
import SaveAnimalCard, {
  SaveAnimal,
} from "../../components/animalinfo/savedanimals/SaveAnimalCard";

const ListStyle = styled.div<{ $itemsPerRow: number }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    flex: 0 0 23%;
    box-sizing: border-box;
    margin: 1%;
  }
  & > div:last-child {
    margin-right: auto;
  }
  .md-font {
    font-size: 1.3rem;
  }
`;

const Outer = styled.div`
  height: calc(100vh - 132px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Page1 = styled.div`
  height: calc(100vh - 130px);
  display: flex;
  font-size: 20px;

  .gradient-box {
    background: radial-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3) 45%, rgba(0, 0, 0, 0.0) 70%);
    padding: 8rem 6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
  }
`;

const Page2 = styled.div`
  height: calc(100vh - 130px);
  font-size: 45px;
  white-space: pre-line;
  overflow: hidden;
  width: 75%;
  margin: 0 auto;
  padding-top: 2rem;
`;

const Page3 = styled.div`
  height: calc(100vh - 130px);
  white-space: pre-line;
  overflow: hidden;
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  & > div {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    
    & > p {
      font-size: 45px;
      font-family: "SUITE-Bold";
      padding: 1.5rem;
    }
  }
`

const Page4 = styled.div`
  height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  overflow: hidden;
  width: 70%;
  margin: 0 auto;
  padding-top: 2rem;
  gap: 1rem;
`;

const TitleContainer = styled.div`
  font-family: "SUITE-Bold";
  text-align: center;
  flex: 1;
`;

const Group = styled.div`
  flex: 1;
  display: flex;
  height: 65vh;
  justify-content: space-between;
  
  .box1 {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .box2 {
    display: flex;
    align-items: center;
  }
`;

const Img = styled.img`
  object-fit: cover;
  height: 100px;
  margin: 0 auto;
`;

const ArticleContainer = styled.div`
  flex: 3;
  text-align: center;
`;

function AboutDogCatDang() {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [animalData, setAnimalData] = useState([]);
  const cookie = new Cookies();

  useEffect(() => {
    const token = cookie.get("U_ID");
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      const searchData = async () => {
        try {
          const headers = {
            Authorization: token,
          };

          const res = await API.get(`/api/animals?page=1`, {
            headers,
          });
          console.log(res.data.animalDtoList);
          setAnimalData(res.data.animalDtoList);
        } catch (err) {
          console.error("Error:", err);
        }
      };
      searchData();

      const outerDivRefCurrent = outerDivRef.current;

      if (outerDivRefCurrent) {
        const { deltaY } = e;
        const { scrollTop } = outerDivRefCurrent;
        const pageHeight = window.innerHeight - 130;
        if (deltaY > 0) {
          // Scroll down
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            console.log("현재 1페이지, down");
            console.log(pageHeight);
            outerDivRefCurrent.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            console.log("현재 2페이지, down");
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 2,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
            console.log("현재 3페이지, down");
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 3,
              left: 0,
              behavior: "smooth",
            });
          } else {
            console.log("현재 4페이지, down");
            outerDivRefCurrent.scrollTo({
              top: pageHeight * 4,
              left: 0,
              behavior: "smooth",
            });
          }
        } else {
          // 스크롤 올릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            //현재 1페이지
            // console.log("현재 1페이지, up");
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            // console.log("현재 2페이지, up");
            outerDivRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          } else if (
            scrollTop >= pageHeight * 2 &&
            scrollTop < pageHeight * 3
          ) {
            // console.log("현재 3페이지, up");
            outerDivRef.current.scrollTo({
              top: pageHeight + DIVIDER_HEIGHT,
              left: 0,
              behavior: "smooth",
            });
          } else {
            // console.log("현재 4페이지, up");
            outerDivRef.current.scrollTo({
              top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
              left: 0,
              behavior: "smooth",
            });
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
      <Page1>
        <div
          style={{ position: "relative", width: "100%", objectFit: "cover" }}
        >
          <img
            src={main}
            alt="main"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            className="gradient-box"
          >
              <div style={{ fontSize: "50px", color: "#F7F4EB" }}>
                가족이 되면
              </div>
              <div
                style={{
                  fontSize: "100px",
                  color: "#F7F4EB",
                  fontWeight: "bold",
                }}
              >
                독캣당
              </div>
              <div>유기 동물들도 건강하고 아름다운 아이들입니다.</div>
              <div>아이들의 가족이 되어주세요.</div>
          </div>
        </div>
      </Page1>
      <Page2>
        <TitleContainer>
          <p>독캣당에서 할 수 있는 일</p>
        </TitleContainer>
        <Group>
          <div className="box1">
            <div className="flex flex-col gap-4 items-center">
              <Img src={streaming} alt="" loading="lazy" />
              <div style={{ fontSize: "20px" }}>
                우리의 가족이 될 아이를 미리 만나 보세요.
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <Img src={calender} alt="" loading="lazy" />
              <div style={{ fontSize: "20px" }}>
                예약 서비스로 간편하게 보호 센터와 연락하세요
              </div>
            </div>
          </div>
          <div className="box2">
            <div className="flex flex-col gap-4 items-center">
              <Img src={mbti} alt="" loading="lazy" />
              <div style={{ fontSize: "20px" }}>
                나와 비슷한 동물의 성격을 알아보세요!
              </div>
            </div>
          </div>
        </Group>
      </Page2>
      <Page3>
        <ArticleContainer>
          <PopularArticles />
        </ArticleContainer>
      </Page3>
      <Page4>
        <p
          style={{
            fontFamily: "SUITE-Bold",
            textAlign: "center",
            fontSize: "40px",
          }}
        >
          가족을 기다리는 동물들
        </p>
        <ListStyle $itemsPerRow={10}>
          {animalData.map((animal: SaveAnimal) => (
            <SaveAnimalCard key={animal.animalId} animals={animal} />
          ))}
        </ListStyle>
      </Page4>
    </Outer>
  );
}

export default AboutDogCatDang;
