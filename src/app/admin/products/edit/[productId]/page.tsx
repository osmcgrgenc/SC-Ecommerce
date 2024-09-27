"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProduct({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Ürünün mevcut verilerini getirme
    async function fetchProduct() {
      const response = await fetch(`/api/products/${params.productId}`);
      const data = await response.json();
      setProduct(data);
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setCategoryId(data.categoryId);
      setBrandId(data.brandId);
    }

    fetchProduct();
  }, [params.productId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/products/${params.productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        description,
        categoryId: parseInt(categoryId),
        brandId: parseInt(brandId),
      }),
    });

    if (response.ok) {
      alert('Ürün başarıyla güncellendi!');
      router.push('/admin/products/list');
    } else {
      alert('Ürün güncellenirken hata oluştu!');
    }
  };

  return (
    <div>
      <h1>Ürün Düzenle</h1>
      {product && (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="name">Ürün Adı</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="price">Fiyat</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Açıklama</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit">Güncelle</button>
        </form>
      )}
    </div>
  );
}
