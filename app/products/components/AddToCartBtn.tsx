import { Button } from '@/components/ui/button';
import { AddToCart } from '../actions/addToCart';
import { useSession } from 'next-auth/react';

export default function AddToCartBtn({
  prodId,
  name,
  price,
  image,
  quantity,
}: {
  prodId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}) {
  const handleAddToCart = (id: number) => {
    AddToCart(id, name, price, image, quantity);
    console.log(id, name, price, image, quantity);
  };

  return (
    <div className="mt-2">
      <Button
        onClick={() => handleAddToCart(prodId)}
        className="btn btn-primary"
      >
        Add to Cart
      </Button>
    </div>
  );
}
