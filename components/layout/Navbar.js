import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Navbar.module.scss';

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a className={styles.link}>TOKO ONLEN</a>
        </Link>
      </div>
      <div className={styles.menuIcon} onClick={toggleMenu}>
      </div>
      <ul className={`${styles.nav} ${menuOpen ? styles.active : ''}`}>
        <li>
          <Link href="/">
            <a className={`${styles.link} ${router.asPath === '/' ? styles.linkActive : ''}`}>
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/tech">
            <a className={`${styles.link} ${router.asPath === '/tech' ? styles.linkActive : ''}`}>
              Tech
            </a>
          </Link>
        </li>
        <li>
          <Link href="/lifestyle">
            <a className={`${styles.link} ${router.asPath === '/lifestyle' ? styles.linkActive : ''}`}>
              Lifestyle
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
}
