import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../../components/animalinfo/LikeButton";
import { useState } from "react";
import axios from "axios";
import API from "../../../util/axios";

interface Animal {
  animalId: number;
  animalType: string;
  breed: string;
  age: string;
  weight: string;
  rescueDate: string;
  selectedCity: string;
  selectedDistrict: string;
  detailInfo: string;
  isNeuter: boolean;
  gender: string;
  feature: string;
  state: string;
  imgName: string;
  imgUrl: string;
  userNickname: string;
}

interface AnimalCardProps {
  animals: Animal;
}


const Card = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 7px 0px 15px 0px;
  width: 22%;
`;

function SaveAnimalCard(props: AnimalCardProps) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const gotoDetailPage = () => {
    navigate(`/save-animals/${props.animals.animalId}`);
  };
  const handleToggleLike = () => {
    // if(!currentUser) {
    //   return
    // }
    // try {
    //   let request;
    //   if(hasLike) {
    //     request = () => API.delete(`api/`)
    //   }
    // }
    setLiked(!liked);
  };

  return (
      <Card>
          <div onClick={gotoDetailPage}>
            {/* <h4>보호 기관 : {props.animals.shelterName}</h4> */}
            {/* <img className="img" src={ 'images/img'+ (props.num + 1) +'.jpg' } /> */}
            <h4>품종 : {props.animals.breed.replace(/_/g, " ")}</h4>
            <p>성별 : {props.animals.gender}</p>
            <p>보호기관 : {props.animals.userNickname}</p>
            <p>중성화 여부 : {props.animals.isNeuter ? "Y" : "N"}</p>
          </div>
          <div style={{display:'flex', justifyContent: 'end'}}>
            <LikeButton animalId={props.animals.animalId}
            isActive={liked}
            onToggle={handleToggleLike}></LikeButton>
          </div>
      </Card>
  );
}

export default SaveAnimalCard;
