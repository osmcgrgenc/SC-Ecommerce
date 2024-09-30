import AdminSidebar from "sc-ecommerce/components/AdminSidebar";
import 'sc-ecommerce/styles/admin.scss';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Panel</title>
      </head>
      <body>
        <AdminSidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
