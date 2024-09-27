import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { id: string, variationId: string } }) {
  try {
    const body = await request.json();
    const { url, isMain } = body;

    const image = await prisma.productImage.create({
      data: {
        productId: Number(params.id),
        variationId: Number(params.variationId),
        url,
        isMain,
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Varyasyona resim eklenirken hata oluştu:', error);
    return NextResponse.json({ error: 'Varyasyona resim eklenemedi', details: error.message }, { status: 500 });
  }
}
