import React from "react";
import styled from "styled-components";
// import axios from "axios";

interface Animal {
  shelterName: string;
  animalType: string;
  breed: string;
  age: number;
  weight: number;
  color: string;
  feature: string;
  rescueDate: string;
  rescueLocation: string;
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

function SaveAnimalCard(props: AnimalCardProps) {
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

  return (
    <Card>
      <div>
        <h4>보호 기관 : {props.animals.shelterName}</h4>
        {/* <img className="img" src={ 'images/img'+ (props.num + 1) +'.jpg' } /> */}
        <h4>품종 : {props.animals.breed}</h4>
        <p>{props.animals.feature}</p>
        <p>지역 : {props.animals.rescueLocation}</p>
        <p>성별 : {props.animals.gender}</p>
        <p>중성화 여부 : {props.animals.isNeuter ? "Y" : "N"}</p>
      </div>
    </Card>
  );
}

export default SaveAnimalCard;
