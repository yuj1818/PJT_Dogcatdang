import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../util/axios";
import { Container, Top, Leftside, Rightside } from "../StyleDetail";
import { isOrg as org } from "../../users/SignInPage";
import { Button } from "../../../components/common/Button";
import { Cookies } from "react-cookie";

interface AnimalDetail {
  animalType: string;
  breed: string;
  age: string;
  feature: string;
  gender: string;
  isNeuter: string;
  rescueDate: string;
  rescueLocation: string;
  weight: string;
  userNickname: string;
  userId: number;
  imgUrl: string;
  adoptionApplicantCount: number;
  like: boolean;
}

function AnimalDetailPage() {
  const { animalID } = useParams();
  const [animalDetail, setAnimalDetail] = useState<AnimalDetail | null>(null);
  const isOrg = org();
  const userInfoString = localStorage.getItem("userInfo") ?? "";
  const userInfo = JSON.parse(userInfoString);
  const userId = userInfo.id;
  const cookie = new Cookies();

  useEffect(() => {
    const apiUrl = `api/animals/${animalID}`;
    const token = cookie.get("U_ID");
    const headers = {
      Authorization: token,
    };

    API.get(apiUrl, { headers })
      .then((res) => {
        console.log(res.data);
        setAnimalDetail(res.data);
      })
      .catch((error) => console.error("Error:", error));
  }, [animalID]);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/save-update/${animalID}`, { state: animalDetail });
  };

  const handleBack = () => {
    navigate("/save-animals");
  };

  const handleVisit = () => {
    navigate(`/visit/${animalDetail?.userId}/${animalID}`, {
      state: {
        imgUrl: `${animalDetail?.imgUrl}`,
      },
    });
  };

  return (
    <>
      <Container>
        <div
          style={{
            borderBottom: "0.7px solid",
            padding: "0px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            background: "white",
          }}
        >
          <Top>
            <h1>상세정보</h1>
          </Top>
        </div>
        <div className="flex" style={{ padding: "1rem" }}>
          <Leftside>
            <img
              src={animalDetail?.imgUrl}
              alt="강아지"
              style={{
                width: "350px",
                height: "260px",
                borderRadius: "10px",
                boxShadow: "5px 5px 5px gray",
              }}
            />
          </Leftside>

          <Rightside>
            <div className="flex">
              {" "}
              <p style={{ fontSize: "25px" }}>
                {animalDetail?.breed.replace(/_/g, " ")} | {animalDetail?.age}{" "}
                살
              </p>{" "}
            </div>
            <div className="flex">
              <p>보호기관 : </p>
              {animalDetail?.userNickname}
            </div>
            <div className="flex">
              <p>성별 : </p>
              {animalDetail?.gender}
            </div>
            <div className="flex">
              <p>체중 : </p>
              {animalDetail?.weight} kg
            </div>
            <div className="flex">
              <p>발견일자 : </p>
              {animalDetail?.rescueDate}
            </div>
            <div className="flex">
              <p>발견위치 : </p>
              {animalDetail?.rescueLocation}
            </div>
            <p style={{ marginTop: "10px" }}>특징</p>
            <div
              className="flex"
              style={{
                background: "rgb(255,150,27, 0.1)",
                borderRadius: "5px",
                padding: "15px",
                marginTop: "5px",
                width: "80%",
                height: "auto",
              }}
            >
              <div>{animalDetail?.feature}</div>
            </div>
          </Rightside>
        </div>
      </Container>
      <div className="flex justify-between">
        <button
          style={{
            background: "black",
            padding: "0.5rem",
            color: "white",
            borderRadius: "5px",
            width: "110px",
          }}
          onClick={handleBack}
        >
          전체 글 목록
        </button>
        {isOrg ? (
          userId === animalDetail?.userId ? (
            <Button $paddingX={1} $paddingY={0.5} onClick={handleUpdate}>
              수정
            </Button>
          ) : null
        ) : (
          <Button $paddingX={1} $paddingY={0.5} onClick={handleVisit}>
            방문 예약
          </Button>
        )}
      </div>
    </>
  );
}

export default AnimalDetailPage;
