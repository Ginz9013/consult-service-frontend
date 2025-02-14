import React, { useEffect, useMemo, useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
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
import { useDate } from '@/hooks/useDate';
import { dateStore } from '@/store/date';


const Header: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [date, setDate] = useDate();
  
  const dateList = useMemo(() => dateListChanger(date.date), [date]);

  const changeDate = (date: Date | undefined) => {
    if(date) setDate({ date });
    api?.scrollTo(2);
  };

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
            {date ? format(date.date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date.date}
            onSelect={changeDate}
            initialFocus
            className='w-full'
          />
        </PopoverContent>
      </Popover>

      <ul className="flex justify-between w-full gap-6">
        <li className="text-sm">週一</li>
        <li className="text-sm">週二</li>
        <li className="text-sm">週三</li>
        <li className="text-sm">週四</li>
        <li className="text-sm">週五</li>
        <li className="text-sm">週六</li>
        <li className="text-sm">週日</li>
      </ul>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {
            dateList.map((week: any, index: number) => (
              <CarouselItem key={String(index)}>
                <div className="flex items-center justify-between gap-6">
                  <button
                    className={cn(
                      "w-8",
                      { "bg-white rounded-full text-primary": checkSelected(date.date, week.Monday)}
                    )}
                    onClick={() => changeDate(week.Monday.toDate())}
                  >
                    {week.Monday.date()}
                  </button>
                  <button
                    className={cn(
                      "w-8",
                      { "bg-white rounded-full text-primary": checkSelected(date.date, week.Tuesday) }
                    )}
                    onClick={() => changeDate(week.Tuesday.toDate())}
                  >
                    {week.Tuesday.date()}
                  </button>
                  <button
                    className={cn(
                      "w-8",
                      { "bg-white rounded-full text-primary": checkSelected(date.date, week.Wednesday) }
                    )}
                    onClick={() => changeDate(week.Wednesday.toDate())}
                  >
                    {week.Wednesday.date()}
                  </button>
                  <button
                    className={cn(
                      "w-8",
                      { "bg-white rounded-full text-primary": checkSelected(date.date, week.Thursday) }
                    )}
                    onClick={() => changeDate(week.Thursday.toDate())}
                  >
                    {week.Thursday.date()}
                  </button>
                  <button
                    className={cn(
                      "w-8",
                      { "bg-white rounded-full text-primary": checkSelected(date.date, week.Friday) }
                    )}
                    onClick={() => changeDate(week.Friday.toDate())}
                  >
                    {week.Friday.date()}
                  </button>
                  <button
                    className={cn(
                      "w-8",
                      { "bg-white rounded-full text-primary": checkSelected(date.date, week.Saturday) }
                    )}
                    onClick={() => changeDate(week.Saturday.toDate())}
                  >
                    {week.Saturday.date()}
                  </button>
                  <button
                    className={cn(
                      "w-8",
                      { "bg-white rounded-full text-primary": checkSelected(date.date, week.Sunday) }
                    )}
                    onClick={() => changeDate(week.Sunday.toDate())}
                  >
                    {week.Sunday.date()}
                  </button>
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Header;


const dateListChanger = (date: Date | undefined) => {

  const inputDate = dayjs(date); // 轉換為 dayjs 物件
  const startOfWeek = inputDate.startOf("week").add(1, "day"); // 計算該週的週一
  const result: { [key: string]: Dayjs }[] = [];

  // 遍歷前後兩週並生成資料
  for (let weekOffset = -2; weekOffset <= 2; weekOffset++) {
    const weekStart = startOfWeek.add(weekOffset * 7, "day"); // 每次偏移一週
    const weekData: { [key: string]: Dayjs } = {};

    // 計算當週的每一天
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].forEach((day, index) => {
      const currentDay = weekStart.add(index, "day");
      weekData[day] = currentDay;
    });

    result.push(weekData);
  }

  return result;
};

// Utils
export const checkSelected = (currentDate: Date, selectDate: Dayjs) =>
  dayjs(currentDate).isSame(selectDate, 'day');