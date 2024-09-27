import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Kategoriyi oluştur
    const category = await prisma.category.create({
      data: {
        name: body.name,
      },
    });

    // 2. Kategori ID'si ile Page oluştur
    const page = await prisma.page.create({
      data: {
        model: 'Category', // Page model ismi
        tableID: category.id, // Kategorinin ID'si tableID olarak atanıyor
        Category: { connect: { id: category.id } }, // Page, Category ile ilişkilendiriliyor
      },
    });

    // 3. Kategoriye oluşturulan Page'i bağla
    await prisma.category.update({
      where: { id: category.id },
      data: {
        pageId: page.id, // Kategoriye pageId olarak yeni oluşturulan pageId'yi bağla
      },
    });

    return NextResponse.json({ category, page });
  } catch (error) {
    return NextResponse.json({ error: 'Category creation error' }, { status: 500 });
  }
}
export async function GET() {
    try {
      const categories = await prisma.category.findMany();
  
      return NextResponse.json(categories);
    } catch (error) {
      return NextResponse.json({ error: 'Kategoriler getirilemedi' }, { status: 500 });
    }
  }
  