'use client';

import { Button } from '@/components/ui/button';
import { getAllProducts } from './actions/getAllProducts';
import ListProducts from './components/ListProducts';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
}

export default function Page() {
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('All');

  async function fetchProduct() {
    const { getProducts } = await getAllProducts();
    if (getProducts) setProducts(getProducts);
  }

  useEffect(() => {
    fetchProduct();
  }, [products]);

  const ProductsVariaty = ['All', 'Computer', 'Phone', 'Flash Drive', 'More'];

  const handleCategory = (category: string) => {
    setCategory(category);
  };

  return (
    <div className="p-2">
      <div className="h-[5rem] w-full flex justify-between items-center">
        <Input
          type="text"
          placeholder="search product"
          className="h-[3rem] w-[20rem] px-2 rounded-sm"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="flex gap-4">
          {ProductsVariaty.map((prod, index) => {
            return (
              <Button onClick={() => handleCategory(prod)} key={index}>
                {prod}
              </Button>
            );
          })}
        </div>
      </div>
      <ListProducts
        category={category}
        products={products}
        searchValue={searchValue}
      />

      <div className="h-[10rem]">pagination here</div>
    </div>
  );
}
