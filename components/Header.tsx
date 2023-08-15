'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cart } from './Cart';
import { ModeToggle } from './ToggleTheme';
import Logo from '@/assets/logoeco.png';
import DarkLogo from '@/assets/darkl.png';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';

export default function Header() {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <header className="flex h-[5rem] items-center justify-between px-5 py-5">
      <Link href="/">
        <Image className="dark:hidden" width={300} src={Logo} alt="logo" />
        <Image
          className="dark:block hidden"
          width={300}
          src={DarkLogo}
          alt="logo"
        />
      </Link>

      <div className="flex gap-5 items-center">
        <Link
          href={session?.user ? '/products' : '/api/auth/signin'}
          className="flex items-center font-bold cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          shop now!
        </Link>
        {session?.user?.role === 'ADMIN' && (
          <Button onClick={() => router.push('/admin')}>Admin Panel</Button>
        )}
        <ModeToggle />

        {/* show cart  */}
        <Popover>
          <PopoverTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </PopoverTrigger>
          <PopoverContent className="mr-16 mt-5 w-[25rem] dark:border-[#241e1c]">
            <Cart />
          </PopoverContent>
        </Popover>
        <Sheet>
          <SheetTrigger>
            {session?.user && (
              <Avatar>
                <AvatarImage src={session?.user?.image!} alt="profile" />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
            )}
          </SheetTrigger>
          <SheetContent className="w-[16rem]">
            <SheetHeader>
              <img
                className="rounded-full w-[8rem]"
                src={session?.user?.image!}
                alt=""
              />
              <SheetTitle>Profile Menu</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-5 flex flex-col">
              <Link
                href={
                  session?.user?.role === 'ADMIN'
                    ? '/admin/profile'
                    : '/user/profile'
                }
              >
                Profile
              </Link>

              <Link
                href={
                  session?.user?.role === 'ADMIN'
                    ? '/admin/profile'
                    : '/user/profile'
                }
              >
                Orders
              </Link>
              <SignOut />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function SignOut() {
  const router = useRouter();

  async function onSignOut() {
    await signOut();
    router.push('/api/auth/signin');
  }

  return (
    <Button className="mt-2 w-[4rem]" onClick={onSignOut}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
    </Button>
  );
}
