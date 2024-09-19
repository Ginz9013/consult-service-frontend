import dayjs from 'dayjs';
import { Button } from '../ui/button';

const Header: React.FC = () => {

  const today = dayjs().format("YYYY-MM-DD");

  return (
    <header className="flex justify-center items-center bg-primary text-white w-full p-4 relative">
      <h1 className="absolute top-4 left-6 tracking-wider">VCS.</h1>
      <p className='font-bold'>{today}</p>
      <Button variant="ghost" className="absolute top-2 right-2">Log Out</Button>
    </header>
  );
};

export default Header;