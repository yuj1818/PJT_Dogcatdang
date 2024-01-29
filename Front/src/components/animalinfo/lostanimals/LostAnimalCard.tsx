import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

interface Animal {
  id: number;
  name: string;
  animalType: string;
  breed: string;
  age: number;
  weight: number;
  color: string;
  feature: string;
  lostDate: string;
  lostLocation: string;
  gender: string;
  isNeuter: boolean;
}

interface AnimalCardProps {
  animals: Animal;
}

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
`;

function LostAnimalCard(props: AnimalCardProps) {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://api.example.com/data');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //     fetchData();
  //   }, []);

  const navigate = useNavigate();

  const gotoDetailPage = () => {
    navigate(`/lost-animals/${props.animals.id}`);
  };

  return (
    <Card>
      <div onClick={gotoDetailPage}>
        <h4>이름 : {props.animals.name}</h4>
        {/* <img className="img" src={ 'images/img'+ (props.num + 1) +'.jpg' } /> */}
        <p>품종 : {props.animals.breed}</p>
        <p>{props.animals.feature}</p>
        <p>실종 지역 : {props.animals.lostLocation}</p>
        <p>성별 : {props.animals.gender}</p>
        <p>중성화 여부 : {props.animals.isNeuter ? "Y" : "N"}</p>
      </div>
    </Card>
  );
}

export default LostAnimalCard;
