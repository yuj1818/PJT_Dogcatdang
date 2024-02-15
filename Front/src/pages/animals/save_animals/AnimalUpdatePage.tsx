import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { saveUpdate } from "../../../util/SaveAPI";
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

function AnimalUpdatePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { animalID } = useParams() as { animalID: string };
  // console.log(state);
  const [selectedCity, setSelectedCity] = useState(
    state.rescueLocation.split(" ")[0] || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [detailInfo, setDetailInfo] = useState("");
  const [savestate, setSaveState] = useState(state.state || "");
  const [imgUrl, setImgUrl] = useState(state.imgUrl || "");
  const [animalType, setAnimalType] = useState(state.animalType || "강아지");
  const [breed, setBreed] = useState(state.breed || "");

  const [gender, setGender] = useState(state.gender || "");
  const [age, setAge] = useState(state.age || "");
  const [weight, setWeight] = useState(state.weight || "");
  const [rescueDate, setRescueDate] = useState(state.rescueDate || "");
  const [isNeuter, setIsNeuter] = useState(state.isNeuter || "");
  const [feature, setFeature] = useState(state.feature || "");
  const [selectedImage, setSelectedImage] = useState<null | string>(
    state.imgUrl || null
  );

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

  const handleIsNeuter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsNeuter(e.target.value);
  };

  const cookie = new Cookies();

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    animalID: string
  ) => {
    e.preventDefault();
    // console.log(animalID);
    const token = cookie.get("U_ID");
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
      state: savestate,
      imgUrl: imgUrl,
    };
    const response = await saveUpdate(data, token, animalID);
    console.log(response);
    navigate(`/save-animals/${animalID}`);
  };

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
      <h1 style={{ fontSize: "2em", fontWeight: "bold" }}>보호 동물 수정</h1>
      <hr />
      <div className="flex justify-center h-screen gap-5">
        <RegistForm onSubmit={(e) => handleUpdate(e, animalID)}>
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
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))
                      : catInput.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                  </Select>
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
                    <option value="수컷">수컷</option>
                    <option value="암컷">암컷</option>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">추정나이</label>
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
                  <label className="item">발견일자</label>
                  <Input
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
                  <Select
                    className="input"
                    value={isNeuter}
                    onChange={handleIsNeuter}
                  >
                    <option value="" disabled hidden>
                      중성화 여부
                    </option>
                    <option value="예">완료</option>
                    <option value="아니오">미완료</option>
                    <option value="미상">미상</option>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="box">
                  <label className="item">보호현황</label>
                  <Select
                    className="input"
                    value={savestate}
                    onChange={(e) => setSaveState(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      보호현황
                    </option>
                    <option value="보호중">보호중</option>
                    <option value="입양완료">입양완료</option>
                    <option value="안락사">안락사</option>
                    <option value="자연사">자연사</option>
                  </Select>
                </div>
              </div>

              <div>
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
          </div>
          <div className="custom-button">
            <button type="submit">수정</button>
          </div>
        </RegistForm>
      </div>
    </>
  );
}

export default AnimalUpdatePage;
