'use client';

import { getAllProducts } from './actions/getAllProducts';
import ListProducts from './components/ListProducts';
import { useEffect, useState } from 'react';

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

  async function fetchProduct() {
    const { getProducts } = await getAllProducts();
    if (getProducts) setProducts(getProducts);
  }

  useEffect(() => {
    fetchProduct();
  }, [products]);

  return (
    <div className="p-2">
      <ListProducts products={products} searchValue={searchValue} />
    </div>
  );
}
