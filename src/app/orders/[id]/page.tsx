
interface OrderDetailPageProps {
    params: {
      id: string;
    };
  }
  
  export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
    const { id } = params;
  
   
  
    return (
      <div>
        <h1>Sipariş Detay Sayfası</h1>
        <p>Ürün ID: {id}</p>
      </div>
    );
  }
  