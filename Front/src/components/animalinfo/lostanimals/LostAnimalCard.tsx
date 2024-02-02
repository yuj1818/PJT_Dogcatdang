import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

interface LostAnimal {
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
}

interface LostAnimalCardProps {
  animals: LostAnimal;
}

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
`;

function LostAnimalCard(props: LostAnimalCardProps) {
  const navigate = useNavigate();

  const gotoDetailPage = () => {
    navigate(`/lost-animals/${props.animals.lostAnimalId}`);
  };

  return (
    <Card>
      <div onClick={gotoDetailPage}>
        <h4>이름 : {props.animals.name}</h4>
        {/* <img className="img" src={ 'images/img'+ (props.num + 1) +'.jpg' } /> */}
        <p>품종 : {props.animals.breed}</p>

        {/* <p>실종 지역 : {props.animals.lostLocation}</p> */}
        <p>성별 : {props.animals.gender}</p>
      </div>
    </Card>
  );
}

export default LostAnimalCard;
