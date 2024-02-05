import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../util/axios";
import { Container, Top, Leftside, Rightside } from "../StyleDetail";

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
}

function AnimalDetailPage() {
  const { animalID } = useParams();
  const [animalDetail, setAnimalDetail] = useState<AnimalDetail | null>(null);

  useEffect(() => {
    const apiUrl = `api/animals/${animalID}`;

    API.get(apiUrl)
      .then((res) => {
        console.log(res.data);
        setAnimalDetail(res.data);
      })
      .catch((error) => console.error("Error:", error));
  }, [animalID]);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/save-update/${animalID}`);
  };

  const handleBack = () => {
    navigate("/save-animals");
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
            <h1 style={{}}>상세정보</h1>
          </Top>
        </div>
        <div className="flex" style={{ padding: "1rem" }}>
          <Leftside>
            <img
              src="https://www.fitpetmall.com/wp-content/uploads/2023/10/image-14.png"
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
                {animalDetail?.breed.replace(/_/g, " ")} | {animalDetail?.age}세
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
              <p>체중: </p>
              {animalDetail?.weight}
            </div>
            <div className="flex">
              <p>실종일자 : </p>
              {animalDetail?.rescueDate ? "Y" : "N"}
            </div>
            <div className="flex">
              <p>실종위치 : </p>
              {animalDetail?.rescueLocation}
            </div>
            <div
              className="flex"
              style={{
                background: "rgb(255,150,27, 0.1)",
                borderRadius: "5px",
                padding: "15px",
                marginTop: "15px",
                width: "370px",
              }}
            >
              <p>특징 : </p>
              {animalDetail?.feature}
            </div>
          </Rightside>
        </div>
      </Container>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        <button
          style={{
            background: "#FF8331",
            padding: "0.5rem",
            color: "white",
            borderRadius: "5px",
            width: "80px",
            marginLeft: "10px",
          }}
          onClick={handleUpdate}
        >
          수정
        </button>
      </div>
    </>
  );
}

export default AnimalDetailPage;
