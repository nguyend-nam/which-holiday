import React, { useState, useEffect } from "react";
import { useFetchHolidaysWithCache } from "../../hooks/holidays";
import styled from "styled-components";
import { theme } from "../../constants";
import { Loading } from "../Loading";

const HolidayCard = styled.button`
  width: calc(50% - 5px);
  background-color: ${theme.colors.white};
  cursor: pointer;
  border: 1px solid #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 5px;
  }
  &:nth-child(odd) {
    margin-right: 10px;
  }
  & > h3 {
    margin: 0;
    color: ${theme.colors.lime600};
  }
  & > p {
    color: ${theme.colors.blue900};
  }
  &.selected-date {
    background-color: ${theme.colors.lime400};
  }
  &.selected-month {
    background-color: ${theme.colors.lime200};
  }
`;

export const HolidayList = (props) => {
  const [holidaysData, setData] = useState(undefined);
  const { country, year, month, date, onDateClick, onMonthClick, setHasEvent } =
    props;

  const { data, loading } = useFetchHolidaysWithCache(country, year);
  let hasHoliday = [];

  useEffect(() => {
    if (data) {
      if (data?.holidays) {
        setData(data.holidays);
        data.holidays.forEach((day) => {
          if (month === parseInt(day.date.split("-")[1])) {
            hasHoliday.push(parseInt(day.date.split("-")[2]));
          }
        });
        setHasEvent(hasHoliday);
      }
    }
  }, [data, month]);

  return (
    <>
      {loading || holidaysData === undefined ? (
        <Loading />
      ) : (
        holidaysData.map((day, index) => {
          return (
            <HolidayCard
              key={index}
              className={
                date === parseInt(day.date.split("-")[2]) &&
                month === parseInt(day.date.split("-")[1])
                  ? "selected-date"
                  : month === parseInt(day.date.split("-")[1])
                  ? "selected-month"
                  : ""
              }
              onClick={() => {
                onMonthClick(parseInt(day.date.split("-")[1]));
                onDateClick(parseInt(day.date.split("-")[2]));
              }}
            >
              <h3>{day.name}</h3>
              <p>
                {day.date.split("-").reverse().join("/")} -{" "}
                {day.weekday.date.name}
              </p>
            </HolidayCard>
          );
        })
      )}
    </>
  );
};
