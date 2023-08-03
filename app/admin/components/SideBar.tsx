'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';

interface SideBarProps {
  links: {
    name: string;
    link: string;
  }[];
}

export default function SideBar({ links }: SideBarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col border-r-2 p-4 h-screen w-[25rem]">
      {links.map((link, index) => {
        return (
          <Button
            key={index}
            variant="ghost"
            className={`${
              pathname == link.link
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent'
            } text-black p-2 justify-start`}
          >
            <Link href={link.link}>{link.name}</Link>
          </Button>
        );
      })}
    </div>
  );
}
