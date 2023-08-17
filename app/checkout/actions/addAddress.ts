'use server';

import { authOptions } from '@/lib/AuthOptions';
import { prisma } from '@/prisma/db';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function addAddress(formData: FormData) {
  const session = await getServerSession(authOptions);

  const StreetAddress = String(formData.get('address'));
  const city = String(formData.get('city'));
  const state = String(formData.get('state'));
  const country = String(formData.get('country'));
  const postal = String(formData.get('postal'));

  const userId = session?.user?.id;
  await prisma.userAddress.create({
    data: {
      address: StreetAddress,
      city: city,
      state: state,
      country: country,
      zip: postal,
      userId: userId as string,
    },
  });

  console.log('Address added');
}
