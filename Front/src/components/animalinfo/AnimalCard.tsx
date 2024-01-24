import React from "react";

interface Animal {
  shelter: string;
  breed: string;
  content: string;
  region: string;
}

interface AnimalCardProps {
  animals: Animal;
}

function AnimalCard(props: AnimalCardProps) {
  return (
    <div>
      <h4>보호 기관 : {props.animals.shelter}</h4>
      {/* <img className="img" src={ 'images/img'+ (props.num + 1) +'.jpg' } /> */}
      <h4>품종 : {props.animals.breed}</h4>
      <p>{props.animals.content}</p>
      <p>지역 {props.animals.region}</p>
    </div>
  );
}

export default AnimalCard;
