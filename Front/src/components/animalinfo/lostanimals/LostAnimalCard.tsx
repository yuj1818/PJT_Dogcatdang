import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

export interface LostAnimal {
  lostAnimalId: number;
  animalType: string;
  breed: string;
  age: string;
  weight: string;
  lostDate: string;
  selectedCity: string;
  selectedDistrict: string;
  detailInfo: string;
  name: string;
  gender: string;
  feature: string;
  state: string;
  imgName: string;
  imgUrl: string;
  lostLocation: string;
}

interface LostAnimalCardProps {
  animals: LostAnimal;
}

const Card = styled.div`
  background-color: rgb(255, 255, 255);
  border: 1px solid #ccc;
  padding: 5px 20px 15px 20px;
  position: relative;
  box-shadow: 2px 2px 2px rgb(45, 45, 45, 0.4);
  border-radius: 10px;
`;

function LostAnimalCard(props: LostAnimalCardProps) {
  const navigate = useNavigate();

  const gotoDetailPage = () => {
    navigate(`/lost-animals/${props.animals.lostAnimalId}`);
  };

  return (
    <Card>
      <div onClick={gotoDetailPage}>
        <img
          src="src/assets/Dandie.jpg"
          alt="rkdkdwl"
          style={{
            border: "1px solid #ccc",
            display: "block",
            margin: "0 auto",
            maxWidth: "90%",
            maxHeight: "70%",
          }}
        ></img>
        <strong>{props.animals.name}</strong>
        <div>
          <strong>{props.animals.breed.replace(/_/g, " ")}</strong> |{" "}
          <strong>{props.animals.age}살 </strong>|{" "}
          <strong>{props.animals.gender === "남" ? "남아" : "여아"}</strong>
        </div>

        <p style={{ fontSize: "10px", opacity: "0.7" }}>
          실종 지역 : {props.animals.lostLocation}
        </p>
      </div>
    </Card>
  );
}

export default LostAnimalCard;
