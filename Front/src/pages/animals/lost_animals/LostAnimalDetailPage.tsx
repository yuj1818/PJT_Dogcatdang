// import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../util/axios";
import { Container, Top, Leftside, Rightside } from "../StyleDetail"

interface LostAnimalDetail {
  animalType: string;
  breed: string;
  name: string;
  age: string;
  gender: string;
  weight: string;
  lostLocation: string;
  lostDate: string;
  feature: string;
  userNickname: string;
  imgName: string;
  lostAnimalId: number;
}

function LostAnimalDetailPage() {
  const { animalID } = useParams();
  const [lostanimalDetail, setLostAnimalDetail] =
    useState<LostAnimalDetail | null>(null);

  console.log("lostanimalID", animalID);

  useEffect(() => {
    const apiUrl = `api/lost-animals/${animalID}`;
    API.get(apiUrl)
      .then((res) => {
        console.log(res.data);
        setLostAnimalDetail(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [animalID]);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/lost-update/${animalID}`, { state: lostanimalDetail});
  };

  const handleBack = () => {
    navigate("/lost-animals")
  }
  return (
    <>
      <Container>
        <div style={{
          borderBottom: '0.7px solid',
          padding: '0px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          background: 'white'
        }}>
          <Top>
            <h1 style={{}}>상세정보</h1>
          </Top>
        </div>
        <div className="flex"
          style={{ padding: '1rem' }}>
          <Leftside>
            <img src="https://www.fitpetmall.com/wp-content/uploads/2023/10/image-14.png" alt="강아지"
              style={{
                width: '350px',
                height: '260px',
                borderRadius: '10px',
                boxShadow: '5px 5px 5px gray'
              }} />
          </Leftside>

          <Rightside>
            <div className="flex"> <p style={{ fontSize: '25px' }}>{lostanimalDetail?.breed.replace(/_/g, " ")}  |  {lostanimalDetail?.age} 살</p> </div>
            <div className="flex"><p>닉네임 : </p>{lostanimalDetail?.userNickname}</div>
            <div className="flex"><p>성별 : </p>{lostanimalDetail?.gender === "남" ? "남아" : "여아"}</div>
            <div className="flex"><p>체중: </p>{lostanimalDetail?.weight} kg</div>
            <div className="flex"><p>실종일자 : </p>{lostanimalDetail?.lostDate}</div>
            <div className="flex"><p>실종위치 : </p>{lostanimalDetail?.lostLocation}</div>
            <div className="flex"
              style={{
                background: 'rgb(255,150,27, 0.1)',
                borderRadius: '5px',
                padding: '15px',
                marginTop: '15px',
                width: '370px'
              }}>
              <p>특징 : </p>{lostanimalDetail?.feature}</div>
          </Rightside>
        </div>

      </Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={{
          background: 'black',
          padding: '0.5rem',
          color: 'white',
          borderRadius: '5px',
          width: '110px',
        }}
          onClick={handleBack}>전체 글 목록</button>
        <button style={{
          background: '#FF8331',
          padding: '0.5rem',
          color: 'white',
          borderRadius: '5px',
          width: '80px',
          marginLeft: '10px'
        }}
          onClick={handleUpdate}>수정</button>
      </div>
    </>
  );
}

export default LostAnimalDetailPage;
