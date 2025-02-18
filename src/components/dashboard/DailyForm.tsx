import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { mutate } from "swr";
import { createDailyRecord, type CreateDailyRecordProps } from "@/lib/record/api";
import { LoaderCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useDate } from "@/hooks/useDate";
import { formatDateString } from "@/util/dataFormatter";
import { number, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  weight: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    },
    z.coerce.number().gt(0, { message: "體重必須大於零" }).optional()
  ),
  body_fat: z.coerce.number().gt(0, { message: "體脂必須大於零" }).optional(),
  awake: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "格式必須是 HH:mm，例如 14:44" }).optional(),
  sleep: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "格式必須是 HH:mm，例如 14:44" }).optional(),
  water_morning: z.coerce.number().gt(0, { message: "必須大於零" }).optional(),
  water_afternoon: z.coerce.number().gt(0, { message: "必須大於零" }).optional(),
  water_evening: z.coerce.number().gt(0, { message: "必須大於零" }).optional(),
  water_another: z.coerce.number().gt(0, { message: "必須大於零" }).optional(),
  coffee: z.coerce.number().gt(0, { message: "必須大於零" }).optional(),
  tea: z.coerce.number().gt(0, { message: "必須大於零" }).optional(),
  sport: z.string().optional(),
  defecation: z.string().optional(),
  note: z.string().optional(),
});

type DailyFormProps = {
  record: any;
}

const DailyForm: React.FC<DailyFormProps> = ({ record }) => {

  const { toast } = useToast();

  const [date] = useDate();

  const [isFormEditing, setIsFormEditing] = useState<boolean>(() => isEmptyObject(record));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // @ts-ignore
      weight: "",
    }
  });

  const submitHandler = async (values: any) => {
    console.log("submit");
    console.log(values);
    const data = removeEmptyValues(values);

    if(isEmptyObject(data)) {
      toast({
        description: "請至少填入一項!",
      });
      return;
    };

    // console.log(formData);
    setIsLoading(true);
    const currnetDate = formatDateString(date.date);
    const reqBody: CreateDailyRecordProps = { date: currnetDate, ...data };
    console.log(reqBody);
    const res = await createDailyRecord(reqBody);

    if (res.status === 200) {
      toast({
        description: res.message,
      });
      mutate("getDailyRecord");
      setIsFormEditing(false);
    } else {
      toast({
        variant: "destructive",
        description: res.message,
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    // 印出來看看內容是否真的變了
    console.log("record changed", record);
    // 利用展開運算子產生新物件參考
    if(!isEmptyObject(record)) form.reset(changeNullValues(record));
  }, [JSON.stringify(record)]);

  return (
    <div className="w-full px-1 my-4">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="w-full space-y-4 mb-12">

          {/* Body */}
          <h2 className="text-xl font-bold">Body</h2>
          <hr className="my-2" />
          <div className="flex justify-between gap-4 mb-8">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>體重</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body_fat"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>體脂</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="number" {...field} />
                      <span className="absolute -top-1 right-3 translate-y-1/2">%</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Sleeping */}
          <h2 className="text-xl font-bold">Sleeping</h2>
          <hr className="my-2" />
          <div className="flex justify-between gap-4 mb-8">
            <FormField
              control={form.control}
              name="awake"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>起床</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sleep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>睡覺</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Water Intake */}
          <h2 className="text-xl font-bold">Water Intake</h2>
          <hr className="my-4" />

          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              <FormField
                control={form.control}
                name="water_morning"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>早上</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="water_afternoon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>中午</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="water_evening"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>晚上</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 mb-4">
              <FormField
                control={form.control}
                name="water_another"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>其他</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coffee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>咖啡</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>茶</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Sport */}
          <h2 className="text-xl font-bold">運動</h2>
          <div className="mb-8">
            <FormField
              control={form.control}
              name="sport"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Defecation */}
          <h2 className="text-xl font-bold">排便</h2>
          <div className="mb-8">
            <FormField
              control={form.control}
              name="defecation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Note */}
          <h2 className="text-xl font-bold">備註</h2>
          <div className="mb-8">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <br />
          {/* Submit Button */}
          {
            isEmptyObject(record)
              ? <Button
                  type="submit"
                  className="w-full"
                >
                  {
                    isLoading
                    ? <LoaderCircle className="animate-spin" />
                    : "Submit"
                  }
                </Button>
              : isFormEditing
              ? <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full py-6 my-4 text-lg"
                    onClick={() => setIsFormEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="w-full py-6 my-4 text-lg"
                  >
                    Update
                  </Button>
                </div>
              : <Button
                  type="button"
                  className="w-full"
                  onClick={() => setIsFormEditing(true)}
                >
                  Edit
                </Button>
          }
        </form>
      </Form>
      <Button onClick={() => {
        console.log(form.getValues());
      }}>click</Button>
    </div>
  );
};

export default DailyForm;

// Utils
export const isEmptyObject = (obj: Object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export function removeEmptyValues<T extends object>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

export function changeNullValues<T extends object>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === null) {
      acc[key as keyof T] = "";
    } else {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};