'use server';

import { authOptions } from '@/lib/AuthOptions';
import { prisma } from '@/prisma/db';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// type ProductCreateInput = {
//   name: string;
//   category: string;
//   price: number;
//   image: string;
//   userId: string | undefined;
// };

export async function addProduct(formData: FormData) {
  const session = await getServerSession(authOptions);

  const product = String(formData.get('product'));
  const category = String(formData.get('category'));
  const price = String(formData.get('price'));
  const image = String(formData.get('image'));
  const description = String(formData.get('description'));

  const userId = session?.user?.id;
  await prisma.product.create({
    data: {
      name: product,
      description: description,
      category: category,
      price: parseFloat(price),
      image: image,
      userId: userId as string,
    },
  });

  redirect('/admin/products');
}
