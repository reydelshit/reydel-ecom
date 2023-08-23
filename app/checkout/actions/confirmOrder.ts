'use server';

import { authOptions } from '@/lib/AuthOptions';
import { prisma } from '@/prisma/db';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function confirmedOrder({
  cartId,
  name,
  quantity,
  image,
  price,
}: {
  cartId: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
}) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  await prisma.orderedProducts.create({
    data: {
      cartId,
      name,
      quantity,
      price,
      image,
      userId,
      orderedGroupDate: new Date(),
    },
  });

  await prisma.cart.updateMany({
    where: {
      userId: userId,
    },
    data: {
      ordered: true,
    },
  });

  console.log('order added');
}
