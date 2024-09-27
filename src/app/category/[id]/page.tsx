import { useParams } from 'next/navigation';

export default function CategoryDetailPage() {
  const { id } = useParams();
  return <div>Ürün Listeleme - {id}</div>;
}
