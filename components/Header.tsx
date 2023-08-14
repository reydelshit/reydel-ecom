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

export default function Header() {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <header className="flex h-[5rem] border-b-2 border-white items-center justify-between px-5">
      <h1 className="cursor-pointer">
        <Link href="/">Header</Link>
      </h1>

      <ModeToggle />

      <div className="flex gap-5">
        {session?.user?.role === 'ADMIN' && (
          <Button onClick={() => router.push('/admin')}>Admin Panel</Button>
        )}

        <Popover>
          <PopoverTrigger>Cart</PopoverTrigger>
          <PopoverContent className="mr-16 w-[25rem]">
            <Cart />
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {session?.user && (
              <Avatar>
                <AvatarImage src={session?.user?.image!} alt="profile" />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={
                  session?.user?.role === 'ADMIN'
                    ? '/admin/profile'
                    : '/user/profile'
                }
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
