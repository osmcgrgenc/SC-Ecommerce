interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;

 

  return (
    <div>
      <h1>Ürün Detay Sayfası</h1>
      <p>Ürün ID: {id}</p>
    </div>
  );
}
