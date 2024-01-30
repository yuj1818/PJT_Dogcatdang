import React, { useState } from "react";
import LostAnimalCard from "./LostAnimalCard";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface AnimalType {
  id: number;
  name: string;
  animalType: string;
  breed: string;
  age: number;
  weight: number;
  color: string;
  feature: string;
  lostDate: string;
  lostLocation: string;
  gender: string;
  isNeuter: boolean;
}

type LostAnimalSearchProps = {
  animals: AnimalType[];
};

function LostAnimalSearch({ animals }: LostAnimalSearchProps) {
  type CountryInput = {
    [key: number]: string[];
  };

  const navigate = useNavigate();
  const [animalType, setAnimalType] = useState("강아지");
  const [breed, setBreed] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [filteredAnimalData, setFilteredAnimalData] = useState(animals);

  const dogInput = [
    "전체",
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
    "전체",
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

  const genderInput = ["전체", "수컷", "암컷"];
  const regionInput = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
    "강원특별자치도",
  ];

  const countryInput: CountryInput = {
    0: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    1: [
      "강서구",
      "금정구",
      "기장군",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
    ],
    2: [
      "군위군",
      "남구",
      "달서구",
      "달성군",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
    ],
    3: [
      "강화군",
      "계양구",
      "남동구",
      "동구",
      "미추홀구",
      "부평구",
      "서구",
      "연수구",
      "옹진군",
      "중구",
    ],
    4: ["광산구", "남구", "동구", "북구", "서구"],
    5: ["대덕구", "동구", "서구", "유성구", "중구"],
    6: ["남구", "동구", "북구", "울주군", "중구"],
    7: [""],
    8: [
      "가평군",
      "고양시 덕양구",
      "고양시 일산동구",
      "고양시 일산서구",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시 분당구",
      "성남시 수정구",
      "성남시 중원구",
      "수원시 권선구",
      "수원시 영통구",
      "수원시 장안구",
      "수원시 팔달구",
      "시흥시",
      "안산시 단원구",
      "안산시 상록구",
      "안성시",
      "안양시 동안구",
      "안양시 만안구",
      "양주시",
      "양평군",
      "여주시",
      "연천군",
      "오산시",
      "용인시 기흥구",
      "용인시 수지구",
      "용인시 처인구",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
    ],
    9: [
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "제천시",
      "증평군",
      "진천군",
      "청주시 상당구",
      "청주시 서원구",
      "청주시 청원구",
      "청주시 흥덕구",
      "충주시",
    ],
    10: [
      "계롱시",
      "공주시",
      "금산군",
      "논산시",
      "당진시",
      "보령시",
      "부여군",
      "서산시",
      "서천군",
      "아산시",
      "예산군",
      "천안시 동남구",
      "천안시 서북구",
      "청양군",
      "태안군",
      "홍성군",
    ],
    11: [
      "고창군",
      "군산시",
      "김제시",
      "남원시",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "익산시",
      "임실군",
      "장수군",
      "전주시 덕진구",
      "전주시 완산구",
      "정읍시",
      "진안군",
    ],
    12: [
      "강진군",
      "고흥군",
      "곡성군",
      "광양시",
      "구례군",
      "나주시",
      "단양군",
      "목포시",
      "무안군",
      "보성군",
      "순천시",
      "신안군",
      "여수시",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
    13: [
      "경산시",
      "경주시",
      "고령군",
      "구미시",
      "김천시",
      "문경시",
      "봉화군",
      "상주시",
      "성주군",
      "안동시",
      "영덕군",
      "영양군",
      "영주시",
      "영천시",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
      "포항시 남구",
      "포항시 북구",
    ],
    14: [
      "거제시",
      "거창군",
      "고성군",
      "김해시",
      "남해군",
      "밀양시",
      "사천시",
      "산청군",
      "양산시",
      "의령군",
      "진주시",
      "창녕군",
      "창원시 마산합포구",
      "창원시 마산회원구",
      "창원시 성산구",
      "창원시 의창구",
      "창원시 진해구",
      "통영시",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
    15: ["서귀포시", "제주시"],
    16: [
      "강릉시",
      "고성군",
      "동해시",
      "삼척시",
      "속초시",
      "양구군",
      "양양군",
      "영월군",
      "원주시",
      "인제군",
      "정선군",
      "철원군",
      "춘천시",
      "태백시",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
  };

  const handleAnimalType = (type: string) => {
    setAnimalType(type);
  };

  const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBreed(event.target.value);
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

  const handleSearch = () => {
    const combinedLocation = region + " " + country;
    console.log(combinedLocation);
    // 필터링을 위한 로직을 추가
    const filteredData = animals.filter((animal) => {
      return (
        (animalType === "" || animal.animalType === animalType) &&
        (breed === "" || animal.breed === breed) &&
        (region === "" || animal.lostLocation === combinedLocation) &&
        (gender === "" || animal.gender === gender)
      );
    });

    setFilteredAnimalData(filteredData);
  };
  const handleRegistration = () => {
    // 등록 버튼을 눌렀을 때 AnimalFormPage로 이동
    navigate("/lost-registration");
  };

  const ListStyle = styled.div<{ $itemsPerRow: number }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    div {
      flex-basis: ${(props) => `calc(${100 / props.$itemsPerRow}%)`};
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  `;

  return (
    <div>
      <button onClick={() => handleAnimalType("강아지")}>강아지</button>
      <button onClick={() => handleAnimalType("고양이")}>고양이</button>
      <form>
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
          <label htmlFor="지역">지역</label>
          <select
            name="region"
            id="region"
            value={region}
            onChange={handleRegionChange}
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
          <select
            name="country"
            id="country"
            value={country}
            onChange={handleCountryChange}
          >
            <option value="" disabled hidden>
              시/구/군 선택
            </option>
            {countryInput[regionInput.indexOf(region)] &&
              countryInput[regionInput.indexOf(region)].map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
          </select>
          <label htmlFor="성별">성별</label>
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="" disabled hidden>
              성별
            </option>
            {genderInput.map((ge) => (
              <option key={ge} value={ge}>
                {ge}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="button" onClick={handleSearch}>
            검색
          </button>
          <button onClick={handleRegistration}>동물 등록</button>
        </div>
      </form>

      <ListStyle $itemsPerRow={4}>
        {filteredAnimalData.map((animal, index) => (
          <div>
            <LostAnimalCard key={index} animals={animal} />
          </div>
        ))}
      </ListStyle>
    </div>
  );
}

export default LostAnimalSearch;
