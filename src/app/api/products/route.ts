import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, categoryId, brandId } = body;

    const productNewId = await prisma.product.count();
    const page = await prisma.page.create({
      data: {
        model: 'product',
        tableID: productNewId
      }
    })

    const product = await prisma.product.create({
      data: {
        name,
        description,
        categoryId,
        brandId,
        pageId: page.id
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: 'Ürün eklenemedi', error: error }, { status: 500 });
  }
}
export async function GET() {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
          brand: true,
          variations: true,
          images: true,
        },
      });
  
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json({ error: 'Ürünler getirilemedi' }, { status: 500 });
    }
  }