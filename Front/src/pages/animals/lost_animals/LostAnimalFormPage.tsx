import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lost_regist } from "../../../util/LostAPI";
import { Cookies } from "react-cookie";
import {
  dogInput,
  catInput,
  regionInput,
  countryInput,
} from "../../../components/animalinfo/Input";
import { RegistForm } from "../../../components/animalinfo/style";
import { Input, Select } from "../../../components/animalinfo/style";
import { requestS3 } from "../../../util/S3";

function LostAnimalFormPage() {
  const navigate = useNavigate();
  const cookie = new Cookies();

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [detailInfo, setDetailInfo] = useState("");
  const [state, setState] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [animalType, setAnimalType] = useState("강아지");
  const [breed, setBreed] = useState("");

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [name, setName] = useState("");
  const [feature, setFeature] = useState("");

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = cookie.get("U_ID");

    const data = {
      animalType: animalType,
      breed: breed,
      age: age,
      weight: weight,
      lostDate: lostDate,
      selectedCity: selectedCity,
      selectedDistrict: selectedDistrict,
      detailInfo: detailInfo,
      name: name,
      gender: gender,
      feature: feature,
      state: state,
      imgUrl: imgUrl,
    };

    const response = await lost_regist(data, token);
    console.log(response);

    navigate("/lost-animals");
  };
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
    setLostDate(e.target.value);
  };

  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage((reader.result as string) || null);
      };
      reader.readAsDataURL(file);
      try {
        const uploadedImageUrl = await requestS3({
          name: file.name.replace(/\.[^/.]+$/, ""),
          file: file,
        });
        // console.log("Name:", file.name.replace(/\.[^/.]+$/, ""));
        // console.log("URL:", uploadedImageUrl);
        if (uploadedImageUrl) {
          setImgUrl(uploadedImageUrl);
        } else {
          console.error("Error: Uploaded image URL is undefined");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <h1 style={{ fontSize: "2em", fontWeight: "bold" }}>실종 동물 등록</h1>
      <hr />
      <div className="flex justify-center h-screen gap-5">
        <RegistForm onSubmit={handleRegistration}>
          <div className="flex">
            <div
              className="flex"
              style={{
                flexDirection: "column",
                justifyContent: "center",
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
                  <Select
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
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">이름</label>
                  <Input
                    className="input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">성별</label>
                  <Select
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      성별 선택
                    </option>
                    <option value="남">남</option>
                    <option value="여">여</option>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">나이</label>
                  <Input
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
                  <Input
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
                  <Select
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
                  </Select>
                </div>
                <div className="box">
                  <label className="item" htmlFor=""></label>
                  <Select
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
                  </Select>
                </div>
                <div className="box">
                  <label className="item">상세주소</label>
                  <Input
                    className="input"
                    type="text"
                    value={detailInfo}
                    onChange={handleDetail}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">실종일자</label>
                  <Input
                    className="input"
                    type="date"
                    value={lostDate}
                    onChange={handleRescueDate}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">실종현황</label>
                  <Select
                    className="input"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      실종현황
                    </option>
                    <option value="완료">완료</option>
                    <option value="실종">실종</option>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">특징</label>
                  <Input
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

export default LostAnimalFormPage;
