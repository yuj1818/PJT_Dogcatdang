import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../util/axios";

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
}

function AnimalDetailPage() {
  const { animalID } = useParams();
  const [animalDetail, setAnimalDetail] = useState<AnimalDetail | null>(null);

  useEffect(() => {
    const apiUrl = `animals/${animalID}`;

    API.get(apiUrl)
      .then((res) => {
        console.log(res.data);
        setAnimalDetail(res.data);
      })
      .catch((error) => console.error("Error fetching animal data:", error));
  }, [animalID]);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/save-update/${animalID}`);
  };

  return (
    <div>
      <h1>AnimalDetailPage</h1>
      <p>품종 : {animalDetail?.breed.replace(/_/g, " ")}</p>
      <p>몸무게 : {animalDetail?.weight}</p>
      <p>나이 : {animalDetail?.age}</p>
      <p>특징 : {animalDetail?.feature}</p>
      <p>성별 : {animalDetail?.gender}</p>
      <p>중성화 여부 : {animalDetail?.isNeuter}</p>
      <p>보호일자 : {animalDetail?.rescueDate ? "Y" : "N"}</p>
      <p>보호위치 : {animalDetail?.rescueLocation}</p>
      <button onClick={handleUpdate}>수정</button>
    </div>
  );
}

export default AnimalDetailPage;
