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
import { set } from 'zod';

export default function ListProducts({
  searchValue,
  products,
  category,
}: {
  searchValue: string;
  products: Product[];
  category: string;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid grid-cols-5 gap-2 w-full h-full p-2 bg-inherit">
      {products
        .filter((prod) => {
          const categoryFilter =
            category === 'All' ? true : prod.category === category;
          const searchFilter = prod.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());

          return categoryFilter && searchFilter;
        })
        .map((prod, index) => {
          return (
            <Card
              key={prod.id}
              className="w-[20rem] h-[26rem] dark:border-[#241e1c]"
            >
              <CardHeader>
                <CardTitle>{prod.name}</CardTitle>
                <CardDescription>
                  {prod.description.slice(0, 80)}...
                </CardDescription>
                <span>{prod.category}</span>
              </CardHeader>
              <CardContent className="h-[40%]">
                <img
                  className="w-full h-[8rem] object-contain rounded-md mb-4"
                  src={prod.image}
                  alt={prod.name}
                />
              </CardContent>
              <CardFooter className="flex flex-col mt-[-2rem]">
                <div className="flex justify-between items-center w-full">
                  <p>₱{prod.price}</p>

                  <Input
                    type="number"
                    placeholder="quantity"
                    className=" w-[4rem] text-center h-[3rem]"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
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
