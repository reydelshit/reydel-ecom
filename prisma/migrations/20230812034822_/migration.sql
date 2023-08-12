/*
  Warnings:

  - Added the required column `image` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
