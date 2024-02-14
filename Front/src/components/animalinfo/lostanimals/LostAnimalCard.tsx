import { useNavigate } from "react-router-dom";
import { Card } from "../savedanimals/SaveAnimalCard";

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

function LostAnimalCard(props: LostAnimalCardProps) {
  const navigate = useNavigate();

  const gotoDetailPage = () => {
    navigate(`/lost-animals/${props.animals.lostAnimalId}`);
  };

  return (
    <Card>
      <div onClick={gotoDetailPage}>
        <img
          src={props.animals.imgUrl}
          alt="animals"
          style={{
            border: "1px solid #ccc",
            width: "100%",
            height: "120px",
          }}
        ></img>
        <strong>{props.animals.name}</strong>
        <div>
          <strong>{props.animals.breed}</strong> |{" "}
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
