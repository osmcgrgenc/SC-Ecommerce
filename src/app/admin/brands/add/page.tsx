import { GetServerSideProps } from 'next';
import { useState } from 'react';

export default function AddBrand() {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/brands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Marka başarıyla eklendi!');
      setName('');
    } else {
      alert('Marka eklenirken bir hata oluştu!');
      console.error(data.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Marka Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Marka Adı
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Marka Ekle
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // SSR ile ek veri alınabilir
  return {
    props: {},
  };
};
