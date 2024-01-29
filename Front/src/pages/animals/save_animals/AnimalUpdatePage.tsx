import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AnimalUpdatePage() {
  const navigate = useNavigate();
  const { animalID } = useParams();
  const [animalType, setAnimalType] = useState("강아지");

  const dogInput = [
    "불독",
    "골든 리트리버",
    "시베리안 허스키",
    "비글",
    "미니어처 핀셔",
    "보더 콜리",
    "달마시안",
    "요크셔 테리어",
    "보스턴 테리어",
    "프렌치 불도그",
    "시추",
    "래브라도 리트리버",
    "푸들",
    "말티즈",
    "비숑 프리제",
    "도베르만 핀셔",
    "로트와일러",
    "아메리칸 불리",
    "그레이트 데인",
    "보르도 마스티프",
  ];
  const catInput = [
    "먼치킨",
    "러시안 블루",
    "샴",
    "스코티시 폴드",
    "뱅갈",
    "페르시안",
    "시암",
    "아비시니안",
    "메인쿤",
    "봄베이",
    "옷족",
    "터키시 앙고라",
    "노르웨이 숲 고양이",
    "먼치라",
    "라팜",
    "싱가푸라",
    "스핑크스",
    "빙골레즈",
    "스노우슈",
    "맹크스",
  ];

  const [breed, setBreed] = useState("");
  const [protectionStatus, setProtectionStatus] = useState("");
  const [gender, setGender] = useState("");
  const [estimatedAge, setEstimatedAge] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isNeutered, setIsNeutered] = useState(false);
  const [features, setFeatures] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsNeutered(e.target.checked);
  };

  const handleUpdate = () => {
    navigate(`/save-animals/${animalID}`);
  };
  const handleAnimalType = (type: string) => {
    setAnimalType(type);
  };
  const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBreed(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <button onClick={() => handleAnimalType("강아지")}>강아지</button>
        <button onClick={() => handleAnimalType("고양이")}>고양이</button>
        <div>
          <label htmlFor="breed">품종</label>
          <select
            name="breed"
            id="breed"
            value={breed}
            onChange={handleBreedChange}
          >
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
          </select>
        </div>

        <div>
          <label>
            이미지:
            <input type="file" accept="image/*" />{" "}
          </label>
        </div>

        <div>
          <label>
            성별:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            추정나이:
            <input
              type="text"
              value={estimatedAge}
              onChange={(e) => setEstimatedAge(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            체중:
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            발견장소:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            발견일자:
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            중성화 여부:
            <input
              type="checkbox"
              name="isNeutered"
              checked={isNeutered}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <div>
            <label>
              보호현황:
              <select
                value={protectionStatus}
                onChange={(e) => setProtectionStatus(e.target.value)}
              >
                <option value="보호중">보호중</option>
                <option value="입양완료">입양완료</option>
                <option value="안락사">안락사</option>
                <option value="자연사">자연사</option>
              </select>
            </label>
          </div>
        </div>

        <div>
          <label>
            특징:
            <input
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </label>
        </div>
      </form>

      <div>
        <button type="submit" onClick={handleUpdate}>
          수정
        </button>
      </div>
    </div>
  );
}

export default AnimalUpdatePage;
