// import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AnimalDetailPage() {
  const { animalID } = useParams();
  // const [animalData, setAnimalData] = useState([]);
  console.log("animalID", animalID);

  // useEffect(() => {
  //   // animalID를 사용하여 데이터를 가져오기 위한 API 엔드포인트를 적절히 수정하세요.
  //   const apiUrl = `https://api.example.com/save-animals/${animalID}`;

  //   // Axios를 사용하여 데이터 가져오기
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       setAnimalData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching animal data:", error);
  //     });
  // }, [animalID]);

  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/save-update`);
  };
  return (
    <div>
      <h1>AnimalDetailPage</h1>
      <p>Animal ID: {animalID}</p>
      {/* <p>{animalData}</p> */}
      <button onClick={handleUpdate}>수정</button>
    </div>
  );
}

export default AnimalDetailPage;
