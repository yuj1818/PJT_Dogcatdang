import { useEffect, useState } from "react";
import SaveAnimalSearch from "../../../components/animalinfo/savedanimals/SaveAnimalSearch";
import Pagination from "../../../components/articles/Pagination";
import API from "../../../util/axios";

function AnimalListPage() {
  // const animalDataa = [
  //   {
  //     id: 1,
  //     shelterName: "동물 보호소 A",
  //     animalType: "강아지",
  //     breed: "불독",
  //     age: 2,
  //     weight: 900,
  //     color: "흰색",
  //     feature: "사람을 잘 따르는 활발한 성격의 강아지입니다.",
  //     rescueDate: "2024-01-12",
  //     rescueLocation: "서울특별시 강서구",
  //     gender: "남",
  //     isNeuter: false,
  //   },
  // ];

  const [animalData, setAnimalData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  // interface RegistrationData {
  //   animalType: string;
  //   breed: string;
  //   age: string;
  //   weight: string;
  //   rescueDate: string;
  //   selectedCity: string;
  //   selectedDistrict: string;
  //   detailInfo: string;
  //   isNeuter: boolean;
  //   gender: string;
  //   feature: string;
  //   state: string;
  //   imgName: string;
  //   imgUrl: string;
  // }
  useEffect(() => {
    const searchData = async () => {
      try {
        const res = await API.get("/animals");
        console.log("Response:", res);
        setAnimalData(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    searchData();
  }, []); 
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    console.log(`Page changed to: ${newPage}`);
    console.log(`현재 페이지: ${currentPage}`);
  };

  return (
    <>
      <SaveAnimalSearch animals={animalData} />
      {/* <div>
      <ul>
        {animalData.map((animal: RegistrationData) => (
          <li key={animal.id}>
            <strong>{animal.shelterName}</strong>
            <p>Animal Type: {animal.animalType}</p>
            <p>Breed: {animal.breed}</p>
          </li>
        ))}
      </ul>
    </div> */}
      <Pagination
        totalItems={animalData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default AnimalListPage;
