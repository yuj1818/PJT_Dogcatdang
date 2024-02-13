import { useParams } from "react-router-dom";

const AnimalList: React.FC = () => {
  const params = useParams();
  const sessionId = params["*"];
  console.log(sessionId);

  // 방송 연 동물 상세정보 요청

  return <></>;
};

export default AnimalList;
