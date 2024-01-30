import React from "react";
import LostAnimalSearch from "../../../components/animalinfo/lostanimals/LostAnimalSearch";

function LostAnimalListPage() {
  const animalData = [
    {
      id: 1,
      name: "소금이",
      animalType: "강아지",
      breed: "불독",
      age: 2,
      weight: 900,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 강아지입니다.",
      lostDate: "2024-01-12",
      lostLocation: "서울특별시 강서구",
      gender: "남",
      isNeuter: false,
    },
    {
      id: 2,
      name: "하양이",
      animalType: "고양이",
      breed: "먼치킨",
      age: 3,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      lostDate: "2024-01-12",
      lostLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
  ];
  return <LostAnimalSearch animals={animalData} />;
}

export default LostAnimalListPage;
