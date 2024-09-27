import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { sku, price, stock, attributes } = body;

    const variation = await prisma.productVariation.create({
      data: {
        productId: Number(params.id),
        sku,
        price,
        stock,
        attributes,  // attributes JSON olarak saklanacak
      },
    });

    return NextResponse.json(variation);
  } catch (error) {
    console.error('Varyasyon eklenirken hata oluştu:', error);
    return NextResponse.json({ error: 'Varyasyon eklenemedi', details: error.message }, { status: 500 });
  }
}
