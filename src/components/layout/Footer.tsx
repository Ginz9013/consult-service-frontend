import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white text-center text-xs py-8">
      <p className='mb-2'>Copyright © 2024 VCS. All rights reserved.</p>
      <p className='font-bold'>Powered by <Link href="https://kouhei.netlify.app/">KOUHEI</Link></p>
    </footer>
  );
};

export default Footer;