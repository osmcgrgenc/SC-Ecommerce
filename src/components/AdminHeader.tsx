import Link from 'next/link';
import styles from './Header.module.scss';

export default function AdminHeader() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/admin/">Anasayfa</Link>
          </li>
          <li>
            <Link href="/admin/categories">Kategoriler</Link>
          </li>
          <li>
            <Link href="/admin/brands">Markalar</Link>
          </li>
          <li>
            <Link href="/admin/products">Ürünler</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
