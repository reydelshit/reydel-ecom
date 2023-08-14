'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// fill address if wala pa
// > proceed to payment
// > payment method
// > place order
// > order summary
// > order confirmation

import HeaderCheckout from './components/HeaderCheckout';

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

const CheckoutLayout = async ({ children }: CheckoutLayoutProps) => {
  const headerLinks = [
    {
      name: 'Address',
      link: '/checkout/address',
    },
    {
      name: 'Payment Method',
      link: '/checkout/payment-method',
    },
    {
      name: 'Order Confirmation',
      link: '/checkout/order-confirmation',
    },
  ];

  return (
    <div className="flex p-5 w-full h-full justify-center border-2">
      <div className="w-[35%] h-[40rem] border-2 p-2 bg-white flex flex-col justify-center border-orange-400">
        <HeaderCheckout links={headerLinks} />

        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
