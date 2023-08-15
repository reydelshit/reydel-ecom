'use client';

import { useEffect, useState } from 'react';
import { getProduct } from '../actions/get-products';
import { deleteProduct } from '../actions/delete-product';
import UpdateProductForm from './UpdateProductForm';
import TableContainer from './TableContainer';

import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

// const initialProducts: Product[] = [];

export default function ListProducts({ searchValue }: { searchValue: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState<Boolean>(false);
  const [productId, setProductId] = useState<number>(0);
  const [category, setCategory] = useState<string>('All');

  async function fetchProduct() {
    const products = await getProduct();
    if (products) setProducts(products);
  }

  useEffect(() => {
    fetchProduct();
  }, [products]);

  const LoadingProducts = () => {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  };

  const handleShowModal = (id: number) => {
    setShowUpdateModal(!showUpdateModal);
    setProductId(id);
  };

  const handleCategory = (event: string) => {
    const selectedValue = event;
    setCategory(selectedValue);
  };

  // console.log(searchValue);

  return (
    <div className="w-full flex justify-center p-2">
      {products.length === 0 ? (
        <LoadingProducts />
      ) : (
        <div className="flex flex-col relative w-full dark:border-[#241e1c]">
          <div className="self-end mb-4">
            <Select onValueChange={handleCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Phone">Phone</SelectItem>
                <SelectItem value="Computer">Computer</SelectItem>
                <SelectItem value="Flash Drive">Flash Drive</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableCaption>A list of product.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead className="text-center">Product Name</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center w-[10rem]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products
                .filter((prod) => {
                  const categoryFilter =
                    category === 'All' ? true : prod.category === category;
                  const searchFilter = prod.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());

                  return categoryFilter && searchFilter;
                })
                .map((prod) => (
                  <TableContainer
                    key={prod.id}
                    product={prod}
                    handleShowModal={handleShowModal}
                    deleteProduct={deleteProduct}
                  />
                ))}
            </TableBody>
          </Table>
          {showUpdateModal && (
            <UpdateProductForm
              productId={productId}
              setShowUpdateModal={setShowUpdateModal}
            />
          )}
        </div>
      )}
    </div>
  );
}
