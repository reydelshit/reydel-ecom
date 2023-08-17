import { prisma } from '@/prisma/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const cursor = +(searchParams.get('cursor') ?? 0);
  const pageSize = +(searchParams.get('pagesize') ?? 10);

  const products = await prisma.product.findMany({
    cursor: {
      id: cursor,
    },
    take: pageSize,
  });

  return new Response(JSON.stringify(products));
}
