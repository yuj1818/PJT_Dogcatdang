import { useEffect, useState } from "react";
import LostAnimalSearch from "../../../components/animalinfo/lostanimals/LostAnimalSearch";
import API from "../../../util/axios";
import LostAnimalCard from "../../../components/animalinfo/lostanimals/LostAnimalCard";
import { useNavigate } from "react-router-dom";
import { isOrg as org } from "../../../pages/users/SignInPage";
import Pagination from "../../../components/common/Pagination";
import styled from "styled-components";

function LostAnimalListPage() {
  const [lostAnimalData, setLostAnimalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);

  const navigate = useNavigate();
  const isOrg = org();

  interface LostRegistrationData {
    lostAnimalId: number;
    animalType: string;
    name: string;
    breed: string;
    age: string;
    weight: string;
    lostDate: string;
    selectedCity: string;
    selectedDistrict: string;
    detailInfo: string;
    gender: string;
    feature: string;
    state: string;
    imgName: string;
    imgUrl: string;
  }

  useEffect(() => {
    const searchData = async () => {
      try {
        const res = await API.get(`/api/lost-animals?page=${currentPage}`);
        console.log("실행:", res.data.lostAnimalDtoList);
        console.log("현재페이지:", res.data.currentPage);
        console.log("총:", res.data.totalElements);
        setLostAnimalData(res.data.lostAnimalDtoList);
        setCurrentPage(res.data.currentPage);
        setTotalElements(res.data.totalElements);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    searchData();
  }, [currentPage]);
  const handleRegistration = () => {
    navigate("/lost-registration");
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  interface StyledButtonProps {
    isOrg: boolean;
  }
  const StyledButton = styled.button<StyledButtonProps>`
    display: ${({ isOrg }) => (isOrg ? "none" : "block")};
    background-color: black;
    color: white;
    border-radius: 10px;
    width: 10%;
    height: 35px;
  `;
  const itemsPerPage = 8;
  return (
    <>
      <LostAnimalSearch animals={lostAnimalData} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledButton isOrg={isOrg} onClick={handleRegistration}>
          동물 등록
        </StyledButton>
      </div>
      <div>
        {lostAnimalData.map((animal: LostRegistrationData) => (
          <LostAnimalCard key={animal.lostAnimalId} animals={animal} />
        ))}
      </div>
      <Pagination
        totalItems={totalElements}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default LostAnimalListPage;
