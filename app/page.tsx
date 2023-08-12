import { authOptions } from '@/lib/AuthOptions';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session?.user);

  return (
    <main className="h-[90vh] relative">
      <div className="z-40 h-[31rem] overflow-hidden bg-[#884A39] text-[#F9F5F6]">
        <div className="z-40 mt-[22.4rem]">
          <h1 className="text-[10rem] font-bold">Shop with the best.</h1>
        </div>
      </div>

      <div className="z-[-2] mt-[-8.4rem] relative text-[#2D2727]">
        <h1 className="text-[10rem] font-bold">Shop with the best.</h1>
      </div>

      <div className="flex items-center justify-center bg-[#272829] w-[15rem] text-[#FFF4F4] h-[15rem] absolute bottom-0 right-0">
        <Link
          href={session?.user ? '/products' : '/api/auth/signin'}
          className="text-4xl font-bold cursor-pointer hover:text-orange-500"
        >
          SHOP NOW
        </Link>
      </div>
    </main>
  );
}
