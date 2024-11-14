import { useEffect, useRef, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/ui/TimePickerInput";
import { Slider } from "@/components/ui/slider";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Toaster } from '../ui/toaster';
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";
// import { Clock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  staple: z.number()
    .min(0, "Value must be at least 0.")
    .max(10, "Value must be at most 10."),
  meat: z.number()
    .min(0, "Value must be at least 0.")
    .max(10, "Value must be at most 10."),
  fruit: z.number()
    .min(0, "Value must be at least 0.")
    .max(10, "Value must be at most 10."),
  vegetable: z.number()
    .min(0, "Value must be at least 0.")
    .max(10, "Value must be at most 10."),
  fat: z.number()
    .min(0, "Value must be at least 0.")
    .max(10, "Value must be at most 10."),
  description: z.string(),
  images: z.any() // 使用 .any() 以接受 FileList，或者自訂邏輯
    .refine((files) => files === undefined || files instanceof FileList && files.length <= 3, {
      message: "Please upload fewer than 3 images.",
    }),
});


const DietaryForm: React.FC = () => {
  const { toast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const [ date, setDate ] = useState<any>();
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staple: 0,
      meat: 0,
      fruit: 0,
      vegetable: 0,
      fat: 0,
      description: ""
    },
  });
  const [staple, meat, fruit, vegetable, fat, images] = form.watch(["staple", "meat", "fruit", "vegetable", "fat", "images"]);

  const submitHandler = (data: any) => {

    if(!date) { 
      toast({
        variant: "destructive",
        description: "Please Enter Time!",
      });
    }

    if(isFormWithoutInput(data)) {
      toast({
        variant: "destructive",
        description: "Please Enter at least 1 Fields!",
      });
    }

    console.log(date);
    console.log(data);
    console.log(images);
  };

  const isFormWithoutInput = (data: any) => {
    for (const key in data) {
      if (data[key]) return false;
    }

    return true;
  }

  useEffect(() => {
    if(!isSheetOpen) {
      form.reset();
    }
  }, [isSheetOpen]);

  return (
    <Sheet>
      <SheetTrigger asChild className="bg-primary text-white py-2 px-4 rounded-md text-sm">
        <Button onClick={() => setIsSheetOpen(true)}>Add Dietary</Button>
      </SheetTrigger>

      <SheetContent className="bg-gray-600 border-none w-full flex flex-col items-center overflow-y-auto py-12">
        
        <SheetHeader>
          <SheetTitle className="text-white">Add Dietary</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>

        {/* ====== Main Content ====== */}
        {/* Time Picker */}
        <div className="flex items-end gap-2">
          <div className="grid gap-1 text-center">
            <Label htmlFor="hours" className="text-xs text-white">
              Hours
            </Label>
            <TimePickerInput
              picker="hours"
              date={date}
              setDate={setDate}
              ref={hourRef}
              onRightFocus={() => minuteRef.current?.focus()}
            />
          </div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="minutes" className="text-xs text-white">
              Minutes
            </Label>
            <TimePickerInput
              picker="minutes"
              date={date}
              setDate={setDate}
              ref={minuteRef}
              onLeftFocus={() => hourRef.current?.focus()}
              onRightFocus={() => secondRef.current?.focus()}
            />
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4 w-5/6">

            {/* Staple */}
            <FormField
              control={form.control}
              name="staple"
              render={() => (
                <FormItem>
                  <FormLabel className="text-white">Staple: {staple}</FormLabel>
                  <FormControl>
                    <Controller
                      name="staple"
                      control={form.control}
                      render={({ field: { value, onChange } }) => (
                        <Slider
                          value={[value]} // Slider 預期為數組，所以包裹成 [value]
                          onValueChange={(val) => onChange(val[0])} // 更新為單一值
                          max={10}
                          step={0.5}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Meat */}
            <FormField
              control={form.control}
              name="meat"
              render={() => (
                <FormItem>
                  <FormLabel className="text-white">Meat: {meat}</FormLabel>
                  <FormControl>
                    <Controller
                      name="meat"
                      control={form.control}
                      render={({ field: { value, onChange } }) => (
                        <Slider
                          value={[value]} // Slider 預期為數組，所以包裹成 [value]
                          onValueChange={(val) => onChange(val[0])} // 更新為單一值
                          max={10}
                          step={0.5}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fruit */}
            <FormField
              control={form.control}
              name="fruit"
              render={() => (
                <FormItem>
                  <FormLabel className="text-white">Fruit: {fruit}</FormLabel>
                  <FormControl>
                    <Controller
                      name="fruit"
                      control={form.control}
                      render={({ field: { value, onChange } }) => (
                        <Slider
                          value={[value]} // Slider 預期為數組，所以包裹成 [value]
                          onValueChange={(val) => onChange(val[0])} // 更新為單一值
                          max={10}
                          step={0.5}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vegetable */}
            <FormField
              control={form.control}
              name="vegetable"
              render={() => (
                <FormItem>
                  <FormLabel className="text-white">Vegetable: {vegetable}</FormLabel>
                  <FormControl>
                    <Controller
                      name="vegetable"
                      control={form.control}
                      render={({ field: { value, onChange } }) => (
                        <Slider
                          value={[value]} // Slider 預期為數組，所以包裹成 [value]
                          onValueChange={(val) => onChange(val[0])} // 更新為單一值
                          max={10}
                          step={0.5}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fat */}
            <FormField
              control={form.control}
              name="fat"
              render={() => (
                <FormItem>
                  <FormLabel className="text-white">Fat: {fat}</FormLabel>
                  <FormControl>
                    <Controller
                      name="fat"
                      control={form.control}
                      render={({ field: { value, onChange } }) => (
                        <Slider
                          value={[value]} // Slider 預期為數組，所以包裹成 [value]
                          onValueChange={(val) => onChange(val[0])} // 更新為單一值
                          max={10}
                          step={0.5}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-white"
                      placeholder="Enter description here..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Images */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Pictures</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      onChange={(e) => field.onChange(e.target.files)} // 將 FileList 傳遞給 field
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Preview Images */}
            <div className="mt-4">
            {images && Array.from(images).map((file: any, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="block w-full h-full object-cover rounded mb-4"
                  onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))} // 清理 URL，避免內存洩漏
                />
              ))}
            </div>

            <br />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {
                isLoading
                  ? "loading..."
                  : "Submit" 
              }
            </Button>

            
          </form>
        </Form>
        {/* ====== Main Content ====== */}

        <SheetFooter className="w-5/6">
          <SheetClose asChild >
            <Button
              type="submit"
              className="w-full bg-white text-primary"
              onClick={() => setIsSheetOpen(false)}
            >
              back
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>

      {/* Toaster */}
      <Toaster />
    </Sheet>
  );
};

export default DietaryForm;