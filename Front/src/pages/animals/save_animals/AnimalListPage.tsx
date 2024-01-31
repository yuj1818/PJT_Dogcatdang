import { useState } from "react";
import SaveAnimalSearch from "../../../components/animalinfo/savedanimals/SaveAnimalSearch";
import Pagination from "../../../components/articles/Pagination";

function AnimalListPage() {
  const animalData = [
    {
      id: 1,
      shelterName: "동물 보호소 A",
      animalType: "강아지",
      breed: "불독",
      age: 2,
      weight: 900,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 강아지입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "서울특별시 강서구",
      gender: "남",
      isNeuter: false,
    },
    {
      id: 2,
      shelterName: "동물 보호소 A",
      animalType: "고양이",
      breed: "먼치킨",
      age: 3,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
    {
      id: 3,
      shelterName: "동물 보호소 A",
      animalType: "고양이",
      breed: "먼치킨",
      age: 4,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
    {
      id: 4,
      shelterName: "동물 보호소 A",
      animalType: "고양이",
      breed: "먼치킨",
      age: 3,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
    {
      id: 5,
      shelterName: "동물 보호소 A",
      animalType: "고양이",
      breed: "먼치킨",
      age: 3,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
    {
      id: 6,
      shelterName: "동물 보호소 A",
      animalType: "고양이",
      breed: "먼치킨",
      age: 3,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
    {
      id: 7,
      shelterName: "동물 보호소 A",
      animalType: "고양이",
      breed: "먼치킨",
      age: 3,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
    {
      id: 8,
      shelterName: "동물 보호소 A",
      animalType: "고양이",
      breed: "먼치킨",
      age: 3,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
    {
      id: 9,
      shelterName: "동물 보호소 A",
      animalType: "고양이",
      breed: "먼치킨",
      age: 3,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
    {
      id: 10,
      shelterName: "동물 보호소 A",
      animalType: "고양이",
      breed: "먼치킨",
      age: 3,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
    {
      id: 11,
      shelterName: "동물 보호소 A",
      animalType: "고양이",
      breed: "먼치킨",
      age: 3,
      weight: 600,
      color: "흰색",
      feature: "사람을 잘 따르는 활발한 성격의 고양이입니다.",
      rescueDate: "2024-01-12",
      rescueLocation: "부산광역시 강서구",
      gender: "여",
      isNeuter: true,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    console.log(`Page changed to: ${newPage}`);
    console.log(`현재 페이지: ${currentPage}`);
  };
  return (
    <>
      <SaveAnimalSearch animals={animalData} />
      <Pagination
        totalItems={animalData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default AnimalListPage;
