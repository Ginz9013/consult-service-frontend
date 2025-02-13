import { useMemo } from "react";
import { useUser } from "@/hooks/useUser";
import { formatWeight, formatBodyFat } from "@/util/dataFormatter";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const UserStatus = () => {
  const [ user ] = useUser();
  
  const bodyFat = useMemo(() => formatBodyFat(user.bodyFat), [user]);
  const wieght = useMemo(() => formatWeight(user.weight), [user]);

  return (
    <div className="flex justify-around items-end text-center w-full px-4">
      <div>
        <h2 className="text-2xl font-bold">{wieght}</h2>
        <p className="text-xs">Weight</p>
      </div>

      {/* Avatar */}
      <Avatar className="w-24 h-24">
        <AvatarImage src={ user.avatarImg ?? "https://github.com/shadcn.png" } className="object-cover" alt="AvatarImage" />
        <AvatarFallback>{user.nickname}</AvatarFallback>
      </Avatar>

      <div>
        <h2 className="text-2xl font-bold">{bodyFat}<span className="text-xl">%</span></h2>
        <p className="text-xs">Body Fat</p>
      </div>
    </div>
  );
};

export default UserStatus;