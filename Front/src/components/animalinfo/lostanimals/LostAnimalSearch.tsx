import React, { useState } from "react";
import Select from "react-select";
import styled, { css } from "styled-components";
import SearchImg from "../../../assets/Search.png";
import "./search.css";
import {
  dogInput,
  catInput,
  regionInput,
  countryInput,
} from "../../../components/animalinfo/Input";
import { Select as Select1 } from "../../../components/animalinfo/style";
import { LostFilterData, lost_search } from "../../../util/LostAPI";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// interface LostAnimalType {
//   animalId: number;
//   animalType: string;
//   breed: string;
//   age: string;
//   weight: string;
//   lostDate: string;
//   selectedCity: string;
//   selectedDistrict: string;
//   detailInfo: string;
//   name: string;
//   gender: string;
//   feature: string;
//   state: string;
//   imgName: string;
//   imgUrl: string;
// }

function LostAnimalSearch() {
  const [animalType, setAnimalType] = useState("강아지");
  const [breed, setBreed] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const cookie = new Cookies();
  const navigate = useNavigate()

  const transformedDogInput = dogInput.map((dog) => ({
    value: dog,
    label: dog,
  }));
  const transformedCatInput = catInput.map((cat) => ({
    value: cat,
    label: cat,
  }));
  const genderInput = ["전체", "암컷", "수컷"];

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

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = cookie.get("U_ID");
    const data: LostFilterData = {
      animalType: animalType !== undefined ? animalType : "",
      breed: breed !== undefined ? breed.replace(/\s/g, "_") : "",
      selectedCity: region !== undefined ? region : "",
      selectedDistrict: country !== undefined ? country : "",
      gender: gender !== undefined ? gender : "",
    };

    try {
      const responseData = await lost_search(data, token);
      console.log(responseData);
      navigate(`/lost-animals`, { state: responseData });
    } catch (error) {
      console.error("Error filtered data:", error);
    }
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
        filter: blur(1px);
        opacity: 0.9;
      `};
  `;

  return (
    <div className="container">
      <img
        src={SearchImg}
        alt="search"
        style={{
          position: "absolute",
          right: 200,
          top: 0,
          width: "70px",
          height: "70px",
        }}
      ></img>
      <form className="search-form" onSubmit={handleSearch}>
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
        <div className="form-group">
          <Select
            name="breed"
            id="breed"
            value={
              animalType === "강아지"
                ? transformedDogInput.find((option) => option.value === breed)
                : transformedCatInput.find((option) => option.value === breed)
            }
            options={
              animalType === "강아지"
                ? transformedDogInput
                : transformedCatInput
            }
            onChange={(selectedOption) => setBreed(selectedOption?.value || "")}
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
              countryInput[regionInput.indexOf(region)].map((ct, index) => (
                <option key={index} value={ct}>
                  {ct}
                </option>
              ))}
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
          <button
            className="search-button"
            type="submit"
          >
            검색
          </button>
        </div>
      </form>
    </div>
  );
}

export default LostAnimalSearch;
