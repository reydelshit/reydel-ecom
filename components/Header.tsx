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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <header className="flex h-[5rem] items-center justify-between px-5">
      <h1 className="cursor-pointer">
        <Link href="/">Header</Link>
      </h1>

      <div className="flex gap-5">
        <Button>
          {' '}
          <Link
            href={session?.user ? '/products' : '/api/auth/signin'}
            className="font-bold cursor-pointer dark:hover:text-[#0c0a09]"
          >
            SHOP NOW
          </Link>
        </Button>

        {session?.user?.role === 'ADMIN' && (
          <Button onClick={() => router.push('/admin')}>Admin Panel</Button>
        )}

        <ModeToggle />

        <Popover>
          <PopoverTrigger>Cart</PopoverTrigger>
          <PopoverContent className="mr-16 w-[25rem] dark:border-[#241e1c]">
            <Cart />
          </PopoverContent>
        </Popover>
        {/* <Link
                href={
                  session?.user?.role === 'ADMIN'
                    ? '/admin/profile'
                    : '/user/profile'
                }
              >
                Profile
              </Link> */}

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
              <span>Settings</span>
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

  return <button onClick={onSignOut}>Logout</button>;
}
