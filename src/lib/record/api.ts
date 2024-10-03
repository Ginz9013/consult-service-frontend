// import { fetchWithToken } from '@/util/request';

// Get Week Record
type getWeekRecordProps = {
  token: string;
  start_date: string;
  end_date: string;
}

export const getWeekRecord = async ({ token, start_date, end_date }: getWeekRecordProps) => {
  const res = await fetch(`/api/record/daily?start_date=${start_date}&end_date=${end_date}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();

  return data;
}