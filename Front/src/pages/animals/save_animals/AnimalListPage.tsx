import { useEffect, useState } from "react";
import SaveAnimalSearch from "../../../components/animalinfo/savedanimals/SaveAnimalSearch";
import Pagination from "../../../components/common/Pagination";
// import API from "../../../util/axios";
import SaveAnimalCard, {
  SaveAnimal,
} from "../../../components/animalinfo/savedanimals/SaveAnimalCard";
import { isOrg as org } from "../../../pages/users/SignInPage";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import condition from "../../../assets/condition.png";

interface StyledButtonProps {
  $isOrg: boolean;
}

export const ListStyle = styled.div<{ $itemsPerRow: number }>`
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
  // const cookie = new Cookies();
  // const token = cookie.get("U_ID");
  // const [animalData, setAnimalData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  const [searchedData, setSearchedData] = useState([]);
  const [searchcurrentPage, setSearchCurrentPage] = useState(1);
  const [searchtotalPages, setSearchTotalPages] = useState(1);

  const navigate = useNavigate();
  const isOrg = org();
  const { state } = useLocation();
  // console.log(state.isSearch);
  // console.log(state.responseData.totalElements);
  // console.log(state.responseData.totalPages);
  // console.log(state.responseData.currentPage);

  useEffect(() => {
    const searchData = async () => {
      try {
        // const headers = {
        //   Authorization: token,
        // };

        // const res = await API.get(`/api/animals?page=${currentPage}`, {
        //   headers,
        // });

        // setAnimalData(res.data.animalDtoList);
        // setCurrentPage(res.data.currentPage);
        // setTotalPages(res.data.totalPages);

        // 검색 조건이 있는 경우에만 searchedData에 데이터 설정
        if (state?.responseData) {
          setSearchedData(state.responseData.animalDtoList);
          setSearchCurrentPage(state.responseData.currentPage);
          setSearchTotalPages(state.responseData.totalPages);
        } else {
          setSearchedData([]);
          // setSearchCurrentPage(1);
          setSearchTotalPages(1);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    searchData();
  }, [searchcurrentPage, state]);

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };
  const handleSearchPageChange = (newPage: number) => {
    setSearchCurrentPage(newPage);
  };
  const handleRegistration = () => {
    navigate("/registration");
  };

  return (
    <div>
      <SaveAnimalSearch />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledButton $isOrg={isOrg} onClick={handleRegistration}>
          동물 등록
        </StyledButton>
      </div>
      {/* animalData.map((animal: SaveAnimal) => (
              <SaveAnimalCard key={animal.animalId} animals={animal} />
            ))} */}
      <ListStyle $itemsPerRow={10}>
        {searchedData.length > 0 ? (
          searchedData.map((animal: SaveAnimal) => (
            <SaveAnimalCard key={animal.animalId} animals={animal} />
          ))
        ) : (
          <div>
            <img src={condition} alt="condition"></img>
            <div>조건에 맞는 아이가 등록되지 않았어요.</div>
          </div>
        )}
      </ListStyle>
      <Pagination
        totalPages={searchtotalPages}
        onPageChange={handleSearchPageChange}
        currentPage={searchcurrentPage}
      />
      {/* {searchedData.length > 0 ? (
        <Pagination
          totalPages={searchtotalPages}
          onPageChange={handleSearchPageChange}
          currentPage={searchcurrentPage}
        />
      ) : (
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )} */}
    </div>
  );
}

export default AnimalListPage;
