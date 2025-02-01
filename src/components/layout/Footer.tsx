import Link from 'next/link'
import { CalendarHeart, UserRound } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <div className="flex justify-around bg-primary text-white text-center py-4">
      <button className="flex flex-col items-center justify-center">
        <CalendarHeart />
        <small>Record</small>
      </button>
      <button className="flex flex-col items-center justify-center">
        <UserRound />
        <small>Profile</small>
      </button>
    </div>
  );
};

export default Footer;