import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lost_regist } from "../../../util/LostAPI";
import { Cookies } from "react-cookie";

function LostAnimalFormPage() {
  type CountryInput = {
    [key: number]: string[];
  };

  const navigate = useNavigate();
  const cookie = new Cookies();

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
  const [name, setName] = useState("");
  const [feature, setFeature] = useState("");

  const dogInput = [
    "골든 리트리버",
    "그레이 하운드",
    "그레이트 덴",
    "그레이트 피레니즈",
    "꼬똥 드 뚤레아",
    "네오폴리탄 마스티프",
    "노르포크 테리어",
    "노리치 테리어",
    "뉴펀들랜드",
    "닥스훈트",
    "달마시안",
    "댄디 딘몬트 테리어",
    "도고 까니리오",
    "도고 아르젠티노",
    "도베르만",
    "도사",
    "동경견",
    "라브라도 리트리버",
    "라사 압소",
    "라이카",
    "래빗 닥스훈트",
    "랫 테리어",
    "레이크랜드 테리어",
    "로디지안 리즈백",
    "로트와일러",
    "마리노이즈",
    "마스티프",
    "말라뮤트",
    "말티즈",
    "맨체스터 테리어",
    "미니어쳐 닥스훈트",
    "미니어쳐 불 테리어",
    "미니어쳐 슈나우저",
    "미니어쳐 푸들",
    "미니어쳐 핀셔",
    "미디엄 푸들",
    "미텔 스피츠",
    "믹스견",
    "바센지",
    "바셋 하운드",
    "버니즈 마운틴 독",
    "베들링턴 테리어",
    "벨기에 그로넨달",
    "벨기에 쉽독",
    "벨기에 테뷰런",
    "벨지안 셰퍼드 독",
    "보더 콜리",
    "보르조이",
    "보스턴 테리어",
    "복서",
    "볼로네즈",
    "부비에 데 플랑드르",
    "불 테리어",
    "불독",
    "브뤼셀 그리펀",
    "브리타니 스파니엘",
    "블랙 테리어",
    "비글",
    "비숑 프리제",
    "비어디드 콜리",
    "비즐라",
    "빠삐용",
    "사모예드",
    "살루키",
    "삽살개",
    "샤페이",
    "세인트 버나드",
    "센트럴 아시안 오브차카",
    "셔틀랜드 쉽독",
    "셰퍼드",
    "슈나우져",
    "스코티쉬 테리어",
    "스코티시 디어하운드",
    "스태퍼드셔 불 테리어",
    "스탠다드 푸들",
    "스피츠",
    "시바",
    "시베리안 허스키",
    "시베리안 라이카",
    "시잉프랑세즈",
    "시츄",
    "시코쿠",
    "실리햄 테리어",
    "실키테리어",
    "아나톨리안 셰퍼드",
    "아메리칸 불독",
    "아메리칸 스태퍼드셔 테리어",
    "아메리칸 아키다",
    "아메리칸 에스키모",
    "아메리칸 코카 스파니엘",
    "아메리칸 핏불 테리어",
    "아메리칸불리",
    "아이리쉬 레드 앤 화이트 세터",
    "아이리쉬 세터",
    "아이리쉬 울프 하운드",
    "아이리쉬 소프트 코튼휘튼 테리어",
    "아키다",
    "아프간 하운드",
    "알라스칸 말라뮤트",
    "에어델 테리어",
    "오브차카",
    "오스트랄리안 셰퍼드 독",
    "오스트랄리안 캐틀 독",
    "올드 잉글리쉬 불독",
    "올드 잉글리쉬 쉽독",
    "와이마라너",
    "와이어 폭스 테리어",
    "요크셔 테리어",
    "울프독",
    "웨스트 시베리언 라이카",
    "웨스트하이랜드화이트테리어",
    "웰시 코기 카디건",
    "웰시 코기 펨브로크",
    "웰시 테리어",
    "이탈리안 그레이 하운드",
    "잉글리쉬 세터",
    "잉글리쉬 스프링거 스파니엘",
    "잉글리쉬 코카 스파니엘",
    "잉글리쉬 포인터",
    "자이언트 슈나우져",
    "재패니즈 스피츠",
    "잭 러셀 테리어",
    "저먼 셰퍼드 독",
    "저먼 와이어헤드 포인터",
    "저먼 포인터",
    "저먼 헌팅 테리어",
    "제주개",
    "제페니즈칭",
    "진도견",
    "차우차우",
    "차이니즈 크레스티드 독",
    "치와와",
    "카레리안 베어독",
    "카이훗",
    "캐벌리어 킹 찰스 스파니엘",
    "케니스펜더",
    "케리 블루 테리어",
    "케언 테리어",
    "케인 코르소",
    "코리아 트라이 하운드",
    "코리안 마스티프",
    "코카 스파니엘",
    "코카 푸",
    "코카시안오브차카",
    "콜리",
    "클라인스피츠",
    "키슈",
    "키스 훈드",
    "토이 맨체스터 테리어",
    "토이 푸들",
    "티베탄 마스티프",
    "파라오 하운드",
    "파슨 러셀 테리어",
    "팔렌",
    "퍼그",
    "페키니즈",
    "페터데일테리어",
    "포메라니안",
    "포인터",
    "폭스테리어",
    "푸들",
    "풀리",
    "풍산견",
    "프레사까나리오",
    "프렌치 불독",
    "프렌치 브리타니",
    "플랫 코디드 리트리버",
    "플롯하운드",
    "피레니안 마운틴 독",
    "필라 브라질레이로",
    "핏불테리어",
    "허배너스",
    "화이트리트리버",
    "화이트테리어",
    "휘펫",
    "기타",
  ];
  const catInput = [
    "기타",
    "노르웨이 숲",
    "니벨룽",
    "데본 렉스",
    "레그돌",
    "레그돌 라가머핀",
    "맹크스",
    "먼치킨",
    "메인쿤",
    "믹스묘",
    "발리네즈",
    "버만",
    "벵갈",
    "봄베이",
    "브리티쉬롱헤어",
    "브리티시 쇼트헤어",
    "사바나캣샤트룩스",
    "샴",
    "셀커크 렉스",
    "소말리",
    "스노우 슈",
    "스코티시폴드",
    "스핑크스",
    "시베리안 포레스트",
    "싱가퓨라",
    "아메리칸 쇼트헤어",
    "아비시니안",
    "재패니즈밥테일",
    "터키시 앙고라",
    "통키니즈",
    "페르시안",
    "페르시안 친칠라",
    "하바나 브라운",
    "하일랜드 폴드",
    "한국 고양이",
  ];
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
  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = cookie.get("U_ID");
    console.log(token);

    const data = {
      animalType: animalType,
      breed: breed,
      age: age,
      weight: weight,
      lostDate: rescueDate,
      selectedCity: selectedCity,
      selectedDistrict: selectedDistrict,
      detailInfo: detailInfo,
      name: name,
      gender: gender,
      feature: feature,
      state: state,
      imgName: imgName,
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
    setRescueDate(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleRegistration}>
        <label>
          <input
            type="radio"
            value="강아지"
            checked={animalType === "강아지"}
            onChange={() => setAnimalType("강아지")}
          />
          강아지
        </label>
        <label>
          <input
            type="radio"
            value="고양이"
            checked={animalType === "고양이"}
            onChange={() => setAnimalType("고양이")}
          />
          고양이
        </label>
        <div>
          <label htmlFor="breed">품종 : </label>
          <select name="breed" id="breed" value={breed} onChange={handleBreed}>
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
        <div>
          <label>
            이름 :
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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

        <div>
          <label>
            성별 :
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="" disabled hidden>
                성별 선택
              </option>
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            나이 :
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            체중 :
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="지역">지역 : </label>
          <select
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
          <select
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
          <label>
            상세주소 :
            <input type="text" value={detailInfo} onChange={handleDetail} />
          </label>
        </div>

        <div>
          <label>
            발견일자 :
            <input type="date" value={rescueDate} onChange={handleRescueDate} />
          </label>
        </div>
        <div>
          <div>
            <label>
              실종현황 :
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="" disabled hidden>
                  실종현황
                </option>
                <option value="완료">완료</option>
                <option value="실종">실종</option>
              </select>
            </label>
          </div>
        </div>

        <div>
          <label>
            특징 :
            <input
              type="text"
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
            />
          </label>
        </div>

        <div>
          <button type="submit">등록</button>
        </div>
      </form>
    </>
  );
}

export default LostAnimalFormPage;
