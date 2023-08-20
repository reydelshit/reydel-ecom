'use server';

import { authOptions } from '@/lib/AuthOptions';
import { prisma } from '@/prisma/db';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function confirmedOrder({
  productId,
  name,
  quantity,
  image,
  price,
}: {
  productId: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
}) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  await prisma.orderedProducts.create({
    data: {
      productId,
      name,
      quantity,
      price,
      image,
      userId,
    },
  });

  console.log('order added');
}
