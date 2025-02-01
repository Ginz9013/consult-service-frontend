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

import { getDailyRecord } from '@/lib/record/api';

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

  const { data: weeklyRecord, error, isLoading } = useSWR("getWeeklyRecords", weekDataFetcher);


  const getWeeklyDate = () => {
    const startDate = dayjs().startOf('week');
    const weeklyDate = Array.from({ length: 7 }).map((_, i) =>
      startDate.add(i, 'day').format("YYYY-MM-DD")
    );

    return weeklyDate;
  }

  const weeklyDate = getWeeklyDate();

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">
      <LoaderCircle className="animate-spin" />
      <p className='text-2xl ml-2'>Loading...</p>
    </div>;
  }

  if (error) {
    return <div className="h-full">
      <AlertDialog open={true}>
        <AlertDialogContent className="w-4/5">
          <AlertDialogHeader>
            <AlertDialogTitle>Please login again!</AlertDialogTitle>
            <AlertDialogDescription>
              Your authentication has expired.
            </AlertDialogDescription>
            <br />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push("/login")}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  }

  return (
    <div className="px-6 flex flex-col items-center pb-8">

      {/* Avatar */}
      <Avatar className="w-32 h-32 relative top-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Status */}
      <div className="flex justify-between text-center w-full px-4">
        <div>
          <h2 className="text-4xl font-bold">45.6</h2>
          <p>Weight</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold">23<span className="text-xl">%</span></h2>
          <p>Body Fat</p>
        </div>
      </div>

      {/* Chart */}
      <BodyChart />

      {/* Carousel */}
      {/* <Carousel className="w-full mt-8">
        <CarouselSwitch />

        <div className="flex justify-between w-full my-4">
          <div />
          <DietaryForm />
        </div>

        <CarouselContent>
          {
            weeklyDate.map((date: string) => (
              <TabContent
                key={date}
                date={date}
                dailyRecord={weeklyRecord.find((record: any) => record.date === date)}
              />
            ))
          }
        </CarouselContent>
      </Carousel> */}
    </div>
  );
};

Dashboard.getLayout = (page: React.ReactNode) => (
    <Layout>
      { page }
    </Layout>
);

export default Dashboard;
