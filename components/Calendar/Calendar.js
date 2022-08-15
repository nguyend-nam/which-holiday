import { useMemo } from "react";
import styled from "styled-components";
import { theme, media } from "../../constants";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComponentContainer = styled.div`
  ${media.md} {
    width: 400px;
  }
  width: unset;
  max-width: 100%;
`;

const DayButton = styled.button`
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: ${theme.colors.white};
  color: #555;
  outline: none;
  border: none;
  font-size: 17px;
  user-select: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${theme.colors.blue900};
  font-weight: 300;
  ${(props) => (!props.disabled ? "&:hover{background-color: #fafafa;}" : "")}
`;

const TodayButton = styled(DayButton)`
  padding-top: 8px !important;
  padding-bottom: 8px !important;
`;

const DateToday = styled.div`
  background-color: ${theme.colors.lime600};
  border-radius: 50%;
  color: ${theme.colors.white};
  width: 32px;
  height: 32px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: semi-bold;
  & > * {
    height: max-content;
  }
`;

const EventDates = styled.div`
  color: ${theme.colors.lime400};
  font-weight: 500;
`;

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  & > button {
    border: none;
    background: none;
    padding: 3px;
    color: ${theme.colors.lime400};
    cursor: pointer;
    user-select: none;
    &:hover {
      color: ${theme.colors.lime600};
    }
  }
  & > button:nth-child(2) {
    color: ${theme.colors.blue900};
    font-weight: 500;
    font-size: 20px;
  }
`;

const DayInWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0;
  text-align: center;
  color: #888;
  margin-bottom: 10px;
  color: ${theme.colors.lime600};
  font-weight: semi-bold;
  font-size: 19px;
`;

const DayInCalendar = styled.div`
  box-shadow: 0 3px 14px #00000018;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  border: 1px solid #f0f0f0;
  background: #f0f0f0 !important;
  border-radius: 10px;
  overflow: auto;
  & > * {
    min-width: 45px;
  }
`;

const DayInOtherMonth = styled(DayButton)`
  background: #f5f5f5 !important;
  color: #ccc;
`;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function Calendar(props) {
  const { year, month, today, hasEvent, onDateClick, onMonthClick } = props;

  const renderDayList = useMemo(() => {
    /* Calculate start day of current month (2 -> 8) */
    const d = new Date(`${months[month - 1]}, ${year}`);
    const startDay = d.getDay() === 0 ? 8 : d.getDay() + 1;

    const prevMonth = month - 1 === 0 ? 12 : month - 1;
    const countPrevMonth =
      prevMonth === 12
        ? new Date(year - 1, prevMonth, 0).getDate()
        : new Date(year - 1, prevMonth, 0).getDate();

    /* 3 parts displayed on the calendar */
    const daysOfPrevMonth = startDay - 2;
    const daysOfCurrMonth = new Date(year, month, 0).getDate();
    const daysOfNextMonth =
      7 * Math.ceil((daysOfPrevMonth + daysOfCurrMonth) / 7) -
      daysOfPrevMonth -
      daysOfCurrMonth;

    const daysOnCalendar = daysOfPrevMonth + daysOfCurrMonth + daysOfNextMonth;

    const dayList = [];

    for (let i = 0; i < daysOnCalendar; i++) {
      /* Current month */
      if (i >= daysOfPrevMonth && i < daysOfPrevMonth + daysOfCurrMonth) {
        dayList.push(
          i + 1 - daysOfPrevMonth === today ? (
            <TodayButton
              key={i}
              onClick={() => onDateClick(i - daysOfPrevMonth + 1)}
            >
              <DateToday>
                <span>{i - daysOfPrevMonth + 1}</span>
              </DateToday>
            </TodayButton>
          ) : hasEvent.includes(i + 1 - daysOfPrevMonth) ? (
            <DayButton
              key={i}
              onClick={() => onDateClick(i - daysOfPrevMonth + 1)}
            >
              <EventDates>{i - daysOfPrevMonth + 1}</EventDates>
            </DayButton>
          ) : (
            <DayButton
              key={i}
              onClick={() => onDateClick(i - daysOfPrevMonth + 1)}
            >
              <span>{i - daysOfPrevMonth + 1}</span>
            </DayButton>
          )
        );
      } /* Days of previous or next month */ else
        dayList.push(
          <DayInOtherMonth key={i} disabled>
            {i < daysOfPrevMonth
              ? countPrevMonth - daysOfPrevMonth + i + 1
              : i - daysOfPrevMonth - daysOfCurrMonth + 1}
          </DayInOtherMonth>
        );
    }
    return dayList;
  }, [year, month, today, hasEvent]);

  return (
    <ComponentContainer>
      <HeaderRow>
        <button
          onClick={() => {
            onMonthClick(month - 1);
            onDateClick(1);
          }}
          disabled={month === 1}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button className="text-xl font-semibold">
          {months[(month - 1) % 12]}
        </button>
        <button
          onClick={() => {
            onMonthClick(month + 1);
            onDateClick(1);
          }}
          disabled={month === 12}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </HeaderRow>

      <DayInWeek>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
      </DayInWeek>

      <DayInCalendar>{renderDayList}</DayInCalendar>
    </ComponentContainer>
  );
}
