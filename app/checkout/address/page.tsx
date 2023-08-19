'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { addAddress } from '../actions/addAddress';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import { getAddress } from '../actions/getAddress';

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();

  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // async function handleSubmit(formData: FormData) {

  // }

  const fetchAddress = async () => {
    const userId = session?.user?.id as string;
    const userAddress = await getAddress(userId);
    if (userAddress) {
      setStreetAddress(userAddress.address);
      setCity(userAddress.city);
      setState(userAddress.state);
      setCountry(userAddress.country);
      setPostalCode(userAddress.zip);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleSubmit = async () => {
    await addAddress({
      address: streetAddress,
      city,
      state,
      country,
      postal: postalCode,
    });
    router.push('/checkout/payment-method');

    console.log('test');
  };

  return (
    <div className="w-full flex justify-center items-center p-2 border-2">
      <form className="flex flex-col w-[100%]">
        <Label className="pb-2 text-gray-500 pl-2" htmlFor="name">
          Name:
        </Label>
        <Input
          name="name"
          className="mb-4"
          type="text"
          placeholder="John Doe"
          defaultValue={session?.user?.name as string | ''}
          disabled
        />

        <Label className="pb-2 text-gray-500 pl-2" htmlFor="address">
          Street Address:
        </Label>
        <Input
          name="address"
          className="mb-4"
          type="text"
          placeholder="1234 Main St"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <Label className="pb-2 text-gray-500 pl-2" htmlFor="city">
          City:
        </Label>
        <Input
          name="city"
          className="mb-4"
          type="text"
          placeholder="Redwood City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Label className="pb-2 text-gray-500 pl-2" htmlFor="state">
          State:
        </Label>
        <Input
          name="state"
          className="mb-4"
          type="text"
          placeholder="Washington"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Label className="pb-2 text-gray-500 pl-2" htmlFor="country">
          Country:
        </Label>
        <Input
          name="country"
          className="mb-4"
          type="text"
          placeholder="United States"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="postal">
          Postal Code
        </Label>
        <Input
          name="postal"
          className="mb-4"
          type="text"
          placeholder="9504"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <AlertDialog>
          <AlertDialogTrigger>Save</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are these information provided are correct?
              </AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col">
                <span> Street Address: {streetAddress}</span>
                <span>city: {city}</span>
                <span> state: {state}</span>
                <span>country {country}</span>
                <span>postal: {postalCode}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={handleSubmit} type="submit">
                Save and continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </div>
  );
}
