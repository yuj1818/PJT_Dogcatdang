import { contentData } from "./ContentBox";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoMale, IoFemale } from "react-icons/io5";

const CardBox = styled.div`
  width: 19%;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  height: 22vh;

  .img {
    width: 100%;
    height: 70%;
  }

  .box {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;

    .info {
      font-family: 'SUITE-SemiBold'
    }
  }
`

const Card: React.FC<{ data: contentData, contentId: number, menu: string }> = ({ data, contentId, menu }) => {
  const navigate = useNavigate();
  
  const goDetail = () => {
    if (menu === '관심 동물' || menu === '보호 동물') {
      navigate(`/save-animals/${contentId}`);
    } else {
      navigate(`/articles/detail/${contentId}`);
    }
  };

  return (
    <CardBox onClick={goDetail}>
      <img className="img" src={menu === '관심 동물' || menu === '보호 동물' ? data.imgUrl : data.thumbnailImgUrl} alt="이미지" />
      <div className="box">
        {
          menu === '관심 동물' || menu === '보호 동물' ?
          <p className="info whitespace-nowrap text-ellipsis overflow-hidden flex items-center gap-2">{data.breed}{data.gender === '암컷' ? <IoFemale /> : <IoMale />}</p>
          :
          <p className="info whitespace-nowrap text-ellipsis overflow-hidden">{data.title}</p>
        }
      </div>
    </CardBox>
  )
}

export default Card;