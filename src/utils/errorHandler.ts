import { NextResponse } from 'next/server';

export function handleError(error: any, message: string = 'An error occurred') {
  console.error(error); // Konsola hata loglama

  return NextResponse.json(
    {
      error: true,
      message: message,  // İstediğiniz özel mesajı kullanabilirsiniz
      details: error.message || error, // Hatanın detaylarını döndürüyoruz
    },
    { status: 500 }
  );
}
