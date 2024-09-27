import AdminHeader from 'sc-ecommerce/components/AdminHeader';
import AdminFooter from 'sc-ecommerce/components/AdminFooter';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <AdminHeader />
        <main>{children}</main>
        <AdminFooter />
      </body>
    </html>
  );
}
