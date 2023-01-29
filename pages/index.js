import { useEffect, useState } from "react";
import { Calendar } from "../components/Calendar";
import { Select } from "../components/Select";
import { HolidayList } from "../components/HolidayList/HolidayList";
import { Legend } from "../components/Legend";
import { countries } from "../constants/countries";
import { years } from "../constants/years";
import styled from "styled-components";
import { media, theme } from "../constants";
import Image from "next/image";
import Link from "next/link";

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
  background-color: ${theme.colors.white}aa;
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
  & > *:nth-last-child(-n + 2) {
    margin: 0 5px;
  }
  backdrop-filter: blur(10px);
`;

const HeaderLink = styled.div`
  font-size: 36px;
  position: absolute;
  display: flex;
  align-items: flex-start;
  height: 100%;
  top: 8px;
  right: 8px;

  ${media.md} {
    top: 0;
    right: 20px;
    align-items: center;
  }
`;

const LogoWrapper = styled.h1`
  color: ${theme.colors.lime600};
  ${media.md} {
    width: max-content;
    margin: 0 15px 0 0;
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
  const lastYear = (new Date().getFullYear() - 1).toString();

  const [year, setYear] = useState(lastYear);

  const [month, setMonth] = useState(1);
  const [date, setDate] = useState(1);
  const [hasEvent, setHasEvent] = useState([]);

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
            style={{ width: "100px" }}
          />
          <HeaderLink>
            <Link href="https://github.com/nguyend-nam/which-holiday">
              <a target="_blank" rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#009dae"
                    d="M8.854 21.57a9.91 9.91 0 0 0 6.29.001a.493.493 0 0 1-.644-.475c0-.338.013-1.413.013-2.75a2.368 2.368 0 0 0-.675-1.85c2.225-.25 4.562-1.1 4.562-4.938a3.87 3.87 0 0 0-1.025-2.687a3.594 3.594 0 0 0-.1-2.65s-.838-.275-2.75 1.025a9.427 9.427 0 0 0-5 0C7.612 5.958 6.775 6.22 6.775 6.22a3.593 3.593 0 0 0-.1 2.65a3.892 3.892 0 0 0-1.025 2.687c0 3.825 2.325 4.688 4.55 4.938a2.106 2.106 0 0 0-.638 1.337a2.137 2.137 0 0 1-2.91-.82l-.002-.005a2.001 2.001 0 0 0-1.538-1.025c-.837.013-.337.475.013.663c.451.38.803.865 1.025 1.412c.2.563.85 1.638 3.362 1.175c0 .838.013 1.625.013 1.863c0 .259-.185.551-.67.475z"
                    opacity=".5"
                  />
                  <path
                    fill="#009dae"
                    d="M12 2.083c-5.523 0-10 4.477-10 10c0 4.423 2.875 8.169 6.855 9.488c.485.075.67-.216.67-.475c0-.238-.012-1.025-.012-1.863c-2.513.463-3.163-.612-3.363-1.175a3.637 3.637 0 0 0-1.025-1.412c-.35-.188-.85-.65-.013-.663a2 2 0 0 1 1.538 1.025l.003.006a2.137 2.137 0 0 0 2.91.82c.043-.51.27-.984.637-1.338c-2.225-.25-4.55-1.113-4.55-4.938a3.892 3.892 0 0 1 1.025-2.687a3.594 3.594 0 0 1 .1-2.65s.837-.263 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025c.37.838.406 1.786.1 2.65a3.87 3.87 0 0 1 1.025 2.687c0 3.838-2.338 4.688-4.562 4.938c.482.49.729 1.164.675 1.85c0 1.337-.013 2.412-.013 2.75a.493.493 0 0 0 .643.476C19.124 20.253 22 16.507 22 12.083c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
            </Link>
          </HeaderLink>
        </HeaderContainer>
        <ContentWrapper>
          <CalendarContainer>
            <Calendar
              year={year}
              month={month}
              today={date}
              hasEvent={hasEvent}
              onDateClick={setDate}
              onMonthClick={setMonth}
            />
            {country && year === lastYear ? (
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <Legend
                  color={theme.colors.lime200}
                  title="Holiday(s) in selected month"
                  style={{ marginBottom: 5 }}
                />
                <Legend color={theme.colors.lime400} title="Selected holiday" />
              </div>
            ) : null}
          </CalendarContainer>
          <ListContainer>
            {country && year === lastYear ? (
              <HolidayList
                country={country}
                year={year}
                month={month}
                date={date}
                onDateClick={setDate}
                onMonthClick={setMonth}
                setHasEvent={setHasEvent}
              />
            ) : null}
            {year !== lastYear ? (
              <>
                <div>
                  Anh bạn à, tôi dùng free plan api chỉ cho fetch{" "}
                  <b>{lastYear}</b> thôi
                </div>
                <div>
                  Due to financial concerns, please search for <b>{lastYear}</b>{" "}
                  only
                </div>
                <Image
                  src="/pepe-sad.png"
                  width={130}
                  height={106}
                  alt="pepe-sad"
                />
              </>
            ) : null}
          </ListContainer>
        </ContentWrapper>
      </MainContainer>
    )
  );
}
