import { useEffect, useState } from "react";
import SaveAnimalSearch from "../../../components/animalinfo/savedanimals/SaveAnimalSearch";
import Pagination from "../../../components/articles/Pagination";
import API from "../../../util/axios";
import SaveAnimalCard from "../../../components/animalinfo/savedanimals/SaveAnimalCard";

function AnimalListPage() {
  const [animalData, setAnimalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  interface RegistrationData {
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
  useEffect(() => {
    const searchData = async () => {
      try {
        const res = await API.get("/animals");
        console.log("실행:", res.data);
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

      <div>
        {animalData.map((animal: RegistrationData) => (
          <SaveAnimalCard key={animal.animalId} animals={animal} />
        ))}
      </div>
      <Pagination
        totalItems={animalData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default AnimalListPage;
