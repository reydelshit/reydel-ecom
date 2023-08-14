'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { usePathname, useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    // await addProduct(formData);
    console.log(formData);
    router.push('/checkout/payment-method');

    // console.log('test');
  }

  return (
    <div className="w-full flex flex-col justify-center items-center p-2 border-2">
      <h1>order summary</h1>

      <p>address</p>

      <p>checkout items </p>
    </div>
  );
}
