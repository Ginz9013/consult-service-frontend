import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import dayjs from "dayjs";
import { mutate } from "swr";
import { createDailyRecord } from "@/lib/record/api";
import { LoaderCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useDate } from "@/hooks/useDate";
import { formatDateString } from "@/util/dataFormatter";

type DailyFormProps = {
  record: any;
}

const DailyForm: React.FC<DailyFormProps> = ({ record }) => {

  const { toast } = useToast();

  const [date] = useDate();

  const [isFormEditing, setIsFormEditing] = useState<boolean>(() => record ? false : true);

  const [formData, setFormData] = useState<any>(() => record ? record : {});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = async () => {

    setIsLoading(true);

    const reqBody = { ...formData }
    const res = await createDailyRecord(reqBody);

    if (res.status === 200) {
      toast({
        description: res.message,
      });
      mutate("getWeeklyRecords");
      setIsFormEditing(false);
    } else {
      toast({
        variant: "destructive",
        description: res.message,
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="w-full px-1 my-4">

      {/* <Button onClick={() => {
        console.log("dafsd")
        toast({
          title: "Scheduled: Catch up ",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <Button>Undo</Button>
          ),
        })
      }}>DEV</Button> */}

      {/* Body */}
      <h2 className="text-xl font-bold">Body</h2>
      <hr className="my-2" />
      <div className="flex justify-between gap-4 mb-8">
        <div className="w-full">
          <Label htmlFor="weight">Weight</Label>
          <Input
            type="number"
            id="weight"
            className="text-right"
            value={formData?.weight}
            onChange={
              (e) => setFormData((prev: any) => ({ ...prev, weight: +e.target.value }))
            }
            disabled={!isFormEditing}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="bodyFat">Body Fat</Label>
          <Input
            type="number"
            id="bodyFat"
            className="text-right"
            value={formData?.body_fat}
            onChange={
              (e) => setFormData((prev: any) => ({ ...prev, body_fat: +e.target.value }))
            }
            disabled={!isFormEditing}
          />
        </div>
      </div>

      {/* Sleeping */}
      <h2 className="text-xl font-bold">Sleeping</h2>
      <hr className="my-2" />
      <div className="flex justify-between gap-4 mb-8">
        <div className="w-full">
          <Label htmlFor="awake">Awake</Label>
          <Input
            type="time"
            id="awake"
            value={formData?.awake}
            onChange={
              (e) => {
                console.log(e.target.value)
                setFormData((prev: any) => ({ ...prev, awake: e.target.value }))
              }
            }
            disabled={!isFormEditing}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="sleep">Sleep</Label>
          <Input
            type="time"
            id="sleep"
            value={formData?.sleep}
            onChange={
              (e) => setFormData((prev: any) => ({ ...prev, sleep: e.target.value }))
            }
            disabled={!isFormEditing}
          />
        </div>
      </div>


      {/* Water Intake */}
      <h2 className="text-xl font-bold">Water Intake</h2>
      <hr className="my-4" />

      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <div>
            <Label htmlFor="morning">Morning</Label>
            <Input
              type="number"
              id="morning"
              className="text-right"
              value={formData?.water_morning}
              onChange={
                (e) => setFormData((prev: any) => ({ ...prev, water_morning: +e.target.value }))
              }
              disabled={!isFormEditing}
            />
          </div>
          <div>
            <Label htmlFor="noon">Noon</Label>
            <Input
              type="number"
              id="noon"
              className="text-right"
              value={formData?.water_afternoon}
              onChange={
                (e) => setFormData((prev: any) => ({ ...prev, water_afternoon: +e.target.value }))
              }
              disabled={!isFormEditing}
            />
          </div>
          <div>
            <Label htmlFor="evening">Evening</Label>
            <Input
              type="number"
              id="evening"
              className="text-right"
              value={formData?.water_evening}
              onChange={
                (e) => setFormData((prev: any) => ({ ...prev, water_evening: +e.target.value }))
              }
              disabled={!isFormEditing}
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div>
            <Label htmlFor="others">Others</Label>
            <Input
              type="number"
              id="others"
              className="text-right"
              value={formData?.water_another}
              onChange={
                (e) => setFormData((prev: any) => ({ ...prev, water_another: +e.target.value }))
              }
              disabled={!isFormEditing}
            />
          </div>
          <div>
            <Label htmlFor="coffee">Coffee</Label>
            <Input
              type="number"
              id="coffee"
              className="text-right"
              value={formData?.coffee}
              onChange={
                (e) => setFormData((prev: any) => ({ ...prev, coffee: +e.target.value }))
              }
              disabled={!isFormEditing}
            />
          </div>
          <div>
            <Label htmlFor="tea">Tea</Label>
            <Input
              type="number"
              id="tea"
              className="text-right"
              value={formData?.tea}
              onChange={
                (e) => setFormData((prev: any) => ({ ...prev, tea: +e.target.value }))
              }
              disabled={!isFormEditing}
            />
          </div>
        </div>
      </div>

      {/* Sport */}
      <h2 className="text-xl font-bold">Sport</h2>
      <Textarea
        className="mb-8"
        value={formData?.sport}
        onChange={
          (e) => setFormData((prev: any) => ({ ...prev, sport: e.target.value }))
        }
        disabled={!isFormEditing}
      />

      {/* Defecation */}
      <h2 className="text-xl font-bold">Defecation</h2>
      <Textarea
        className="mb-8"
        value={formData?.defecation}
        onChange={
          (e) => setFormData((prev: any) => ({ ...prev, defecation: e.target.value }))
        }
        disabled={!isFormEditing}
      />

      {/* Note */}
      <h2 className="text-xl font-bold">Note</h2>
      <Textarea
        className="mb-8"
        value={formData?.note}
        onChange={
          (e) => setFormData((prev: any) => ({ ...prev, note: e.target.value }))
        }
        disabled={!isFormEditing}
      />

      {
        !record
          ? <Button
              className="w-full py-6 my-4 text-lg"
              // onClick={submitHandler}
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
                variant="outline"
                className="w-full py-6 my-4 text-lg"
                onClick={() => setIsFormEditing(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-full py-6 my-4 text-lg"
              >
                Update
              </Button>
            </div>
          : <Button
              className="w-full py-6 my-4 text-lg"
              onClick={() => setIsFormEditing(true)}
            >
              Edit
            </Button>
      }
    </div>
  );
};

export default DailyForm;