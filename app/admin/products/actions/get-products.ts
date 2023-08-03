'use server';

import { authOptions } from '@/lib/AuthOptions';
import { prisma } from '@/prisma/db';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function getProduct() {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
  });
}
