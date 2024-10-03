import { CarouselItem } from "@/components/ui/carousel";
import DailyForm from "./DailyForm";
import DietaryTable from "./DietaryTable";

type TabContentProps = {
  dailyRecord: any;
}

const TabContent: React.FC<TabContentProps> = ({ dailyRecord }) => {

  return (
    <CarouselItem>
      <DietaryTable />
      <DailyForm record={dailyRecord} />
    </CarouselItem>
  );
};

export default TabContent;