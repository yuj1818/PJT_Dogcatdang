// import { isOrg as org } from "./SignInPage";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';
import { useEffect, useState, Fragment } from "react";
import { Title } from '../../components/common/Title';
import { getReservationDates, getReservations } from '../../util/VisitAPI';
import ScheduleCard from '../../components/visits/ScheduleCard';
import { isOrg as org } from '../users/SignInPage';

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

    .react-calendar__tile {
      position: relative;
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

    .dot {
      border-radius: 50%;
      width: .3rem;
      height: .3rem;
      background-color: #FF8331;
    }
  }
`

const Spacer = styled.div`
  height: .3rem;
`

export interface reservationData {
  reservationId: number;
  age: number;
  breed: string;
  imgUrl: string;
  reservationTime: string;
  shelterName: string;
  state: string | null;
  name: string;
  phone: string;
  visitor: number;
  code: string;
}

function VisitManagementPage() {
  const isOrg = org();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState<reservationData[]>([]);
  const [reservationDates, setReservatoinDates] = useState<string[]>([]);

  const handleDateChange = (value: any) => {
    setSelectedDate(value);
  };

  const getReservationData = async() => {
    const response = await getReservations(moment(selectedDate).format("YYYY-MM-DD"), isOrg);
    setReservations(response);
  };

  const getReservationSchedules = async() => {
    const response = await getReservationDates();
    console.log(response);
    setReservatoinDates(response);
  }

  useEffect(() => {
    getReservationData();
  }, [selectedDate]);

  useEffect(() => {
    getReservationSchedules();
  }, []);

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
              <Fragment key={reservation.reservationId}>
                <ScheduleCard reservation={reservation} handleReservations={setReservations} />
                { idx !== reservations.length - 1 && <hr />}
              </Fragment>
            ))
            :
            <p>방문 일정이 없습니다</p>
          }
        </Schedule>
        <Calendar 
          onChange={handleDateChange}
          value={selectedDate}
          formatDay={( _, date) => moment(date).format("D")}
          tileContent={({ date }) => {
            if (reservationDates.find(x => x === moment(date).format('YYYY-MM-DD'))) {
              return (
                <div className="flex justify-center items-center">
                  <div className="dot"></div>
                </div>
              )
            } else {
              return <Spacer />
            }
          }}
        />
      </StyledCalendar>
    </div>
  )
}

export default VisitManagementPage;