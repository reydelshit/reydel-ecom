'use server';

import { prisma } from '@/prisma/db';

export async function deleteCart(cartId: number) {
  return await prisma.cart.delete({
    where: {
      id: cartId,
    },
  });
}
