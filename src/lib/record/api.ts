import { fetchWithToken } from '@/util/request';

// Get Week Record
type GetDailyRecordProps = {
  date: string;
}

export const getDailyRecord = async ({ date }: GetDailyRecordProps) => {
  const res = await fetchWithToken(`/api/record/daily/${date}`, {
    method: "GET"
  });
  const data = await res.json();

  return data;
}

type CreateDailyRecordProps = {
  date: string;
  weight?: number;
  body_fat: number;
  awake?: string; 
  sleep?: string; 
  water_morning?: number; 
  water_afternoon?: number; 
  water_evening?: number; 
  water_another?: number; 
  coffee?: number; 
  tea?: number; 
  sport?: string; 
  defecation?: string; 
  note?: string; 
}

export const createDailyRecord = async (dailyRecord: CreateDailyRecordProps) => {
  
  const res = await fetchWithToken("/api/record/daily", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dailyRecord)
  });

  const data = await res.json();

  return data;
}