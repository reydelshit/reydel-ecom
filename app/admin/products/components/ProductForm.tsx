'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { addProduct } from '../actions/add-product';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProductForm() {
  async function handleSubmit(formData: FormData) {
    await addProduct(formData);
  }

  return (
    <div className="w-full flex justify-center p-2">
      <form className="flex flex-col w-[40%] mt-[5rem]" action={handleSubmit}>
        <Input
          name="product"
          className="mb-4"
          type="text"
          placeholder="Product Name"
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. Iphone 13
        </Label>

        <div className="mb-4 ">
          <Select required name="category">
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
        </div>

        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. Phone
        </Label>
        <Input
          name="description"
          className="mb-4"
          type="text"
          placeholder="Description"
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. Very cool iphone
        </Label>
        <Input name="price" className="mb-4" type="text" placeholder="Price" />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. $99
        </Label>
        <Input
          name="image"
          className="mb-4"
          type="text"
          placeholder="Image url"
        />
        <Label className="pb-4 text-gray-500 pl-2" htmlFor="product">
          Ex. https://yourimagelink.com
        </Label>
        <Button className="w-[50%] self-center">Add Product</Button>
      </form>
    </div>
  );
}
