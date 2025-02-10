import Link from 'next/link'
import { CalendarHeart, UserRound } from 'lucide-react';

const Footer: React.FC = () => {
  
  return (
    <div className="flex justify-around bg-primary text-white text-center py-4">
      <Link href="/dashboard" className="flex flex-col items-center justify-center">
        <CalendarHeart />
        <small>Record</small>
      </Link>
      <Link href="/profile" className="flex flex-col items-center justify-center">
        <UserRound />
        <small>Profile</small>
      </Link>
    </div>
  );
};

export default Footer;