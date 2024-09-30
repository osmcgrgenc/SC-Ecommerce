import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Kullanıcıyı veritabanından bulma
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  // Şifre kontrolü
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // JWT oluşturma
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h',
  });

  return NextResponse.json({ token }, { status: 200 });
}
