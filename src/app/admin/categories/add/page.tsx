"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCategory() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      alert('Kategori başarıyla eklendi!');
      setName('');
      router.push('/admin/categories/list'); // Listeleme sayfasına yönlendirme
    } else {
      alert('Kategori eklenirken bir hata oluştu!');
    }
  };

  return (
    <div className="container">
      <h1>Kategori Ekle</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Kategori Adı</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Kategori Ekle</button>
      </form>
    </div>
  );
}
