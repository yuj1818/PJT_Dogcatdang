import React, { useState } from "react";
import styled, { css } from "styled-components";
import Select from "react-select";
import "./search.css";
import {
  dogInput,
  catInput,
  regionInput,
  countryInput,
} from "../../../components/animalinfo/Input";
import { Input, Select as Select1 } from "../../../components/animalinfo/style";

type AnimalType = {
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
};

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

type SaveAnimalSearchProps = {
  animals: AnimalType[];
};

function SaveAnimalSearch({ animals }: SaveAnimalSearchProps) {
  const [animalType, setAnimalType] = useState("강아지");
  const [region, setRegion] = useState("");
  const [breed, setBreed] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [shelterName, setShelterName] = useState("");
  const [filteredAnimalData, setFilteredAnimalData] = useState(animals);
  console.log(filteredAnimalData);
  const genderInput = ["전체", "남", "여"];

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

  const handleSearch = () => {
    // 필터링을 위한 로직을 추가
    const filteredData = animals.filter((animal) => {
      return (
        (animalType === "" || animal.animalType === animalType) &&
        (breed === "" || animal.breed === breed) &&
        // (region === "" || animal.rescueLocation === combinedLocation) &&
        (gender === "" || animal.gender === gender)

        //&& (shelterName === "" || animal.shelterName.includes(shelterName))
      );
    });
    setFilteredAnimalData(filteredData);
  };

  return (
    <div className="container">
      <div className="button-group">
        <AnimalButton
          selected={animalType === "고양이"}
          onClick={() => handleAnimalType("강아지")}
        >
          강아지
        </AnimalButton>
        <AnimalButton
          selected={animalType === "강아지"}
          onClick={() => handleAnimalType("고양이")}
        >
          고양이
        </AnimalButton>
      </div>
      <form className="search-form">
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
          <button
            className="search-button"
            type="button"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      </form>
    </div>
    // {/* <ListStyle $itemsPerRow={4}>
    //{filteredAnimalData.map((animal) => (
    //<SaveAnimalCard key={animal.animalId} animals={animal} />
    //))}
    //</ListStyle> */}
  );
}

export default SaveAnimalSearch;
