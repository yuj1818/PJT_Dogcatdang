import { useEffect, useState } from "react";
import SaveAnimalSearch from "../../../components/animalinfo/savedanimals/SaveAnimalSearch";
import Pagination from "../../../components/common/Pagination";
import API from "../../../util/axios";
import SaveAnimalCard, { SaveAnimal } from "../../../components/animalinfo/savedanimals/SaveAnimalCard";
import { isOrg as org } from "../../../pages/users/SignInPage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";

interface StyledButtonProps {
  $isOrg: boolean;
}

const ListStyle = styled.div<{ $itemsPerRow: number }>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    flex: 0 0 23%;
    box-sizing: border-box;
    margin: 1%;
  }
  & > div:last-child {
    margin-right: auto;
  }
`;

const StyledButton = styled.button<StyledButtonProps>`
  display: ${({ $isOrg }) => ($isOrg ? "block" : "none")};
  background-color: black;
  color: white;
  border-radius: 10px;
  width: 10%;
  height: 35px;
`;

function AnimalListPage() {
  const cookie = new Cookies();
  const token = cookie.get("U_ID");
  const [animalData, setAnimalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const isOrg = org();

  useEffect(() => {
    const searchData = async () => {
      try {
        const headers = {
          Authorization: token,
        };

        const res = await API.get(`/api/animals?page=${currentPage}`, {
          headers,
        });
        // console.log("실행:", res.data.animalDtoList);
        // console.log("실행:", res.data.currentPage);
        // console.log(res.data.animalDtoList);
        setAnimalData(res.data.animalDtoList);
        setCurrentPage(res.data.currentPage);
        setTotalElements(res.data.totalElements);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    searchData();
  }, [currentPage, token]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleRegistration = () => {
    navigate("/registration");
  };

  return (
    <div>
      <SaveAnimalSearch animals={animalData} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledButton $isOrg={isOrg} onClick={handleRegistration}>
          동물 등록
        </StyledButton>
      </div>

      <ListStyle $itemsPerRow={10}>
        {animalData.map((animal: SaveAnimal) => (
          <SaveAnimalCard key={animal.animalId} animals={animal} />
        ))}
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
