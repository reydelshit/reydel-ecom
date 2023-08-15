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
        {/* {cart.length === 0 && <p className="ml-2">Loading Carts...</p>} */}
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
        <div className="flex justify-center flex-col items-center dark:border-[#241e1c]">
          <LoadingCarts />
          <p className="ml-2">Cart is empty or Loading Cart...</p>
        </div>
      ) : (
        <>
          {cart.map((prod) => {
            return (
              <div className="flex items-center mb-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={prod.image} alt="Avatar" />
                  <AvatarFallback>{prod.name}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {prod.name} ({prod.quantity} qty)
                  </p>
                </div>
                <div className="ml-auto font-bold mr-2 ">₱ {prod.price}</div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            );
          })}
        </>
      )}

      <div className="self-end my-2">
        <span className="font-bold ">
          Total: ₱
          {cart.reduce((total, prod) => total + prod.price * prod.quantity, 0)}
        </span>
      </div>

      <div className="self-end">
        <Button
          className="btn btn-primary"
          onClick={() => router.push('/checkout/address')}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
