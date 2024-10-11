import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Sidebar.module.scss';

export default function Sidebar() {
  const router = useRouter();
  const sidebar = useRef();
  const hamburgerBtn = useRef();
  const fullscreenOvr = useRef();

  useEffect(() => {
    function handleResize() {
      // console.log('width: ', window.innerWidth);
      // console.log('height: ', window.innerHeight);
      if (window.innerWidth >= 768) {
        hamburgerBtn.current.classList.add('is_closed');
        sidebar.current.classList.add('is_closed');
        fullscreenOvr.current.classList.add('closed');
        document.body.style.overflowY = '';
      }
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const handleToggleSidebar = (e) => {
    if (hamburgerBtn.current.classList.contains('is_closed')) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }

    hamburgerBtn.current.classList.toggle('is_closed');
    sidebar.current.classList.toggle('is_closed');
    fullscreenOvr.current.classList.toggle('closed');
  };

  return (
    <>
      <div ref={sidebar} className="sidebar is_closed">
        <ul className="nav">
          <li>
            <Link href="/">
              <a className={`text_tertiary ${router.asPath === '/' ? styles.active : ''}`} onClick={handleToggleSidebar}>
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/tech">
              <a className={`text_tertiary ${router.asPath === '/tech' ? styles.active : ''}`} onClick={handleToggleSidebar}>
                Tech
              </a>
            </Link>
          </li>
          <li>
            <Link href="/lifestyle">
              <a className={`text_tertiary ${router.asPath === '/lifestyle' ? styles.active : ''}`} onClick={handleToggleSidebar}>
                Lifestyle
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div ref={hamburgerBtn} className="hamburger_menu is_closed" onClick={handleToggleSidebar}>
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      <div ref={fullscreenOvr} className="fullscreen-overlay closed" onClick={handleToggleSidebar}></div>
    </>
  )
}