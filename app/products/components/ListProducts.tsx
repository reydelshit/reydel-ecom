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
  const [quantities, setQuantities] = useState([{ value: 1 }]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = { value };
    setQuantities(newQuantities);
  };

  const incrementQuantity = (index: number) => {
    const newQuantities = [...quantities];
    newQuantities[index].value += 1;
    setQuantities(newQuantities);
    setQuantity(newQuantities[index].value);
  };

  return (
    <div className="grid grid-cols-4 gap-2 w-full border-2 h-full">
      {products.map((prod, index) => {
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
                  {quantities.map((quantity, index) => (
                    <div key={index}>
                      <Input
                        className="w-[5rem]"
                        placeholder="quantity"
                        value={quantity.value}
                        onChange={(e) =>
                          handleQuantityChange(index, Number(e.target.value))
                        }
                      />
                      <Button onClick={() => incrementQuantity(index)}>
                        +
                      </Button>
                    </div>
                  ))}
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
