import React from "react";

interface Animal {
  shelterName: string;
  animalType: string;
  breed: string;
  age: number;
  weight: number;
  color: string;
  feature: string;
  rescueDate: string;
  rescueLocation: string;
  gender: string;
}

interface AnimalCardProps {
  animals: Animal;
}

function AnimalCard(props: AnimalCardProps) {
  return (
    <div>
      <h4>보호 기관 : {props.animals.shelterName}</h4>
      {/* <img className="img" src={ 'images/img'+ (props.num + 1) +'.jpg' } /> */}
      <h4>품종 : {props.animals.breed}</h4>
      <p>{props.animals.feature}</p>
      <p>지역 : {props.animals.rescueLocation}</p>
    </div>
  );
}

export default AnimalCard;
