'use client';

import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductForm from './components/ProductForm';
import ListProducts from './components/ListProducts';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="w-full">
      <Tabs defaultValue="product">
        <div className="flex justify-between items-center w-full p-2 h-20">
          <TabsList className="w-[400px] h-[3rem]">
            <TabsTrigger value="product">Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Products</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Input
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="search product"
              className="w-[20rem]"
            />
            <Button variant="outline">Search</Button>
          </div>
        </div>

        <Separator />

        <TabsContent value="product">
          <ListProducts searchValue={searchValue} />
        </TabsContent>
        <TabsContent value="add-product">
          <ProductForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
