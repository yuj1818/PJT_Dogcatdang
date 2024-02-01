import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

interface Animal {
  animalId: number;
  animalType: string;
  breed: string;
  age: string;
  weight: string;
  rescueDate: string;
  selectedCity: string;
  selectedDistrict: string;
  detailInfo: string;
  isNeuter: boolean;
  gender: string;
  feature: string;
  state: string;
  imgName: string;
  imgUrl: string;
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

  const navigate = useNavigate();

  const gotoDetailPage = () => {
    navigate(`/save-animals/${props.animals.animalId}`);
  };

  return (
    <Card>
      <div onClick={gotoDetailPage}>
        {/* <h4>보호 기관 : {props.animals.shelterName}</h4> */}
        {/* <img className="img" src={ 'images/img'+ (props.num + 1) +'.jpg' } /> */}
        <h4>품종 : {props.animals.breed.replace(/_/g, " ")}</h4>
        <p>성별 : {props.animals.gender}</p>
        <p>중성화 여부 : {props.animals.isNeuter ? "Y" : "N"}</p>
      </div>
    </Card>
  );
}

export default SaveAnimalCard;
