import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '../ui/button';


const DietaryForm: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="bg-primary text-white py-2 px-4 rounded-md text-sm">
        <Button>Add Dietary</Button>
      </SheetTrigger>

      <SheetContent className="bg-primary border-none w-full">
        
        <SheetHeader>
          <SheetTitle className="text-white">Add Dietary</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="bg-white text-primary">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DietaryForm;