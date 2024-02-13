import { useEffect, useState } from "react";
import LostAnimalSearch from "../../../components/animalinfo/lostanimals/LostAnimalSearch";
import API from "../../../util/axios";
import LostAnimalCard, {
  LostAnimal,
} from "../../../components/animalinfo/lostanimals/LostAnimalCard";
import { useNavigate, useLocation } from "react-router-dom";
import { isOrg as org } from "../../../pages/users/SignInPage";
import Pagination from "../../../components/common/Pagination";
import styled from "styled-components";
import { Cookies } from "react-cookie";

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

function LostAnimalListPage() {
  const cookie = new Cookies();
  const token = cookie.get("U_ID");
  const [lostAnimalData, setLostAnimalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchedData, setSearchedData] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const isOrg = org();

  useEffect(() => {
    const searchData = async () => {
      try {
        const headers = {
          Authorization: token,
        };
        const res = await API.get(`/api/lost-animals?page=${currentPage}`, {
          headers,
        });
        setLostAnimalData(res.data.lostAnimalDtoList);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        if (state) {
          setSearchedData(state);
        } else {
          setSearchedData([]);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    searchData();
  }, [currentPage, state]);
  const handleRegistration = () => {
    navigate("/lost-registration");
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <LostAnimalSearch />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledButton isOrg={isOrg} onClick={handleRegistration}>
          동물 등록
        </StyledButton>
      </div>
      <ListStyle $itemsPerRow={10}>
        {searchedData.length > 0
          ? searchedData.map((animal: LostAnimal) => (
              <LostAnimalCard key={animal.lostAnimalId} animals={animal} />
            ))
          : lostAnimalData.map((animal: LostAnimal) => (
              <LostAnimalCard key={animal.lostAnimalId} animals={animal} />
            ))}
      </ListStyle>
      <Pagination
        totalPages={totalPages}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
}

export default LostAnimalListPage;
