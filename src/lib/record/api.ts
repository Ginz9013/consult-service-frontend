// import { fetchWithToken } from '@/util/request';

// Get Week Data
type getWeekDataProps = {
  token: string;
  start_date: string;
  end_date: string;
}

export const getWeekData = async ({ token, start_date, end_date }: getWeekDataProps) => {
  const res = await fetch(`/api/record/daily?start_date=${start_date}&end_date=${end_date}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();

  return data;
}