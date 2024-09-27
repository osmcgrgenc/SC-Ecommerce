import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { url, isMain } = body;

    const image = await prisma.productImage.create({
      data: {
        productId: Number(params.id),
        variationId: 1,
        url,
        isMain,
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Resim eklenirken hata oluştu:', error);
    return NextResponse.json({ error: 'Resim eklenemedi', details: error.message }, { status: 500 });
  }
}
