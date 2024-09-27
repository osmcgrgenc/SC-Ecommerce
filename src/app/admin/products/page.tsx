"use client";

import { useState, useEffect } from 'react';
import 'sc-ecommerce/styles/table.scss'; // Tablonun stil dosyasını ekleyin
import { useRouter } from 'next/navigation'; // Sayfa yönlendirme için

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Ürün verilerini API'den getirme
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Ürünler getirilirken hata oluştu:', error);
      }
    }

    fetchProducts();
  }, []);

  // Ürün Silme Fonksiyonu
  const handleDelete = async (productId: number) => {
    const confirmDelete = confirm('Bu ürünü silmek istediğinize emin misiniz?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Ürün başarılı bir şekilde silindiğinde tabloyu güncelle
        setProducts(products.filter((product: any) => product.id !== productId));
        alert('Ürün başarıyla silindi!');
      } else {
        alert('Ürün silinirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Ürün silinirken hata oluştu:', error);
    }
  };

  // Ürün Düzenleme Fonksiyonu (Yönlendirme)
  const handleEdit = (productId: number) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  return (
    <div className="container">
      <h1>Ürün Listesi</h1>
      <table>
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Fiyat</th>
            <th>Kategori</th>
            <th>Marka</th>
            <th>Açıklama</th>
            <th>İşlemler</th> {/* Yeni sütun */}
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product: any) => (
              <tr key={product.id}>
                <td data-label="Ürün Adı">{product.name}</td>
                <td data-label="Fiyat">{product.price} ₺</td>
                <td data-label="Kategori">{product.category.name}</td>
                <td data-label="Marka">{product.brand.name}</td>
                <td data-label="Açıklama">{product.description}</td>
                <td data-label="İşlemler">
                  <button onClick={() => handleEdit(product.id)} className="edit-btn">
                    Düzenle
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="delete-btn">
                    Sil
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Hiç ürün bulunamadı.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
