'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();

  return (
    <div className="flex flex-col border-r-2 dark:border-r-[#241e1c] p-4 h-screen w-[20rem]">
      {links.map((link, index) => {
        return (
          <Button
            onClick={() => router.push(link.link)}
            key={index}
            variant="ghost"
            className={`${
              pathname == link.link
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent'
            }  p-2 justify-start`}
          >
            {/* <Link onClick={() => router.push(link.link)} href={link.link}> */}
            {link.name}
            {/* </Link> */}
          </Button>
        );
      })}
    </div>
  );
}
