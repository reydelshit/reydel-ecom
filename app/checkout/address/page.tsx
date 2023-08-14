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
    <div className="w-full flex justify-center items-center p-2 border-2">
      <form className="flex flex-col w-[100%]" action={handleSubmit}>
        <Label className="pb-2 text-gray-500 pl-2" htmlFor="product">
          Name:
        </Label>
        <Input
          name="product"
          className="mb-4"
          type="text"
          placeholder="John Doe"
        />

        <Label className="pb-2 text-gray-500 pl-2" htmlFor="product">
          Barangay:
        </Label>
        <Input
          name="description"
          className="mb-4"
          type="text"
          placeholder="1234 Main St"
        />
        <Label className="pb-2 text-gray-500 pl-2" htmlFor="product">
          Municipality:
        </Label>
        <Input
          name="description"
          className="mb-4"
          type="text"
          placeholder="Polomolok"
        />
        <Label className="pb-2 text-gray-500 pl-2" htmlFor="product">
          Province
        </Label>
        <Input
          name="price"
          className="mb-4"
          type="text"
          placeholder="South Cotabato"
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Postal Code
        </Label>
        <Input name="image" className="mb-4" type="text" placeholder="9504" />
        <Button className="w-[50%] mt-5 self-center">Save and continue</Button>
      </form>
    </div>
  );
}
