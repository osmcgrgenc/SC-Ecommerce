import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(params.id) },
    });

    if (!category) {
      return NextResponse.json({ error: 'Kategori bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Kategori getirilemedi' }, { status: 500 });
  }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
      const body = await request.json();
      const { name } = body;
  
      const updatedCategory = await prisma.category.update({
        where: { id: Number(params.id) },
        data: {
          name,
        },
      });
  
      return NextResponse.json(updatedCategory);
    } catch (error) {
      return NextResponse.json({ error: 'Kategori güncellenemedi' }, { status: 500 });
    }
  }
  export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
      await prisma.category.delete({
        where: { id: Number(params.id) },
      });
  
      return NextResponse.json({ message: 'Kategori başarıyla silindi' });
    } catch (error) {
      return NextResponse.json({ error: 'Kategori silinemedi' }, { status: 500 });
    }
  }