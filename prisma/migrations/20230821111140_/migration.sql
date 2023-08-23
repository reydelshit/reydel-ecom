-- AlterTable
ALTER TABLE "ordered_products" ADD COLUMN     "delivered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "orderedGroupDate" TIMESTAMP(3);
