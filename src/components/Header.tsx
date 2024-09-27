import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Anasayfa</Link>
          </li>
          <li>
            <Link href="/categories">Kategoriler</Link>
          </li>
          <li>
            <Link href="/brands">Markalar</Link>
          </li>
          <li>
            <Link href="/cart">Sepet</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
