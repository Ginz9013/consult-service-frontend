import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";


const Header: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [date, setDate] = useState<Date | undefined>(new Date());
  

  const dateList = useMemo(() => dateListChanger(date), [date]);

  const test = () => {
    console.log(api);
    api?.scrollTo(2);
  }

  useEffect(() => {
    if (!api) {
      return;
    };
 
    api?.scrollTo(2);
  }, [api]);

  return (
    <div className="flex flex-col justify-center bg-primary text-white w-full px-6 pb-4 relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full bg-inherit justify-center text-left font-normal pt-6 pb-4",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className='w-full'
          />
        </PopoverContent>
      </Popover>

      <ul className="flex justify-between w-full gap-6">
        <li>週一</li>
        <li>週二</li>
        <li>週三</li>
        <li>週四</li>
        <li>週五</li>
        <li>週六</li>
        <li>週日</li>
      </ul>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {
            dateList.map((week: any, index: number) => (
              <CarouselItem key={String(index)}>
                <div className="flex items-center justify-between gap-6">
                  <button className="w-8">{week.Monday}</button>
                  <button className="w-8">{week.Tuesday}</button>
                  <button className="w-8">{week.Wednesday}</button>
                  <button className="w-8">{week.Thursday}</button>
                  <button className="w-8">{week.Friday}</button>
                  <button className="w-8">{week.Saturday}</button>
                  <button className="w-8">{week.Sunday}</button>
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>
      </Carousel>
      {/* <Button onClick={test}>DEV</Button> */}
    </div>
  );
};

export default Header;


const dateListChanger = (date: Date | undefined) => {

  const inputDate = dayjs(date); // 轉換為 dayjs 物件
  const startOfWeek = inputDate.startOf("week").add(1, "day"); // 計算該週的週一
  const result: { [key: string]: number }[] = [];

  // 遍歷前後兩週並生成資料
  for (let weekOffset = -2; weekOffset <= 2; weekOffset++) {
    const weekStart = startOfWeek.add(weekOffset * 7, "day"); // 每次偏移一週
    const weekData: { [key: string]: number } = {};

    // 計算當週的每一天
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach((day, index) => {
      const currentDay = weekStart.add(index, "day");
      weekData[day] = currentDay.date(); // 使用 `.date()` 提取當月的日期
    });

    result.push(weekData);
  }

  return result;
}