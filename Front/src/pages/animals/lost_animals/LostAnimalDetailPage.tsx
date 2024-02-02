// import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../util/axios";

interface LostAnimalDetail {
  animalType: string;
  breed: string;
  name: string;
  age: string;
  gender: string;
  weight: string;
  lostLocation: string;
  lostDate: string;
  feature: string;
  imgName: string;
  lostAnimalId: number;
}

function LostAnimalDetailPage() {
  const { animalID } = useParams();
  const [lostanimalDetail, setLostAnimalDetail] =
    useState<LostAnimalDetail | null>(null);

  console.log("lostanimalID", animalID);

  useEffect(() => {
    const apiUrl = `api/lost-animals/${animalID}`;
    API.get(apiUrl)
      .then((res) => {
        console.log(res.data);
        setLostAnimalDetail(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [animalID]);

  const navigate = useNavigate();

  const handleUpdate = () => {
    // Update API call
    // Replace 'updateAnimalDetails' with your actual function
    // Example:
    // api.updateAnimalDetails(animalID, { breed, image, gender, ... });
    // After updating, navigate back to AnimalDetailPage
    navigate(`/lost-update/${animalID}`);
  };
  return (
    <>
      <h1>AnimalDetailPage</h1>
      <p>품종 : {lostanimalDetail?.breed.replace(/_/g, " ")}</p>
      <p>몸무게 : {lostanimalDetail?.weight}</p>
      <p>나이 : {lostanimalDetail?.age}</p>
      <p>특징 : {lostanimalDetail?.feature}</p>
      <p>성별 : {lostanimalDetail?.gender}</p>
      <p>실종일자 : {lostanimalDetail?.lostDate ? "Y" : "N"}</p>
      <p>실종위치 : {lostanimalDetail?.lostLocation}</p>
      <button onClick={handleUpdate}>수정</button>
    </>
  );
}

export default LostAnimalDetailPage;
