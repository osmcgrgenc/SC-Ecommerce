import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: Number(params.id) },
    });

    if (!brand) {
      return NextResponse.json({ error: 'Marka bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    return NextResponse.json({ error: 'Marka getirilemedi' }, { status: 500 });
  }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
      const body = await request.json();
      const { name } = body;
  
      const updatedBrand = await prisma.brand.update({
        where: { id: Number(params.id) },
        data: {
          name,
        },
      });
  
      return NextResponse.json(updatedBrand);
    } catch (error) {
      return NextResponse.json({ error: 'Marka güncellenemedi' }, { status: 500 });
    }
  }
  export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
      await prisma.brand.delete({
        where: { id: Number(params.id) },
      });
  
      return NextResponse.json({ message: 'Marka başarıyla silindi' });
    } catch (error) {
      return NextResponse.json({ error: 'Marka silinemedi' }, { status: 500 });
    }
  }