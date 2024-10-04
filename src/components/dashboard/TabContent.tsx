import { CarouselItem } from "@/components/ui/carousel";
import DailyForm from "./DailyForm";
import DietaryTable from "./DietaryTable";

type TabContentProps = {
  date: string;
  dailyRecord: any;
}

const TabContent: React.FC<TabContentProps> = ({ date, dailyRecord }) => {

  return (
    <CarouselItem>
      <DietaryTable />
      <DailyForm date={date} record={dailyRecord} />
    </CarouselItem>
  );
};

export default TabContent;