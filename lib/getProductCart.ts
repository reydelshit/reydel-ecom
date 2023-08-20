'use server';

import { authOptions } from '@/lib/AuthOptions';
import { prisma } from '@/prisma/db';
import { getServerSession } from 'next-auth';

export async function getAllProductsCart() {
  const session = await getServerSession(authOptions);
  const userId = String(session?.user?.id);

  const getProductCart = await prisma.cart.findMany({
    where: {
      userId: String(userId),
      ordered: false,
    },
  });

  return getProductCart;
}
