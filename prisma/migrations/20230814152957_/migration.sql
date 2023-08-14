-- CreateTable
CREATE TABLE "ordered_products" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "ordered_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
