import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { regist } from "../../../util/SaveAPI";
import { Cookies } from "react-cookie";
import {
  dogInput,
  catInput,
  regionInput,
  countryInput,
} from "../../../components/animalinfo/Input";
import { RegistForm } from "../../../components/animalinfo/style";

function AnimalFormPage() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [detailInfo, setDetailInfo] = useState("");
  const [state, setState] = useState("");
  const [imgName, setImgName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [animalType, setAnimalType] = useState("강아지");
  const [breed, setBreed] = useState("");

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [rescueDate, setRescueDate] = useState("");
  const [isNeuter, setIsNeuter] = useState(false);
  const [feature, setFeature] = useState("");

  const handleCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleDistrict = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
  };
  const handleDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailInfo(e.target.value);
  };

  const handleBreed = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBreed(e.target.value);
  };

  const handleRescueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRescueDate(e.target.value);
  };

  const handleIsNeuter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNeuter(e.target.checked);
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = cookie.get("U_ID");
    console.log(token);

    const data = {
      animalType: animalType,
      breed: breed,
      age: age,
      weight: weight,
      rescueDate: rescueDate,
      selectedCity: selectedCity,
      selectedDistrict: selectedDistrict,
      detailInfo: detailInfo,
      isNeuter: isNeuter,
      gender: gender,
      feature: feature,
      state: state,
      imgName: imgName,
      imgUrl: imgUrl,
      code: 'e202' // 임시 수정
    };

    const response = await regist(data, token);
    console.log(response);
    navigate("/save-animals");
  };

  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage((reader.result as string) || null);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1 style={{ fontSize: "2em", fontWeight: "bold" }}>보호 동물 등록</h1>
      <hr />
      <div className="flex justify-center h-screen gap-5">
        <RegistForm onSubmit={handleRegistration}>
          <div className="flex">
            <div
              className="flex"
              style={{
                flexDirection: "column",
                justifyContent: "center",
                // marginBottom:'20px'
              }}
            >
              <div>
                <label>이미지</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              {selectedImage && (
                <div style={{ marginTop: "1.5rem" }}>
                  <img
                    src={selectedImage}
                    alt="미리보기"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <div className="box">
                <label className="item">
                  <input
                    type="radio"
                    value="강아지"
                    checked={animalType === "강아지"}
                    onChange={() => setAnimalType("강아지")}
                  />
                  강아지
                </label>
                <label className="item">
                  <input
                    type="radio"
                    value="고양이"
                    checked={animalType === "고양이"}
                    onChange={() => setAnimalType("고양이")}
                  />
                  고양이
                </label>
              </div>
              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item" htmlFor="breed">
                    품종
                  </label>
                  <select
                    className="input"
                    name="breed"
                    id="breed"
                    value={breed}
                    onChange={handleBreed}
                  >
                    <option value="" disabled hidden>
                      품종 선택
                    </option>
                    {animalType === "강아지"
                      ? dogInput.map((type, index) => (
                          <option key={index} value={type.replace(/\s/g, "_")}>
                            {type}
                          </option>
                        ))
                      : catInput.map((type, index) => (
                          <option key={index} value={type.replace(/\s/g, "_")}>
                            {type}
                          </option>
                        ))}
                  </select>
                </div>
              </div>

              <div>
                <label>
                  이미지이름 :
                  <input
                    type="text"
                    value={imgName}
                    onChange={(e) => setImgName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  이미지URL :
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">성별</label>
                  <select
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      성별 선택
                    </option>
                    <option value="남">남</option>
                    <option value="여">여</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">추정나이</label>
                  <input
                    className="input"
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">체중</label>
                  <input
                    className="input"
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item" htmlFor="지역">
                    지역
                  </label>
                  <select
                    className="input"
                    name="region"
                    id="region"
                    value={selectedCity}
                    onChange={handleCity}
                  >
                    <option value="" disabled hidden>
                      시/도 선택
                    </option>
                    {regionInput.map((pr) => (
                      <option key={pr} value={pr}>
                        {pr}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="box">
                  <label className="item" htmlFor=""></label>
                  <select
                    className="input"
                    name="country"
                    id="country"
                    value={selectedDistrict}
                    onChange={handleDistrict}
                  >
                    <option value="" disabled hidden>
                      시/구/군 선택
                    </option>
                    {countryInput[regionInput.indexOf(selectedCity)] &&
                      countryInput[regionInput.indexOf(selectedCity)].map(
                        (ct, index) => (
                          <option key={index} value={ct}>
                            {ct}
                          </option>
                        )
                      )}
                  </select>
                </div>
                <div className="box">
                  <label className="item">상세주소</label>
                  <input
                    className="input"
                    type="text"
                    value={detailInfo}
                    onChange={handleDetail}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">발견일자</label>
                  <input
                    className="input"
                    type="date"
                    value={rescueDate}
                    onChange={handleRescueDate}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">중성화 여부</label>
                  <input
                    type="checkbox"
                    name="isNeutered"
                    checked={isNeuter}
                    onChange={handleIsNeuter}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">보호현황</label>
                  <select
                    className="input"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      보호현황
                    </option>
                    <option value="보호중">보호중</option>
                    <option value="입양완료">입양완료</option>
                    <option value="안락사">안락사</option>
                    <option value="자연사">자연사</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">특징</label>
                  <input
                    className="input"
                    type="text"
                    value={feature}
                    onChange={(e) => setFeature(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="custom-button">
            <button type="submit">등록</button>
          </div>
        </RegistForm>
      </div>
    </>
  );
}

export default AnimalFormPage;
