"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'sc-ecommerce/styles/table.scss'; // Tablonun stil dosyasını ekleyin

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Kategoriler getirilirken hata oluştu:', error);
      }
    }

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId: number) => {
    const confirmDelete = confirm('Bu kategoriyi silmek istediğinize emin misiniz?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCategories(categories.filter((category: any) => category.id !== categoryId));
        alert('Kategori başarıyla silindi!');
      } else {
        alert('Kategori silinirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Kategori silinirken hata oluştu:', error);
    }
  };

  const handleEdit = (categoryId: number) => {
    router.push(`/admin/categories/edit/${categoryId}`);
  };

  return (
    <div className="container">
      <h1>Kategori Listesi</h1>
      <table>
        <thead>
          <tr>
            <th>Kategori Adı</th>
            <th>İşlemler</th> {/* İşlem sütunu */}
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category: any) => (
              <tr key={category.id}>
                <td data-label="Kategori Adı">{category.name}</td>
                <td data-label="İşlemler">
                  <button onClick={() => handleEdit(category.id)} className="edit-btn">
                    Düzenle
                  </button>
                  <button onClick={() => handleDelete(category.id)} className="delete-btn">
                    Sil
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>Hiç kategori bulunamadı.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
