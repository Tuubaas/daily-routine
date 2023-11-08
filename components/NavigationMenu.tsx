'use client';

import { useState } from 'react';
import Button from './Button';

type SidebarNavigationProps = {
  links: { name: string; href: string }[];
};

export default function SidebarNavigation({ links }: SidebarNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log('isOpen', isOpen);

  return (
    <div className="flex flex-col justify-end">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-white shadow-xl ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <Button onClick={() => setIsOpen(!isOpen)} rounded>
          <Icon isOpen={isOpen} />
        </Button>
      </div>
      <div
        className={`flex flex-col w-4/5 md:w-2/3 h-full bg-secondary z-20 top-0 right-0 shadow-2xl ${
          isOpen ? 'fixed' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-white shadow-xl">
          <Button onClick={() => setIsOpen(!isOpen)} rounded>
            <Icon isOpen={isOpen} />
          </Button>
        </div>
        {links.map((link) => (
          <a key={link.name} href={link.href} className="text-white">
            {link.name}
          </a>
        ))}
      </div>
      <div
        className={`bg-black/50 w-full h-full z-10 top-0 left-0 ${
          isOpen ? 'absolute' : 'hidden'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
    </div>
  );
}

function Icon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className="w-6 h-6"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
      />
    </svg>
  );
}
