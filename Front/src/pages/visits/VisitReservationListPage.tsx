import { useState, useEffect, lazy } from "react";
import { Title } from "../../components/common/Title";
import ReservationInfo from "../../components/visits/ReservationInfo";
const ReservationList = lazy(
  () => import("../../components/visits/ReservationList")
);
import styled from "styled-components";
import { getApplications } from "../../util/VisitAPI";

const StyledList = styled.div`
  width: 70%;

  .ag-theme-alpine {
    text-align: center;
  }
  .ag-header-cell-label {
    justify-content: center;
  }
`;

const ListBox = styled.div`
  .notice {
    color: grey;
    font-size: 0.8rem;
  }
`;

export interface applicationData {
  reservationId: number;
  name: string;
  reservationTime: string;
  phone: string;
  visitor: string;
  code: string;
  imgUrl: string;
  breed: string;
  state: string;
}

function VisitReservationListPage() {
  const MONTHS = 1;

  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [dataList, setDataList] = useState<applicationData[]>([]);

  const getApplicationData = async () => {
    const response = await getApplications(MONTHS);
    console.log(response);
    setDataList(response);
  };

  useEffect(() => {
    getApplicationData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Title>방문 신청 내역</Title>
      <hr className="border-black" />
      <ListBox>
        <p className="notice">※ 최근 1개월 내 예약 조회만 가능합니다</p>
        <div className="flex gap-4">
          <StyledList>
            <ReservationList selectRow={setSelectedId} dataList={dataList} />
          </StyledList>
          {selectedId && (
            <ReservationInfo
              reservationId={selectedId}
              changeData={setDataList}
            />
          )}
        </div>
      </ListBox>
    </div>
  );
}

export default VisitReservationListPage;
