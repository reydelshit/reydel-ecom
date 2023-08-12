'use server';

import { prisma } from '@/prisma/db';

export async function getAllProducts() {
  const getProducts = await prisma.product.findMany({
    take: 10,
  });

  return { getProducts };
}
