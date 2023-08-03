'use server';

import { prisma } from '@/prisma/db';

export async function getProductForUpdate(productId: number) {
  return await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
}
