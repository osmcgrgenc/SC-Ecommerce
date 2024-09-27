import './globals.scss'; // Genel stilleri buraya ekliyoruz
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
