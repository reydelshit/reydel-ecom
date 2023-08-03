'use server';

import { prisma } from '@/prisma/db';

export async function updateProduct({
  id,
  name,
  category,
  description,
  price,
  image,
}: {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}) {
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name,
      category,
      description,
      price,
      image,
    },
  });
  return product;
}
