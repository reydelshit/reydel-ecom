/*
  Warnings:

  - You are about to drop the column `productId` on the `ordered_products` table. All the data in the column will be lost.
  - Added the required column `cartId` to the `ordered_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ordered_products" DROP COLUMN "productId",
ADD COLUMN     "cartId" INTEGER NOT NULL;
