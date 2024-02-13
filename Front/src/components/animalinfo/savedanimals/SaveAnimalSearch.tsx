import React, { useState } from "react";
import styled, { css } from "styled-components";
import Select from "react-select";
import SearchImg from "../../../assets/Search.png";
import "../search.css";
import {
  dogInput,
  catInput,
  regionInput,
  countryInput,
} from "../../../components/animalinfo/Input";
import { Input, Select as Select1 } from "../../../components/animalinfo/style";
import { Cookies } from "react-cookie";
import { search, FilterData } from "../../../util/SaveAPI";
import { useNavigate } from "react-router-dom";
import { Title } from "../../common/Title";

export interface AnimalType {
  animalId: number;
  code: string;
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
  imgUrl: string;
  userNickname: string;
  like: boolean;
  rescueLocation: string;
  adoptionApplicantCount: number;
}

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

function SaveAnimalSearch() {
  const [animalType, setAnimalType] = useState("강아지");
  const [region, setRegion] = useState("");
  const [breed, setBreed] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [shelterName, setShelterName] = useState("");
  const isSearch = true;
  // const [filteredAnimalData, setFilteredAnimalData] = useState(animals);
  // const [currentPage, setCurrentPage] = useState(1);
  const genderInput = ["전체", "암컷", "수컷"];

  const transformedDogInput = dogInput.map((dog) => ({
    value: dog,
    label: dog,
  }));
  const transformedCatInput = catInput.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const handleAnimalType = (type: string) => {
    setAnimalType(type);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleShelterNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShelterName(event.target.value);
  };
  const cookie = new Cookies();
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = cookie.get("U_ID");
    // const rescueLocation: string = region + " " + country
    const data: FilterData = {
      animalType: animalType !== undefined ? animalType : "",
      breed: breed !== undefined ? breed.replace(/\s/g, "_") : "",
      selectedCity: region !== undefined ? region : "",
      selectedDistrict: country !== undefined ? country : "",
      gender: gender !== undefined ? gender : "",
      userNickname: shelterName !== undefined ? shelterName : "",
    };

    try {
      const responseData = await search(data, token);
      // console.log(responseData);
      navigate(`/save-animals`, { state: { responseData, isSearch } });
    } catch (error) {
      console.error("Error filtered data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3">
        <Title className="title">보호 동물 조회</Title>
        <hr className="border-black" />
      </div>
      <div className="container">
        <img
          src={SearchImg}
          alt="search"
          style={{
            position: "absolute",
            right: 90,
            top: 0,
            width: "70px",
            height: "70px",
          }}
        ></img>
        <form className="search-form" onSubmit={handleSearch}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <div className="button-group">
                <AnimalButton
                  selected={animalType === "고양이"}
                  onClick={() => handleAnimalType("강아지")}
                  name="animalType"
                  type="button"
                >
                  강아지
                </AnimalButton>
                <AnimalButton
                  selected={animalType === "강아지"}
                  onClick={() => handleAnimalType("고양이")}
                  name="animalType"
                  type="button"
                >
                  고양이
                </AnimalButton>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="form-group">
                <Select
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
                      width: "160px",
                      height: "60px",
                    }),
                  }}
                />
              </div>
              <div className="form-group">
                <Select1
                  name="region"
                  id="region"
                  value={region}
                  onChange={handleRegionChange}
                  className="custom-input"
                >
                  <option value="" disabled hidden>
                    시/도 선택
                  </option>
                  {regionInput.map((pr) => (
                    <option key={pr} value={pr}>
                      {pr}
                    </option>
                  ))}
                </Select1>
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
                <Input
                  type="text"
                  id="shelterName"
                  name="shelterName"
                  value={shelterName}
                  onChange={handleShelterNameChange}
                  placeholder="보호기관명"
                  className="custom-input"
                />
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
    </div>
  );
}

export default SaveAnimalSearch;
