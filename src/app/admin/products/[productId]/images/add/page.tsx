import { useState } from 'react';

export default function AddImage({ productId }: { productId: string }) {
  const [url, setUrl] = useState('');
  const [isMain, setIsMain] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/products/${productId}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        isMain,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Resim başarıyla eklendi!');
      setUrl('');
      setIsMain(false);
    } else {
      alert('Resim eklenirken bir hata oluştu!');
      console.error(data.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Resim Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Resim URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="isMain" className="block text-sm font-medium text-gray-700">
            Ana Resim Mi?
          </label>
          <input
            type="checkbox"
            id="isMain"
            checked={isMain}
            onChange={(e) => setIsMain(e.target.checked)}
            className="mt-1"
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Resim Ekle
        </button>
      </form>
    </div>
  );
}
