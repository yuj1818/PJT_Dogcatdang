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
    userNickname: string;
  }

  interface StyledButtonProps {
    isOrg: boolean;
  }
  const ListStyle = styled.div<{ $itemsPerRow: number }>`
  width:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* 
div {
  flex-basis: ${(props) => `calc(${100 / props.$itemsPerRow}%)`};
  display: flex;
  align-items: center;
  flex-direction: column;
} */
  `;
  const Space = styled.div`
  flex-grow: 1;
`;

  const StyledButton = styled.button<StyledButtonProps>`
  display: ${({ isOrg }) => isOrg ? "block" : "none"};
  background-color: black;
  color: white;
  border-radius: 10px;
  width: 10%;
  height: 35px;
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

  console.log(animalData);
  return (
    <div>
      <SaveAnimalSearch animals={animalData} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledButton isOrg={isOrg} onClick={handleRegistration}>
          동물 등록
        </StyledButton>
      </div>

      <ListStyle $itemsPerRow={10}>
        {animalData.map((animal: RegistrationData) => (
          <SaveAnimalCard key={animal.animalId} animals={animal} />
        ))}
        <Space></Space>
      </ListStyle>
      <Pagination
        totalItems={totalElements}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AnimalListPage;
