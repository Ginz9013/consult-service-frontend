import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

// ====== Avatar ======
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
// ====== Avatar ======

// ====== Chart ======
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart } from "recharts"
 
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;
// ====== Chart ======

// ====== Tab ======
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// ====== Tab ======

// ====== Table ======
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react";
// ====== Table ======

// ====== Corousel ======
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
// ====== Corousel ======



const Dashboard = () => {

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

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
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full py-4">
        <BarChart accessibilityLayer data={chartData}>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>

      {/* Tabs */}
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="1">9/15</TabsTrigger>
          <TabsTrigger value="2">9/16</TabsTrigger>
          <TabsTrigger value="3">9/17</TabsTrigger>
          <TabsTrigger value="4">9/18</TabsTrigger>
          <TabsTrigger value="5">9/19</TabsTrigger>
          <TabsTrigger value="6">9/20</TabsTrigger>
          {/* <TabsTrigger value="7">9/21</TabsTrigger> */}
        </TabsList>

        <TabsContent value="1"></TabsContent>

      </Tabs>

      <div className="flex justify-between w-full my-4">
        <div></div>
        <Button>Add Dietary</Button>
      </div>

      {/* Carousel */}
      <Carousel className="w-full">
        <CarouselContent>
          {
            ["1", "2", "3", "4", "5", "6", "7"].map((value: string) => (
              <CarouselItem>
                {/* Table */}
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Time</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Edit</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {
                      new Array(5).fill(null).map((_: any) => (
                        <TableRow>
                          <TableCell className="font-medium">13:0{value}</TableCell>
                          <TableCell>Lunch</TableCell>
                          <TableCell>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>

      <h2 className="text-2xl font-bold">Water Intake</h2>
      

    </main>
  );
};

Dashboard.getLayout = (page: React.ReactNode) => (
    <Layout>
      { page }
    </Layout>
);

export default Dashboard;