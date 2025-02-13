import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselSwitch
} from "@/components/ui/carouselCustomization";
import Layout from "@/components/layout/Layout";
import BodyChart from "@/components/dashboard/BodyChart";
import TabContent from "@/components/dashboard/TabContent";
import DietaryForm from "@/components/dashboard/DietaryForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useSWR from "swr";
import dayjs from "dayjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LoaderCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getDailyRecord } from '@/lib/record/api';
import DietaryTable from "@/components/dashboard/DietaryTable";
import DailyForm from "@/components/dashboard/DailyForm";

const weekDataFetcher = async () => {
  const start_date = dayjs().startOf('week').format("YYYY-MM-DD");
  const end_date = dayjs().endOf('week').format("YYYY-MM-DD");

  const res = await getDailyRecord({ start_date, end_date });

  if (res.status === 401)
    throw new Error(`Request failed with status ${res.status}`);

  return res.data;
}

const Dashboard = () => {
  const router = useRouter();

  // const { data: weeklyRecord, error, isLoading } = useSWR("getWeeklyRecords", weekDataFetcher);


  // const getWeeklyDate = () => {
  //   const startDate = dayjs().startOf('week');
  //   const weeklyDate = Array.from({ length: 7 }).map((_, i) =>
  //     startDate.add(i, 'day').format("YYYY-MM-DD")
  //   );
  //   return weeklyDate;
  // }

  // const weeklyDate = getWeeklyDate();

  // if (isLoading) {
  //   return <div className="flex justify-center items-center h-full">
  //     <LoaderCircle className="animate-spin" />
  //     <p className='text-2xl ml-2'>Loading...</p>
  //   </div>;
  // }

  // if (error) {
  //   return <div className="h-full">
  //     <AlertDialog open={true}>
  //       <AlertDialogContent className="w-4/5">
  //         <AlertDialogHeader>
  //           <AlertDialogTitle>Please login again!</AlertDialogTitle>
  //           <AlertDialogDescription>
  //             Your authentication has expired.
  //           </AlertDialogDescription>
  //           <br />
  //         </AlertDialogHeader>
  //         <AlertDialogFooter>
  //           <AlertDialogAction onClick={() => router.push("/login")}>OK</AlertDialogAction>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialog>
  //   </div>
  // }

  return (
    <div className="flex flex-col items-center px-6 pt-4 pb-8">

      {/* Status */}
      <div className="flex justify-around items-end text-center w-full px-4">
        <div>
          <h2 className="text-2xl font-bold">45.6</h2>
          <p className="text-xs">Weight</p>
        </div>

        {/* Avatar */}
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-2xl font-bold">23<span className="text-xl">%</span></h2>
          <p className="text-xs">Body Fat</p>
        </div>
      </div>

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
          {/* <DailyForm date="2025-02-01" record={weeklyRecord.find((record: any) => record.date === "2025-02-01")} /> */}
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
