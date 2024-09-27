"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditCategory({ params }: { params: { categoryId: string } }) {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchCategory() {
      const response = await fetch(`/api/categories/${params.categoryId}`);
      const data = await response.json();
      setName(data.name);
    }

    fetchCategory();
  }, [params.categoryId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/categories/${params.categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      alert('Kategori başarıyla güncellendi!');
      router.push('/admin/categories/list'); // Listeleme sayfasına yönlendirme
    } else {
      alert('Kategori güncellenirken hata oluştu!');
    }
  };

  return (
    <div className="container">
      <h1>Kategori Düzenle</h1>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
}
