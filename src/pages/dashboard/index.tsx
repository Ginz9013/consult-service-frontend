import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselSwitch
} from "@/components/ui/carousel";
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

import { getWeekData } from '@/lib/record/api';

const weekDataFetcher = async ([, token]: [string, string]) => {
  const start_date = dayjs().startOf('week').format("YYYY-MM-DD");
  const end_date = dayjs().endOf('week').format("YYYY-MM-DD");

  const res = await getWeekData({ token, start_date, end_date });

  if (res.status === 401)
    throw new Error(`Request failed with status ${res.status}`);

  return res;
}

const Dashboard = () => {

  const router = useRouter();

  const token = useSelector((state: any) => state.authentication.token);

  const { data, error, isLoading } = useSWR(["getWeekData", token], weekDataFetcher);


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <LoaderCircle className="animate-spin" />
      <p className='text-2xl ml-2'>Loading...</p>
    </div>;
  }

  if (error) {
    return <div className="h-screen">
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
    <main className="px-6 flex flex-col items-center pb-8">

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
      <Carousel className="w-full mt-8">
        <CarouselSwitch />

        <div className="flex justify-between w-full my-4">
          <div />
          <DietaryForm />
        </div>

        <CarouselContent>
          {
            ["1", "2", "3", "4", "5", "6", "7"].map((value: string) => (
              <TabContent key={value} />
            ))
          }
        </CarouselContent>
      </Carousel>


      {/* <AlertDialog open={isShowDialog}>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
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
      </AlertDialog> */}
    </main>
  );
};

Dashboard.getLayout = (page: React.ReactNode) => (
    <Layout>
      { page }
    </Layout>
);

export default Dashboard;
