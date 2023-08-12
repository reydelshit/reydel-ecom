'use client';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Page() {
  const { data: session } = useSession();

  const formatDate = (date: Date) => {
    const formattedDate = moment(date).format('MMMM DD, YYYY');
    return formattedDate;
  };
  return (
    <div className="flex flex-col items-center justify-center w-full p-2">
      <div className="pt-5 flex flex-col items-center">
        <Avatar className="w-[18rem] h-[18rem]">
          <AvatarImage src={session?.user?.image!} />
          <AvatarFallback>{session?.user?.name!}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold mt-2">{session?.user?.name}</h1>

        <div className="mt-5">
          <Card className="w-[30rem] text-center">
            <CardHeader>
              <CardTitle className="text-2xl">{session?.user?.role}</CardTitle>
              <CardDescription>{session?.user?.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{formatDate(session?.user?.createdAt!)}</p>
              <CardDescription>date joined</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-2">
        <h1 className="font-bold">My Orders</h1>
      </div>
    </div>
  );
}
