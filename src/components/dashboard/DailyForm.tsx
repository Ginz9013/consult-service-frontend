import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const DailyForm: React.FC = () => {
  return (
    <div className="w-full px-1 my-4">

      {/* Body */}
      <h2 className="text-xl font-bold">Body</h2>
      <hr className="my-2" />
      <div className="flex justify-between gap-4 mb-8">
        <div className='w-full'>
          <Label htmlFor="weight">Weight</Label>
          <Input type="number" id="weight" className="text-right" />
        </div>
        <div className='w-full'>
          <Label htmlFor="bodyFat">Body Fat</Label>
          <Input type="number" id="bodyFat" className="text-right" />
        </div>
      </div>

      {/* Sleeping */}
      <h2 className="text-xl font-bold">Sleeping</h2>
      <hr className="my-2" />
      <div className="flex justify-between gap-4 mb-8">
        <div className='w-full'>
          <Label htmlFor="awake">Awake</Label>
          <Input type="time" id="awake" />
        </div>
        <div className='w-full'>
          <Label htmlFor="sleep">Sleep</Label>
          <Input type="time" id="sleep" />
        </div>
      </div>


      {/* Water Intake */}
      <h2 className="text-xl font-bold">Water Intake</h2>
      <hr className="my-4" />

      <div className='mb-8'>
        <div className="flex gap-4 mb-4">
          <div>
            <Label htmlFor="morning">Morning</Label>
            <Input type="number" id="morning" className="text-right" />
          </div>
          <div>
            <Label htmlFor="noon">Noon</Label>
            <Input type="number" id="noon" className="text-right" />
          </div>
          <div>
            <Label htmlFor="evening">Evening</Label>
            <Input type="number" id="evening" className="text-right" />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div>
            <Label htmlFor="others">Others</Label>
            <Input type="number" id="others" className="text-right" />
          </div>
          <div>
            <Label htmlFor="coffee">Coffee</Label>
            <Input type="number" id="coffee" className="text-right" />
          </div>
          <div>
            <Label htmlFor="tea">Tea</Label>
            <Input type="number" id="tea" className="text-right" />
          </div>
        </div>
      </div>

      {/* Sport */}
      <h2 className="text-xl font-bold">Sport</h2>
      <Textarea className="mb-8" />

      {/* Defecation */}
      <h2 className="text-xl font-bold">Defecation</h2>
      <Textarea className="mb-8" />

      {/* Note */}
      <h2 className="text-xl font-bold">Note</h2>
      <Textarea className="mb-8" />
    </div>
  );
};

export default DailyForm;