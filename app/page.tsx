import { authOptions } from '@/lib/AuthOptions';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session?.user);

  return (
    <main className="h-[90vh] relative pl-2">
      <div className="z-40 h-[31rem] overflow-hidden ">
        <div className="z-40 mt-[22.4rem]">
          <h1 className="text-[10rem] font-bold">Shop with the best.</h1>
        </div>
      </div>

      <div className="z-[-2] mt-[-8.4rem] relative text-[#f97316]">
        <h1 className="text-[10rem] font-bold">Shop with the best.</h1>
      </div>
    </main>
  );
}
