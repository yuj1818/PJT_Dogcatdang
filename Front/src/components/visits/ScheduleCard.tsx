import { reservationData } from "../../pages/visits/VisitManagementPage";
import styled from "styled-components";
import moment from "moment";
import { Button } from "../common/Button";
import { cancelReservation } from "../../util/VisitAPI";
import { isOrg as org } from "../../pages/users/SignInPage";
import { IoMdTime, IoMdPhonePortrait } from "react-icons/io";

const Card = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

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
    font-family: "SUITE-SemiBold";
  }

  .sm-font {
    font-size: 0.9rem;
  }
`;

const ScheduleCard: React.FC<{ reservation: reservationData, handleReservations: React.Dispatch<React.SetStateAction<reservationData[]>> }> = ({
  reservation,
  handleReservations
}) => {

  const isOrg = org();

  const onClickCancel = async() => {
    await cancelReservation(reservation.reservationId);
    handleReservations((prev: reservationData[]) => prev.filter((el: reservationData) => el.reservationId !== reservation.reservationId));
  };

  return (
    <Card>
      <div className="circle">
        <img
          className="animal-img"
          src={reservation.imgUrl}
          alt=""
        />
      </div>
      <div className="grow">
        <p className="sm-font bold">{isOrg ? reservation.code : reservation.shelterName}</p>
        <p className="bold">
          {
            isOrg ? 
            `${reservation.name}님 ${reservation.visitor > 1 ? `외 ${reservation.visitor - 1}명` : ''}` 
            :
            `${reservation.breed} · ${reservation.age}살`
          }
        </p>
        <p className="grey sm-font flex items-center gap-1">
          <IoMdTime />
          {moment(reservation.reservationTime).format(
            "YYYY년 MM월 DD일, HH:MM"
          )}
        </p>
        { isOrg && 
          <p className="grey sm-font flex items-center gap-1">
            <IoMdPhonePortrait />
            {reservation.phone}
          </p>
        }
      </div>
      {
        !isOrg && 
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="sm-font">{reservation.state || "대기"}</p>
          {
            !reservation.state &&
            <Button onClick={onClickCancel} background="red" $paddingX={1} $fontSize={0.8} $marginTop={0}>
              취소
            </Button>
          }
        </div>
      }
    </Card>
  );
};

export default ScheduleCard;
