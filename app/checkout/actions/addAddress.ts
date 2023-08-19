'use server';

import { authOptions } from '@/lib/AuthOptions';
import { prisma } from '@/prisma/db';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function addAddress({
  address,
  city,
  state,
  country,
  postal,
}: {
  address: string;
  city: string;
  state: string;
  country: string;
  postal: string;
}) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  await prisma.userAddress.create({
    data: {
      address: address,
      city: city,
      state: state,
      country: country,
      zip: postal,
      userId: userId as string,
    },
  });

  console.log('Address added');
}
