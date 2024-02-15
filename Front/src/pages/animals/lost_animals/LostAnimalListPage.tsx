import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../util/axios";
import LostAnimalCard, {
  LostAnimal,
} from "../../../components/animalinfo/lostanimals/LostAnimalCard";
import {
  dogInput,
  catInput,
  regionInput,
  countryInput,
} from "../../../components/animalinfo/Input";
import { Select as Select1 } from "../../../components/animalinfo/style";
import { isOrg as org } from "../../../pages/users/SignInPage";
import Pagination from "../../../components/common/Pagination";
import styled, { css } from "styled-components";
import { Cookies } from "react-cookie";
import condition from "../../../assets/main-logo-big.png";
import { ListStyle } from "../save_animals/AnimalListPage";
import { LostFilterData } from "../../../util/LostAPI";
import { Title } from "../../../components/common/Title";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import "../../../components/animalinfo/search.css";

interface StyledButtonProps {
  $isOrg: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: ${({ $isOrg }) => ($isOrg ? "none" : "block")};
  background-color: black;
  color: white;
  padding: 8px;
  margin: 3px;
  border-radius: 10px;
  width: 100px;
`;

const AnimalButton = styled.button<{ selected: boolean }>`
  background-color: #ff8331;
  color: white;
  padding: 8px;
  margin: 3px;
  border-radius: 10px;
  width: 100px;

  ${(props) =>
    props.selected &&
    css`
      opacity: 0.5;
    `};

  @media screen and (max-width: 768px) {
    width: 80px;
    font-size: 0.8rem;
  }
`;

function LostAnimalListPage() {
  const cookie = new Cookies();

  const [animalType, setAnimalType] = useState("강아지");
  const [region, setRegion] = useState("");
  const [breed, setBreed] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");

  const [lostAnimalData, setLostAnimalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const isOrg = org();

  const genderInput = ["전체", "암컷", "수컷"];
  const transformedDogInput = dogInput.map((dog) => ({
    value: dog,
    label: dog,
  }));
  const transformedCatInput = catInput.map((cat) => ({
    value: cat,
    label: cat,
  }));
  const transformedRegionInput = regionInput.map((rg) => ({
    value: rg,
    label: rg,
  }));

  const handleAnimalType = (type: string) => {
    setAnimalType(type);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색을 시작하기 전에 상태 초기화
    setLostAnimalData([]);
    setCurrentPage(1);
    setTotalPages(1);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, animalType]);

  const fetchData = async () => {
    try {
      const token = cookie.get("U_ID");
      const data: LostFilterData = {
        animalType: animalType !== undefined ? animalType : "",
        breed: breed !== undefined ? breed : "",
        selectedCity: region !== undefined ? region : "",
        selectedDistrict: country !== undefined ? country : "",
        gender: gender !== undefined ? gender : "",
      };

      const responseData = await API.post(
        `api/lost-animals/filter?page=${currentPage}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (responseData.data.lostAnimalDtoList.length > 0) {
        // 결과가 있을 때만 상태 업데이트
        setLostAnimalData(responseData.data.lostAnimalDtoList);
        setCurrentPage(responseData.data.currentPage);
        setTotalPages(responseData.data.totalPages);
      } else {
        // 결과가 없을 때 상태 초기화
        setLostAnimalData([]);
        setCurrentPage(1);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  };

  const handleRegistration = () => {
    navigate("/lost-registration");
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3">
        <Title className="title">실종 동물 조회</Title>
        <hr className="border-black" />
      </div>
      <div className="container">
        <form className="search-form" onSubmit={handleSearch}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <div className="button-group">
                <AnimalButton
                  selected={animalType === "고양이"}
                  onClick={() => handleAnimalType("강아지")}
                  type="button"
                >
                  강아지
                </AnimalButton>
                <AnimalButton
                  selected={animalType === "강아지"}
                  onClick={() => handleAnimalType("고양이")}
                  type="button"
                >
                  고양이
                </AnimalButton>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="form-group">
                <CreatableSelect
                  isClearable
                  name="breed"
                  id="breed"
                  value={
                    animalType === "강아지"
                      ? transformedDogInput.find(
                          (option) => option.value === breed
                        )
                      : transformedCatInput.find(
                          (option) => option.value === breed
                        )
                  }
                  options={
                    animalType === "강아지"
                      ? transformedDogInput
                      : transformedCatInput
                  }
                  onChange={(selectedOption) =>
                    setBreed(selectedOption?.value || "")
                  }
                  placeholder="품종"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "1px solid #d5967b",
                      padding: "8px",
                      borderRadius: "10px",
                      width: "220px",
                      height: "60px",
                    }),
                  }}
                />
              </div>
              <div className="form-group">
                <Select
                  name="region"
                  id="region"
                  value={transformedRegionInput.find(
                    (option) => option.value === region
                  )}
                  options={regionInput.map((pr) => ({
                    value: pr,
                    label: pr,
                  }))}
                  onChange={(selectedOption) =>
                    setRegion(selectedOption?.value || "")
                  }
                  placeholder="시/도 선택"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "1px solid #d5967b",
                      padding: "8px",
                      borderRadius: "10px",
                      width: "160px",
                      height: "60px",
                    }),
                  }}
                />
              </div>
              <div className="form-group">
                <Select1
                  name="country"
                  id="country"
                  value={country}
                  onChange={handleCountryChange}
                  className="custom-input"
                >
                  <option value="" disabled hidden>
                    시/구/군 선택
                  </option>
                  {countryInput[regionInput.indexOf(region)] &&
                    countryInput[regionInput.indexOf(region)].map(
                      (ct, index) => (
                        <option key={index} value={ct}>
                          {ct}
                        </option>
                      )
                    )}
                </Select1>
              </div>
              <div className="form-group">
                <option value="" disabled hidden>
                  성별
                </option>
                <Select1
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  className="custom-input"
                >
                  <option value="" disabled hidden>
                    성별
                  </option>
                  {genderInput.map((ge) => (
                    <option key={ge} value={ge}>
                      {ge}
                    </option>
                  ))}
                </Select1>
              </div>
              <div className="form-group">
                <button className="search-button" type="submit">
                  검색
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledButton $isOrg={isOrg} onClick={handleRegistration}>
          동물 등록
        </StyledButton>
      </div>
      <ListStyle $itemsPerRow={10}>
        {lostAnimalData && lostAnimalData.length > 0 ? (
          lostAnimalData.map((animal: LostAnimal) => (
            <LostAnimalCard key={animal.lostAnimalId} animals={animal} />
          ))
        ) : (
          <div style={{ margin: "0 auto" }}>
            <img src={condition} alt="condition" />
            <div>조건에 맞는 아이가 등록되지 않았어요.</div>
          </div>
        )}
      </ListStyle>
      {lostAnimalData && lostAnimalData.length > 0 ? (
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default LostAnimalListPage;
