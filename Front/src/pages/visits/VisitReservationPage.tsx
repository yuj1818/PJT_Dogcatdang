import { useEffect, useState } from "react";
import AdoptionInfoModal from "../../components/visits/AdoptionInfoModal";
import { Title, SubTitle } from "../../components/common/Title";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../../util/UserAPI";
import { makeReservation } from "../../util/VisitAPI";
import styled from "styled-components";
import { Button } from "../../components/common/Button";

interface shelterData {
  nickname: string,
  address: string
}

const ReservationFormBox = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .md-font {
    font-size: 1.3rem;
    font-family: 'SUITE-Medium';
  }
`

const ReservationForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .item {
    display: flex;
    align-items: center;
    width: 100%;
  }

  label {
    width: 6rem;
  }

  input {
    flex-grow: 1;
    border-radius: 10px;
    box-shadow: 0 3.5px 3.5px lightgrey;
    padding: .2rem .5rem;
  }
`

const ReservationBox = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  .img-box {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;

    .img-circle {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      overflow: hidden;

      .img {
        height: 100%;
        width: 100%;
      }
    }
  }
`

function VisitReservationPage() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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

      navigate(`/visit/${JSON.parse(localStorage.getItem('userInfo') || "")?.id}`);
    }

  }

  return (
    <div className="flex flex-col gap-4">
      <AdoptionInfoModal closeModal={setIsModalOpen} isModalOpen={isModalOpen} />
      <Title>방문 예약</Title>
      <hr className="border-black" />
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2">  
            <SubTitle>{shelterInfo?.nickname}</SubTitle>
            <Button background="black" $fontSize={.8} $marginTop={0} $marginLeft={0}>지도보기</Button>
          </div>
          <p>기관 주소 : {shelterInfo?.address}</p>
        </div>
        <ReservationBox>
          <ReservationFormBox>
            <p className="md-font">예약 정보</p>
            <ReservationForm onSubmit={onSubmitReservationForm}>
              <div className="item">
                <label htmlFor="name">방문자 이름</label>
                <input  type="text" name="name" id="name" onChange={handleName} required />
              </div>
              <div className="item">
                <label htmlFor="date">예약 날짜</label>
                <input type="date" name="date" id="date" onChange={handleDate} data-placeholder="날짜 선택" required />
              </div>
              <div className="item">
                <label htmlFor="time">예약 시간</label>
                <input  type="time" name="time" id="time" onChange={handleTime} required />
              </div>
              <div className="item">
                <label htmlFor="phone">연락처</label>
                <input  type="text" name="phone" id="phone" placeholder="예시) 010-0000-0000" onChange={handlePhone} required />
              </div>
              <div className="item">
                <label htmlFor="visitor">방문 인원</label>
                <input  type="text" name="visitor" id="visitor" onChange={handleVisitor} required />
              </div>
              <div className="item">
                <label htmlFor=""></label>
                <div className="flex w-full justify-center">
                  <Button $paddingX={1} $marginLeft={0}>등록</Button>
                </div>
              </div>
            </ReservationForm>
          </ReservationFormBox>
          <div className="img-box">
            <div className="img">
              <img className="img" src={location.state.imgUrl} alt="" />
            </div>
          </div>
        </ReservationBox>
      </div>
    </div>
  )
}

export default VisitReservationPage;