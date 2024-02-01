import { useEffect, useState } from "react";
import LostAnimalSearch from "../../../components/animalinfo/lostanimals/LostAnimalSearch";
import API from "../../../util/axios";
import LostAnimalCard from "../../../components/animalinfo/lostanimals/LostAnimalCard";

function LostAnimalListPage() {
  const [lostAnimalData, setLostAnimalData] = useState([]);
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
        const res = await API.get("/lost-animals");
        console.log("실행:", res.data);
        setLostAnimalData(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    searchData();
  }, []);

  return (
    <>
      <LostAnimalSearch animals={lostAnimalData} />
      <div>
        {lostAnimalData.map((animal: LostRegistrationData) => (
          <LostAnimalCard key={animal.animalId} animals={animal} />
        ))}
      </div>
    </>
  );
}

export default LostAnimalListPage;
