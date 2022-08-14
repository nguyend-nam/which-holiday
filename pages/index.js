import { useEffect, useState } from "react";
import { Calendar } from "../components/Calendar";
import { Select } from "../components/Select";
import { HolidayList } from "../components/HolidayList/HolidayList";
import { Legend } from "../components/Legend";
import { countries } from "../constants/countries";
import { years } from "../constants/years";
import styled from "styled-components";
import { media, theme } from "../constants";

const MainContainer = styled.div``;

const ContentWrapper = styled.div`
  ${media.md} {
    max-height: calc(100vh - 84px);
  }
  max-height: unset;
  box-sizing: border-box;
  ${media.md} {
    flex-direction: row;
  }
  flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  ${media.md} {
    padding: 20px 50px 50px;
  }
  padding: 0 0 20px;
  ${media.md} {
    & > div:first-child {
      margin-top: 30px;
    }
  }
`;

const HeaderContainer = styled.div`
  background-color: ${theme.colors.white};
  box-shadow: 0 3px 10px #00000018;
  ${media.md} {
    padding: 20px 50px;
    justify-content: flex-start;
  }
  padding: 20px;
  justify-content: center;
  position: sticky;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  & > *:nth-child(2) {
    margin: 0 10px;
  }
`;

const LogoWrapper = styled.h1`
  color: ${theme.colors.lime600};
  ${media.md} {
    width: max-content;
    margin: 0 10px 0 0;
  }
  width: 100%;
  margin: 0;
  text-align: center;
`;

const ListContainer = styled.div`
  ${media.md} {
    padding: 0 10px;
  }
  padding: 0 20px;
  overflow-y: auto;
  ${media.md} {
    width: 500px;
    margin-top: 0;
    margin-top: 20px;
  }
  width: 100%;
  margin-top: 0;
  text-align: center;
`;

const CalendarContainer = styled.div`
  ${media.md} {
    padding: 0;
  }
  padding: 20px;
`;

export default function Home() {
  const getYears = years();
  const [isSSR, setISSR] = useState(true);
  const [country, setCountry] = useState("");
  const [year, setYear] = useState(() => {
    return new Date().getFullYear() - 1;
  });
  const [month, setMonth] = useState(1);
  const [date, setDate] = useState(1);

  useEffect(() => {
    setISSR(false);
  }, []);

  return (
    !isSSR && (
      <MainContainer>
        <HeaderContainer>
          <LogoWrapper>Which holiday?</LogoWrapper>
          <Select
            options={Object.keys(countries).map((countryCode) => {
              return {
                val: countryCode,
                label: countries[countryCode],
              };
            })}
            placeholder="Select country"
            onChange={(val) => setCountry(val)}
          />
          <Select
            options={getYears}
            placeholder="Select year"
            onChange={(val) => setYear(val)}
            defaultValue={year}
            disabled
            style={{ width: "100px" }}
          />
        </HeaderContainer>
        <ContentWrapper>
          <CalendarContainer>
            <Calendar
              year={year}
              month={month}
              today={date}
              hasEvent={[]}
              onDateClick={setDate}
              onMonthClick={setMonth}
            />
            {country ? (
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <Legend
                  color={theme.colors.lime200}
                  title="Selected month"
                  style={{ marginBottom: 5 }}
                />
                <Legend
                  color={theme.colors.lime400}
                  title="Selected date & month"
                />
              </div>
            ) : null}
          </CalendarContainer>
          <ListContainer>
            {country ? (
              <HolidayList
                country={country}
                year={year}
                month={month}
                date={date}
                onDateClick={setDate}
                onMonthClick={setMonth}
              />
            ) : null}
          </ListContainer>
        </ContentWrapper>
      </MainContainer>
    )
  );
}
