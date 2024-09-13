import { CarouselItem } from "@/components/ui/carousel";
import DailyForm from "./DailyForm";
import DietaryTable from "./DietaryTable";
import { Button } from "../ui/button";


const TabContent: React.FC = () => {
  return (
    <CarouselItem>
      <DietaryTable />
      <DailyForm />
      <Button className="w-full py-6 my-4 text-lg">Submit</Button>
    </CarouselItem>
  );
};

export default TabContent;