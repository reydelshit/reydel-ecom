import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

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

interface TableProps {
  product: Product;
  deleteProduct: (productId: number) => Promise<Product>;
  handleShowModal: (id: number) => void;
}

export default function TableContainer({
  product,
  deleteProduct,
  handleShowModal,
}: TableProps) {
  return (
    <TableRow key={product.id}>
      <TableCell className="font-medium">{product.id}</TableCell>
      <TableCell className="font-medium">
        <img
          className="w-full h-[8rem] object-contain rounded-md mb-4"
          src={product.image}
          alt={product.name}
        />
      </TableCell>
      <TableCell className="text-center">{product.name}</TableCell>
      <TableCell className="text-center">{product.category}</TableCell>

      <TableCell className="text-center">{product.description}</TableCell>
      <TableCell className="text-right font-bold w-[10rem]">
        ₱ {product.price}
      </TableCell>
      <TableCell>
        <div className="flex justify-end items-end gap-2 w-full">
          <Button onClick={() => deleteProduct(product.id)}>Delete</Button>

          <Button onClick={() => handleShowModal(product.id)}>Update</Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
