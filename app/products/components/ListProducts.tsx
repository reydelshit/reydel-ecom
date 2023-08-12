import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAllProducts } from '../actions/getAllProducts';
import { AddToCart } from '../actions/addToCart';
import AddToCartBtn from './AddToCartBtn';
import { Product } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ListProducts({
  searchValue,
  products,
}: {
  searchValue: string;
  products: Product[];
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid grid-cols-4 gap-2 w-full border-2 h-full">
      {products.map((prod) => {
        return (
          <Card key={prod.id} className="w-[20rem] h-[24rem]">
            <CardHeader>
              <CardTitle>{prod.name}</CardTitle>
              <CardDescription>
                {prod.description.slice(0, 80)}...
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[50%]">
              <img
                className="w-full h-[8rem] object-contain rounded-md mb-4"
                src={prod.image}
                alt={prod.name}
              />
            </CardContent>
            <CardFooter className="flex flex-col mt-[-2rem]">
              <div className="flex justify-between items-center w-full border-2 gap-2">
                <p>₱{prod.price}</p>

                <div className="flex">
                  <Input
                    className="w-[5rem]"
                    placeholder="quantity"
                    defaultValue={quantity}
                  />
                  <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                </div>
              </div>

              <AddToCartBtn
                prodId={prod.id}
                name={prod.name}
                price={prod.price}
                image={prod.image}
                quantity={quantity}
              />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
