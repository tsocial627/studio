"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Hospital } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  
  const navLinks = [
    { name: 'Find a Specialist', href: '#find-specialist' },
    { name: 'Our Doctors', href: '#doctors' },
    { name: 'Your Profile', href: '#profile' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Hospital className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">StayHealthy</span>
        </Link>
        
        {!isMobile && (
          <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                {link.name}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-8">
                  <Hospital className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">StayHealthy</span>
                </Link>
                <nav className="grid gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                     <SheetClose asChild key={link.name}>
                        <Link href={link.href} className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground/60">
                          <span>{link.name}</span>
                        </Link>
                     </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
