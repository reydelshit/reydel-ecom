'use server';

import { authOptions } from '@/lib/AuthOptions';
import { prisma } from '@/prisma/db';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function getAddress(userId: string) {
  // const session = await getServerSession(authOptions);

  return await prisma.userAddress.findFirst({
    where: {
      userId: userId,
    },
  });
}
