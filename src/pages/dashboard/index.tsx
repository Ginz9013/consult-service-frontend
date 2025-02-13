import Layout from "@/components/layout/Layout";
import BodyChart from "@/components/dashboard/BodyChart";
import { useEffect, useMemo } from "react";

import useSWR from "swr";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getDailyRecord } from '@/lib/record/api';
import UserStatus from "@/components/dashboard/UserStatus";
import DietaryTable from "@/components/dashboard/DietaryTable";
import DailyForm from "@/components/dashboard/DailyForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import TokenExpiredAlert from "@/components/TokenExpiredAlert";

import { useDate } from "@/hooks/useDate";
import { DateType } from "@/store/date";
import { pipe, clone, omit, map } from "ramda";
import { formatDateString } from "@/util/dataFormatter";


const Dashboard = () => {
  const [ date ] = useDate();
console.log("dashboard re-render")
  const { data: DailyRecord, error, isLoading } = useSWR(["getDailyRecord", date], dataFetcher);
  const { daily, diets } = useMemo(() => splitDailyAndDietData(DailyRecord), [DailyRecord]);

  if (isLoading) return <LoadingSpinner />;

  if (error) return <TokenExpiredAlert />;

  return (
    <div className="flex flex-col items-center px-6 pt-4 pb-8">

      {/* Status */}
      <UserStatus />

      {/* Chart */}
      <BodyChart />

      {/* Tab */}
      <Tabs defaultValue="diet" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="diet" className="w-1/2 data-[state=active]:bg-primary data-[state=active]:text-white">飲食</TabsTrigger>
          <TabsTrigger value="record" className="w-1/2 data-[state=active]:bg-primary data-[state=active]:text-white">紀錄</TabsTrigger>
        </TabsList>
        <TabsContent value="diet">
          <DietaryTable />
        </TabsContent>
        <TabsContent value="record">
          <DailyForm record={daily} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

Dashboard.getLayout = (page: React.ReactNode) => (
    <Layout>
      { page }
    </Layout>
);

export default Dashboard;

// Utils
export const dataFetcher = async ([key, date]: [string, DateType]) => {
  const dateString = formatDateString(date.date);
  const res = await getDailyRecord({ date: dateString });

  if (res.status === 401)
    throw new Error(`Request failed with status ${res.status}`);

  return res.data;
};

export const splitDailyAndDietData = (data: any) => pipe(
    clone,
    (clonedData: any) => ({
      daily: omit(['diet'], clonedData),
      diets: clonedData?.diet,
    })
  )(data);