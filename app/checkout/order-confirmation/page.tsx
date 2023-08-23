'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { usePathname, useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllProductsCart } from '@/lib/getProductCart';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAddress } from '../actions/getAddress';
import { useSession } from 'next-auth/react';
import { confirmedOrder } from '../actions/confirmOrder';

interface Cart {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  userId?: string | null;
}

interface UserAddress {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  userId?: string | null;
}

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();

  const [cart, setCart] = useState<Cart[]>([]);
  const [address, setAddress] = useState<UserAddress[]>([]);

  async function fetchOrderedProduct() {
    const getProductCart = await getAllProductsCart();
    if (getProductCart) setCart(getProductCart);
  }

  const fetchAddress = async () => {
    const userId = session?.user?.id as string;
    const addressData = await getAddress(userId);
    if (addressData) {
      setAddress([addressData]);
    }
  };

  const handleConfirmedOrders = async (cart: any) => {
    for (const prod of cart) {
      await confirmedOrder({
        cartId: prod.id,
        name: prod.name,
        quantity: prod.quantity,
        image: prod.image,
        price: prod.price,
      });
    }
  };

  useEffect(() => {
    fetchAddress();
    fetchOrderedProduct();
  }, [cart]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-2 border-2">
      <div className="w-full h-[30rem] flex justify-around flex-col">
        <h1 className="font-semibold">Orders</h1>

        <Table className="w-full border-2 h-full">
          <TableHeader className="w-full">
            <TableRow className="w-full">
              <TableHead>Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full border-2">
            {cart.map((prod, index) => {
              return (
                <TableRow key={index}>
                  <Avatar>
                    <AvatarImage src={prod.image} />
                    <AvatarFallback>{prod.name}</AvatarFallback>
                  </Avatar>
                  <TableCell>
                    {prod.name} ({prod.quantity} qty)
                  </TableCell>
                  <TableCell className="text-right">{prod.price}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex justify-end my-2">
          <span className="font-bold ">
            Total: ₱
            {cart.reduce(
              (total, prod) => total + prod.price * prod.quantity,
              0,
            )}
          </span>
        </div>

        <div>
          <h1>Address</h1>

          <div>
            {address.map((add, index) => {
              return (
                <div key={index} className="flex font-semibold p-2">
                  <p>{add.address}, </p>
                  <p>{add.city}, </p>
                  <p>{add.state}, </p>
                  <p>{add.country}, </p>
                  <p>{add.zip}</p>
                </div>
              );
            })}
          </div>
        </div>

        <Button className="mt-8" onClick={() => handleConfirmedOrders(cart)}>
          Confirm Order
        </Button>
      </div>
    </div>
  );
}
