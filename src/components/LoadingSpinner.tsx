import { LoaderCircle } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <LoaderCircle className="animate-spin" />
      <p className='text-2xl ml-2'>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;