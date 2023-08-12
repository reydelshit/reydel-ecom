'use server';

import { authOptions } from '@/lib/AuthOptions';
import { prisma } from '@/prisma/db';
import { getServerSession } from 'next-auth';

export async function AddToCart(
  id: number,
  name: string,
  price: number,
  image: string,
  quantity: number,
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const getProducts = await prisma.cart.create({
    data: {
      productId: id,
      name: name,
      price: price,
      image: image,
      quantity: quantity,
      userId: userId as string,
    },
  });
  return getProducts;
}
