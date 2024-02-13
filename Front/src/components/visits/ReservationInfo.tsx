import { useEffect, useState } from "react";
import { getApplicationDetail, changeState } from "../../util/VisitAPI";
import { SubTitle } from "../common/Title";
import { Button } from "../common/Button";
import styled from "styled-components";
import { getUserInfo } from "../../util/uitl";
import { applicationData } from "../../pages/visits/VisitReservationListPage";

interface info {
  name: string;
  reservationTime: string;
  phone: string;
  visitor: number;
};

const InfoBox = styled.div`
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 5px;

  .box {
    display: flex;
    gap: .25rem;
    align-items: center;

    .label {
      width: 6rem;
      white-space: nowrap;
    }

    .content {
      padding: .25rem .5rem;
      flex-grow: 1;
      white-space: nowrap;
      border: 1px solid black;
      border-radius: 5px;
    }
  }
`;

const ReservationInfo: React.FC<{ reservationId: number | null, changeData: React.Dispatch<React.SetStateAction<applicationData[]>> }> = ({ reservationId, changeData }) => {
  const [reservationInfo, setReservationInfo] = useState<info>();
  
  const getInfo = async () => {
    if (reservationId) {
      const response = await getApplicationDetail(reservationId);
      setReservationInfo(response);
    }
  }

  useEffect(() => {
    getInfo();
  }, [reservationId])

  const onApprove = async() => {
    if (reservationId) {
      await changeState(getUserInfo().id, reservationId, "승인");
      changeData(prev => {
        const idx = prev.findIndex(el => el.reservationId === reservationId);
        const newData = [...prev];
        newData[idx].state = "승인"
        return newData;
      });
    }
  };

  const onReject = async() => {
    if (reservationId) {
      await changeState(getUserInfo().id, reservationId, "거절");
      changeData(prev => {
        const idx = prev.findIndex(el => el.reservationId === reservationId);
        const newData = [...prev];
        newData[idx].state = "거절"
        return newData;
      });
    }
  };

  return (
    <div className="flex-grow flex flex-col gap-2">
      <SubTitle>예약 정보</SubTitle>
      <InfoBox>
        <div className="box">
          <p className="label">대표자 이름</p>
          <p className="content">{reservationInfo?.name}</p>
        </div>
        <div className="box">
          <p className="label">예약 날짜</p>
          <p className="content">{reservationInfo?.reservationTime.split('T')[0]}</p>
        </div>
        <div className="box">
          <p className="label">예약 시간</p>
          <p className="content">{reservationInfo?.reservationTime.split('T')[1]}</p>
        </div>
        <div className="box">
          <p className="label">대표자 연락처</p>
          <p className="content">{reservationInfo?.phone}</p>
        </div>
        <div className="box">
          <p className="label">방문 인원</p>
          <p className="content">{reservationInfo?.visitor}</p>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={onApprove} $marginLeft={0}>승인</Button>
          <Button onClick={onReject} $background="red" $marginLeft={0}>거절</Button>
        </div>
      </InfoBox>
    </div>
  );
}

export default ReservationInfo;