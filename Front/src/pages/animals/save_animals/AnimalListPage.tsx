import { useEffect, useState } from "react";
import SaveAnimalSearch from "../../../components/animalinfo/savedanimals/SaveAnimalSearch";
import Pagination from "../../../components/common/Pagination";
import API from "../../../util/axios";
import SaveAnimalCard from "../../../components/animalinfo/savedanimals/SaveAnimalCard";
import { isOrg as org } from "../../../pages/users/SignInPage";
import { useNavigate } from "react-router-dom";

function AnimalListPage() {
  const [animalData, setAnimalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const isOrg = org();
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
        const res = await API.get("/api/animals");
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
  const handleRegistration = () => {
    navigate("/registration");
  };

  return (
    <>
      <SaveAnimalSearch animals={animalData} />
      <button
        onClick={handleRegistration}
        style={{ display: isOrg ? "block" : "none" }}
      >
        동물 등록
      </button>
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
