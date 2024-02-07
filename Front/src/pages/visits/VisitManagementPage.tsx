// import { isOrg as org } from "./SignInPage";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';
import { useEffect, useState } from "react";
import { Title } from '../../components/common/Title';
import { getReservations } from '../../util/VisitAPI';
import ScheduleCard from '../../components/visits/ScheduleCard';

const Schedule = styled.div`
  width: 50%;
  background-color: white;
  border-radius: 10px;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: .7rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: .2rem solid transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`

const StyledCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  height: 45vh;

  .react-calendar {
    width: 40%;
    border: none;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
    border-radius: 10px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .react-calendar__tile--now {
      background: white;
      color: black;
    }

    .react-calendar__month-view__days__day--neighboringMonth {
      background: #F2F3F7;
      color: #A8A8A8;
    }

    .react-calendar__tile--now:enabled:hover {
      background-color: #e6e6e6;
      color: black;
    }

    .react-calendar__tile--active {
      background: #FF8331;
      color: white;
    }

    .react-calendar__navigation__label > span {
      font-size: 1.2rem;
      font-weight: bold;
    }

    .react-calendar__month-view__weekdays {
      abbr {
        text-decoration: none;
      }
    }
  }
`

export interface reservationData {
  age: number;
  breed: string;
  imgUrl: string;
  reservationTime: string;
  shelterName: string;
  state: string | null;
}

function VisitManagementPage() {
  // const isOrg = org();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);

  const handleDateChange = (value: any) => {
    setSelectedDate(value);
  };

  const getReservationData = async() => {
    const response = await getReservations(moment(selectedDate).format("YYYY-MM-DD"));
    setReservations(response);
  };

  useEffect(() => {
    getReservationData();
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Title className="title">방문 일정 조회</Title>
        <hr className="border-black" />
      </div>
      <StyledCalendar>
        <Schedule>
          {
            reservations.length ? reservations.map((reservation: reservationData, idx) => (
              <>
                <ScheduleCard key={idx} reservation={reservation} />
                { idx !== reservations.length - 1 && <hr />}
              </>
            ))
            :
            <p>방문 일정이 없습니다</p>
          }
        </Schedule>
        <Calendar 
          onChange={handleDateChange}
          value={selectedDate}
          formatDay={( _, date) => moment(date).format("D")}
        />
      </StyledCalendar>
    </div>
  )
}

export default VisitManagementPage;