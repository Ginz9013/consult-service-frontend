import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { createDailyRecord, updateDailyRecord, type DailyRecords } from "@/lib/record/api";
import { LoaderCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useDate } from "@/hooks/useDate";
import { formatDateString } from "@/util/dataFormatter";
import { z } from "zod";
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
import { evolve, filter, pipe } from "ramda";

const formSchema = z.object({
  weight: z.union([
    z.literal(""),
    z.coerce.number().gt(0, { message: "體重必須大於0" }),
  ]),
  body_fat: z.union([
    z.literal(""),
    z.coerce.number().gt(0, { message: "體脂必須大於0" }).lt(100, { message: "體脂必須小於100" }),
  ]),
  awake: z.union([
    z.literal(""),
    z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "格式必須是 HH:mm，例如 14:44" }),
  ]),
  sleep: z.union([
    z.literal(""),
    z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "格式必須是 HH:mm，例如 14:44" }),
  ]),
  water_morning: z.union([
    z.literal(""),
    z.coerce.number().gt(0, { message: "必須大於0" }),
  ]),
  water_afternoon: z.union([
    z.literal(""),
    z.coerce.number().gt(0, { message: "必須大於0" }),
  ]),
  water_evening: z.union([
    z.literal(""),
    z.coerce.number().gt(0, { message: "必須大於0" }),
  ]),
  water_another: z.union([
    z.literal(""),
    z.coerce.number().gt(0, { message: "必須大於0" }),
  ]),
  coffee: z.union([
    z.literal(""),
    z.coerce.number().gt(0, { message: "必須大於0" }),
  ]),
  tea: z.union([
    z.literal(""),
    z.coerce.number().gt(0, { message: "必須大於0" }),
  ]),
  sport: z.string(),
  defecation: z.string(),
  note: z.string(),
});

enum SubmitType {
  create = 1,
  update = 2,
}

type DailyFormProps = {
  record: Omit<DailyRecords, "date">;
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
      weight: "",
      body_fat: "",
      awake: "",
      sleep: "",
      water_morning: "",
      water_afternoon: "",
      water_evening: "",
      water_another: "",
      coffee: "",
      tea: "",
      sport: "",
      defecation: "",
      note: "",
    }
  });

  const submitHandler = async (submitType: SubmitType, values: any) => {
    const data = pipe(
      evolve({ body_fat: value => value / 100 }),
      filter(Boolean),
    )(values);


    if(isEmptyObject(data)) {
      toast({
        variant: "destructive",
        description: "請至少填入一項!",
      });
      return;
    };

    const reqBody: DailyRecords = { date: formatDateString(date.date), ...data };

    let res;
    if(submitType === SubmitType.create) {
      res = await createDailyRecord(reqBody);
    } else {
      res = await updateDailyRecord(reqBody);
    }

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

  const handleCreate = form.handleSubmit((values) =>
    submitHandler(SubmitType.create, values)
  );

  const handleUpdate = form.handleSubmit((values) =>
    submitHandler(SubmitType.update, values)
  );

  useEffect(() => {
    if(!isEmptyObject(record)) {
      let data = { ...record };

      if(record.body_fat) {
        data.body_fat = record.body_fat * 100;
      }
      form.reset(changeNullValues(data));
    }
  }, [JSON.stringify(record)]);

  return (
    <div className="w-full px-1 my-4">
      <Form {...form}>
        <form onSubmit={handleCreate} className="w-full space-y-4 mb-12">

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
                    <Input type="number" inputMode="numeric" {...field} disabled={!isFormEditing} />
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
                      <Input type="number" inputMode="numeric" {...field} disabled={!isFormEditing} />
                      <span className="absolute -top-1 right-3 translate-y-1/2 text-gray-500">%</span>
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
                    <Input type="time" {...field} disabled={!isFormEditing} />
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
                    <Input type="time" {...field} disabled={!isFormEditing} />
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
                      <div className="relative">
                        <Input type="number" inputMode="numeric" {...field} disabled={!isFormEditing} />
                        <span className="absolute -top-1 right-3 translate-y-1/2 text-gray-500">ml</span>
                      </div>
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
                      <div className="relative">
                        <Input type="number" inputMode="numeric" {...field} disabled={!isFormEditing} />
                        <span className="absolute -top-1 right-3 translate-y-1/2 text-gray-500">ml</span>
                      </div>
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
                      <div className="relative">
                        <Input type="number" inputMode="numeric" {...field} disabled={!isFormEditing} />
                        <span className="absolute -top-1 right-3 translate-y-1/2 text-gray-500">ml</span>
                      </div>
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
                      <div className="relative">
                        <Input type="number" inputMode="numeric" {...field} disabled={!isFormEditing} />
                        <span className="absolute -top-1 right-3 translate-y-1/2 text-gray-500">ml</span>
                      </div>
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
                      <div className="relative">
                        <Input type="number" inputMode="numeric" {...field} disabled={!isFormEditing} />
                        <span className="absolute -top-1 right-3 translate-y-1/2 text-gray-500">ml</span>
                      </div>
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
                      <div className="relative">
                        <Input type="number" inputMode="numeric" {...field} disabled={!isFormEditing} />
                        <span className="absolute -top-1 right-3 translate-y-1/2 text-gray-500">ml</span>
                      </div>
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
                    <Textarea {...field} disabled={!isFormEditing} />
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
                    <Textarea {...field} disabled={!isFormEditing} />
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
                    <Textarea {...field} disabled={!isFormEditing} />
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
                    className="w-full"
                    onClick={() => setIsFormEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="w-full"
                    onClick={handleUpdate}
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

      {/* Toaster */}
      <Toaster />
    </div>
  );
};

export default DailyForm;

// Utils
export const isEmptyObject = (obj: Object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const changeNullValues = <T extends object>(obj: T): Partial<T> =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === null) {
      // @ts-ignore
      acc[key as keyof T] = "";
    } else {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);