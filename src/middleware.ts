import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key';

export async function middleware(req) {
  const token = req.cookies.get('token') || '';

  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next();
  } catch (error) {
    // Absolute URL kullanımı
    const loginUrl = new URL('/login', req.url); // Mutlak URL oluşturuluyor
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/admin/:path*'], // Admin sayfaları için middleware uygulanacak
};
