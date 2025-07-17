import Link from 'next/link';
import { Hospital } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-secondary">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <Hospital className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose md:text-left font-bold">MediLink</p>
          </Link>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MediLink Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
