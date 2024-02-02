import { useEffect, useState } from "react";
import LostAnimalSearch from "../../../components/animalinfo/lostanimals/LostAnimalSearch";
import API from "../../../util/axios";
import LostAnimalCard from "../../../components/animalinfo/lostanimals/LostAnimalCard";
import { useNavigate } from "react-router-dom";
import { isOrg as org } from "../../../pages/users/SignInPage";

function LostAnimalListPage() {
  const [lostAnimalData, setLostAnimalData] = useState([]);
  const navigate = useNavigate();
  const isOrg = org();

  interface LostRegistrationData {
    animalId: number;
    animalType: string;
    name: string;
    breed: string;
    age: string;
    weight: string;
    lostDate: string;
    selectedCity: string;
    selectedDistrict: string;
    detailInfo: string;
    gender: string;
    feature: string;
    state: string;
    imgName: string;
    imgUrl: string;
  }
  useEffect(() => {
    const searchData = async () => {
      try {
        const res = await API.get("/api/lost-animals");
        console.log("실행:", res.data);
        setLostAnimalData(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    searchData();
  }, []);
  const handleRegistration = () => {
    navigate("/lost-registration");
  };
  return (
    <>
      <LostAnimalSearch animals={lostAnimalData} />
      <button
        onClick={handleRegistration}
        style={{ display: isOrg ? "none" : "block" }}
      >
        동물 등록
      </button>
      <div>
        {lostAnimalData.map((animal: LostRegistrationData) => (
          <LostAnimalCard key={animal.animalId} animals={animal} />
        ))}
      </div>
    </>
  );
}

export default LostAnimalListPage;
