'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// fill address if wala pa
// > proceed to payment
// > payment method
// > place order
// > order summary
// > order confirmation

import Address from './components/Address';

export default function Page() {
  return (
    <div className="flex p-5 w-full h-full justify-center border-2">
      <div className="h-[40rem] w-[40%] border-2 p-2 bg-white flex">
        <Tabs defaultValue="address">
          <TabsList>
            <TabsTrigger value="address">Fill Address</TabsTrigger>
            <TabsTrigger value="method">Payment Method</TabsTrigger>
            <TabsTrigger value="summary">Order Summary</TabsTrigger>
            <TabsTrigger value="comfirmation">Order Confirmation</TabsTrigger>
            <TabsTrigger value="Payment Method">Payment Method</TabsTrigger>
          </TabsList>
          <TabsContent
            className="border-2 border-orange-500 w-full self-center flex"
            value="address"
          >
            <Address />
          </TabsContent>
          <TabsContent value="method">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
