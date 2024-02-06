import { FormEvent, useEffect, useState } from "react";
import AdoptionInfoModal from "../../components/visits/AdoptionInfoModal";
import styled from "styled-components";
import { Title } from "../../components/common/Title";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../util/UserAPI";
import { makeReservation } from "../../util/VisitAPI";

interface shelterData {
  nickname: string,
  address: string
}

function VisitReservationPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [shelterInfo, setShelterInfo] = useState<shelterData>();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [visitor, setVisitor] = useState('');

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(() => e.target.value);
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(() => e.target.value);
  };

  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(() => e.target.value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(() => e.target.value);
  };

  const handleVisitor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisitor(() => e.target.value);
  };

  const getInfo = async () => {
    if (params.shelterId) {
      const response = await getUserInfo(params.shelterId);
      console.log(response.data);
      setShelterInfo(() => response.data);
    }
  };

  useEffect(() => {
    getInfo();
  }, [params.shelterId]);

  const onSubmitReservationForm = async(e: React.FormEvent) => {
    e.preventDefault()

    if (params.animalId) {
      const data = {
        reservationTime: date + 'T' + time,
        name,
        phone,
        visitor: parseInt(visitor)
      };
  
      const response = await makeReservation(data, params.animalId);
      console.log(response);

      navigate(`/profile/${JSON.parse(localStorage.getItem('userInfo') || "")?.id}/visit`);
    }

  }

  return (
    <div>
      {/* <AdoptionInfoModal closeModal={setIsModalOpen} isModalOpen={isModalOpen} /> */}
      <Title>방문 예약</Title>
      <hr className="border-black" />
      <p>{shelterInfo?.nickname}</p>
      <p>{shelterInfo?.address}</p>
      <p>예약 정보</p>
      <div>
        <form onSubmit={onSubmitReservationForm}>
          <div>
            <label htmlFor="name">방문자 이름</label>
            <input type="text" name="name" id="name" onChange={handleName} required />
          </div>
          <div>
            <label htmlFor="date">예약 날짜</label>
            <input type="date" name="date" id="date" onChange={handleDate} required />
          </div>
          <div>
            <label htmlFor="time">예약 시간</label>
            <input type="time" name="time" id="time" onChange={handleTime} required />
          </div>
          <div>
            <label htmlFor="phone">연락처</label>
            <input type="text" name="phone" id="phone" onChange={handlePhone} required />
          </div>
          <div>
            <label htmlFor="visitor">방문 인원</label>
            <input type="text" name="visitor" id="visitor" onChange={handleVisitor} required />
          </div>
          <button>등록</button>
        </form>
        <div>
          <img src="https://www.fitpetmall.com/wp-content/uploads/2023/10/image-14.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default VisitReservationPage;