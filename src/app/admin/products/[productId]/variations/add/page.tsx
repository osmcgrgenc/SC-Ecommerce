import { useState } from 'react';

export default function AddVariation({ productId }: { productId: string }) {
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [attributes, setAttributes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/products/${productId}/variations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sku,
        price: parseFloat(price),
        stock: parseInt(stock),
        attributes: JSON.parse(attributes), // attributes JSON formatında olmalı
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Varyasyon başarıyla eklendi!');
      setSku('');
      setPrice('');
      setStock('');
      setAttributes('');
    } else {
      alert('Varyasyon eklenirken bir hata oluştu!');
      console.error(data.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Varyasyon Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
            Stok Kodu (SKU)
          </label>
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Fiyat
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stok Miktarı
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="attributes" className="block text-sm font-medium text-gray-700">
            Özellikler (JSON formatında)
          </label>
          <textarea
            id="attributes"
            value={attributes}
            onChange={(e) => setAttributes(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Varyasyon Ekle
        </button>
      </form>
    </div>
  );
}
