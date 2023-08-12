import { getAllProductsCart } from '@/lib/getProductCart';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { deleteCart } from '@/app/products/actions/deleteCart';

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
export function Cart() {
  const router = useRouter();

  const [cart, setCart] = useState<Cart[]>([]);

  async function fetchProduct() {
    const getProductCart = await getAllProductsCart();
    if (getProductCart) setCart(getProductCart);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const LoadingCarts = () => {
    return (
      <div className="w-full h-[5rem] flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  };

  const handleDeleteCart = (id: number) => {
    deleteCart(id);
    fetchProduct();
  };

  return (
    <div className="flex flex-col">
      {cart.length === 0 ? (
        <LoadingCarts />
      ) : (
        <>
          {cart.map((prod) => {
            return (
              <div
                className="flex flex-row justify-between items-center w-full"
                key={prod.id}
              >
                <div className="w-full flex items-center">
                  <Avatar>
                    <AvatarImage src={prod.image} />
                    <AvatarFallback>{prod.name}</AvatarFallback>
                  </Avatar>
                  <h1 className="text-xs">
                    {prod.name} ({prod.quantity} qty)
                  </h1>
                </div>

                <p className="font-bold pr-2">₱{prod.price}</p>

                <Button onClick={() => handleDeleteCart(prod.id)}>
                  Delete
                </Button>
              </div>
            );
          })}
        </>
      )}

      <div className="self-end mt-2">
        <span className="font-bold">
          Total: ₱{' '}
          {cart.reduce((total, prod) => total + prod.price * prod.quantity, 0)}
        </span>
      </div>

      <div className="self-end">
        <Button
          className="btn btn-primary"
          onClick={() => router.push('/checkout')}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
