import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { handleError } from 'sc-ecommerce/utils/errorHandler'; // Hata yönetimi fonksiyonumuzu dahil ediyoruz

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const brand = await prisma.brand.create({
      data: {
        name,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    return handleError(error);
  }
}
export async function GET() {
    try {
      const brands = await prisma.brand.findMany();
  
      return NextResponse.json(brands);
    } catch (error) {
      return handleError(error);
    }
  }
  