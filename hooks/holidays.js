import { API_KEY } from "../config";
import useSWR from "swr";
import { useState, useEffect } from "react";

const BASE_API_URL = `https://holidayapi.com/v1/holidays?pretty&key=`;

export function useFetchHolidays(countryCode, year) {
  return useSWR(
    [countryCode, year],
    async () => {
      const response = await fetch(
        `${BASE_API_URL}${API_KEY}&country=${countryCode}&year=${year}`
      );
      const data = await response.json();
      return data;
    },
    {
      revalidateOnFocus: false,
    }
  );
}

export function useFetchHolidaysWithCache(countryCode, year) {
  const { data, error, ...rest } = useFetchHolidays(countryCode, year);
  const [internalData, setInternalData] = useState();

  const isFirstLoading = !internalData && !error;
  const loading = !data && !error;

  useEffect(() => {
    if (data) {
      setInternalData(data);
    }
  }, [data]);
  return { data: internalData, isFirstLoading, loading, error, ...rest };
}
