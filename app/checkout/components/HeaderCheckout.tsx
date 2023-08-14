'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';

interface HeaderCheckoutProps {
  links: {
    name: string;
    link: string;
  }[];
}

export default function HeaderCheckout({ links }: HeaderCheckoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex justify-center w-full">
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
            } text-black p-2 justify-start`}
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
