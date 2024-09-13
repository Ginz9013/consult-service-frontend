import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Carousel,
  CarouselContent
} from "@/components/ui/carousel";
import Layout from "@/components/layout/Layout";
import BodyChart from "@/components/dashboard/BodyChart";
import TabContent from '@/components/dashboard/TabContent';
import DietaryForm from '@/components/dashboard/DietaryForm';


const Dashboard = () => {

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

      {/* Tabs */}
      <Tabs defaultValue="account" className="mt-6">
        <TabsList className="py-8">
          {
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day: string, index: number) => (
              <TabsTrigger value={`${index}`} className="flex flex-col">
                <p>{ day }</p>
                <p className="text-xs">9/{ index + 15 }</p>
              </TabsTrigger>
            ))
          }
        </TabsList>
        {/* <TabsContent value="1"></TabsContent> */}
      </Tabs>

      <div className="flex justify-between w-full my-4">
        <div />
        <DietaryForm />
      </div>

      {/* Carousel */}
      <Carousel className="w-full">
        <CarouselContent>
          {
            ["1", "2", "3", "4", "5", "6", "7"].map((value: string) => (
              <TabContent />
            ))
          }
        </CarouselContent>
      </Carousel>
    </main>
  );
};

Dashboard.getLayout = (page: React.ReactNode) => (
    <Layout>
      { page }
    </Layout>
);

export default Dashboard;
