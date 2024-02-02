import { useEffect, useState } from "react";
import SaveAnimalSearch from "../../../components/animalinfo/savedanimals/SaveAnimalSearch";
import Pagination from "../../../components/common/Pagination";
import API from "../../../util/axios";
import SaveAnimalCard from "../../../components/animalinfo/savedanimals/SaveAnimalCard";
import { isOrg as org } from "../../../pages/users/SignInPage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function AnimalListPage() {
  const [animalData, setAnimalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
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

  const ListStyle = styled.div<{ $itemsPerRow: number }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    /* 
div {
  flex-basis: ${(props) => `calc(${100 / props.$itemsPerRow}%)`};
  display: flex;
  align-items: center;
  flex-direction: column;
} */
  `;

  useEffect(() => {
    const searchData = async () => {
      try {
        const res = await API.get(`/api/animals?page=${currentPage}`);
        console.log("실행:", res.data.animalDtoList);
        console.log("실행:", res.data.currentPage);
        console.log("실행:", res.data.totalElements);
        setAnimalData(res.data.animalDtoList);
        setCurrentPage(res.data.currentPage);
        setTotalElements(res.data.totalElements);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    searchData();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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
      <ListStyle $itemsPerRow={10}>
        {animalData.map((animal: RegistrationData) => (
          <SaveAnimalCard key={animal.animalId} animals={animal} />
        ))}
      </ListStyle>
      <Pagination
        totalItems={totalElements}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default AnimalListPage;
