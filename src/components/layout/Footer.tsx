import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white text-center text-sm p-4">
      <p className='mb-2'>Copyright © 2024 VCS. All rights reserved.</p>
      <p className='font-bold'>Power by <Link href="https://kouhei.netlify.app/">KOUHEI</Link></p>
    </footer>
  );
};

export default Footer;