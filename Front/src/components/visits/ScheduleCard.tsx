import { reservationData } from "../../pages/visits/VisitManagementPage";
import styled from "styled-components";
import moment from "moment";
import { Button } from "../common/Button";

const Card = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  .circle {
    border-radius: 50%;
    overflow: hidden;
    width: 4rem;
    height: 4rem;

    .animal-img {
      width: 100%;
      height: 100%;
    }
  }

  .grey {
    color: grey;
  }

  .bold {
    font-family: "Pretendard-600";
  }

  .sm-font {
    font-size: 0.9rem;
  }
`;

const ScheduleCard: React.FC<{ reservation: reservationData }> = ({
  reservation,
}) => {
  return (
    <Card>
      <div className="circle">
        <img
          className="animal-img"
          src="https://images.dog.ceo/breeds/terrier-westhighland/n02098286_1591.jpg"
          alt=""
        />
      </div>
      <div className="grow">
        <p className="grey sm-font">{reservation.shelterName}</p>
        <p className="bold">
          {reservation.breed} · {reservation.age}살
        </p>
        <p className="grey sm-font">
          {moment(reservation.reservationTime).format(
            "YYYY년 MM월 DD일, HH:MM"
          )}
        </p>
      </div>
      <div className="flex flex-col gap-1 items-center justify-center">
        <p className="sm-font">{reservation.state || "방문 신청"}</p>
        <Button background="red" $paddingX={1} $fontSize={0.8} $marginTop={0}>
          취소
        </Button>
      </div>
    </Card>
  );
};

export default ScheduleCard;
