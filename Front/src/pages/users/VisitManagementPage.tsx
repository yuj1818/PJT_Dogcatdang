// import { isOrg as org } from "./SignInPage";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';
import { useState } from "react";

const Schedule = styled.div`
  height: inherit;
  width: 50%;
  background-color: white;
  border-radius: 10px;
`

const StyledCalendar = styled.div`
  display: flex;
  gap: 2rem;

  .react-calendar {
    width: 40%;
    border: none;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
    border-radius: 10px;
    padding: 1.5rem;

    .react-calendar__tile--now {
      background: white;
      color: black;
    }

    .react-calendar__month-view__days__day--neighboringMonth {
      background: #F2F3F7;
      color: #A8A8A8;
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

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function VisitManagementPage() {
  // const isOrg = org();
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  }

  return (
    <StyledCalendar>
      <Schedule />
      <Calendar 
        onChange={handleDateChange}
        value={selectedDate}
        formatDay={( _, date) => moment(date).format("D")}
      />
    </StyledCalendar>
  )
}

export default VisitManagementPage;