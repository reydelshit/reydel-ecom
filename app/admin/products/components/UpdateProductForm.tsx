'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { getProductForUpdate } from '../actions/get-product-update';
import { useEffect, useState } from 'react';
import { updateProduct } from '../actions/update-product';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function UpdateProductForm({
  productId,
  setShowUpdateModal,
}: {
  productId: number;
  setShowUpdateModal: any;
}) {
  const [productName, setProductName] = useState('');
  const [description, setProductDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  async function getProductForUpdateFunction() {
    const product = await getProductForUpdate(productId);

    if (product) {
      setProductName(product.name);
      setProductDescription(product.description);
      setCategory(product.category);
      setImage(product.image);
      const convertedPrice = product.price.toString();
      setPrice(convertedPrice);
    }
  }

  useEffect(() => {
    getProductForUpdateFunction();
  }, [productId]);

  const handleUpdateSubmit = (e: any) => {
    e.preventDefault();
    console.log('ndjabdjhbajd');
    updateProduct({
      id: productId,
      name: productName,
      category,
      description,
      price: parseInt(price),
      image,
    });

    // console.log(productId);
    setShowUpdateModal(false);
  };

  return (
    <div className="absolute w-full h-screen flex justify-center border-2 p-2 bg-white">
      <form className="flex flex-col w-[40%] h-full mt-[5rem]">
        <Input
          defaultValue={productName}
          name="product"
          className="mb-4"
          type="text"
          placeholder="Product Name"
          onChange={(e) => setProductName(e.target.value)}
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. Iphone 13
        </Label>

        <div className="mb-4">
          <Select value={category} required name="category">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Phone">Phone</SelectItem>
              <SelectItem value="Computer">Computer</SelectItem>
              <SelectItem value="Flash Drive">Flash Drive</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
            Ex. Phone
          </Label>
        </div>

        <Input
          defaultValue={description}
          name="description"
          className="mb-4"
          type="text"
          placeholder="Description"
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. Very cool iphone
        </Label>
        <Input
          defaultValue={price}
          name="price"
          className="mb-4"
          type="text"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. $99
        </Label>
        <Input
          defaultValue={image}
          name="image"
          className="mb-4"
          type="text"
          placeholder="Image url"
          onChange={(e) => setImage(e.target.value)}
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. https://yourimagelink.com
        </Label>
        <Button
          className="w-[50%] self-center mt-5"
          onClick={handleUpdateSubmit}
        >
          Update
        </Button>
        <Button
          className="w-[50%] self-center bg-red-500 mt-2"
          onClick={() => setShowUpdateModal(false)}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}
