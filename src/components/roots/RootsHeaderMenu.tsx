/* =======================================
 * 熊日すぱいす ROOTS ヘッダーメニュー
 * URL: /src/components/roots/RootsHeaderMenu.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import RootsWebStoreCta from './RootsWebStoreCta';
import styles from './RootsHeaderMenu.module.scss';

type MenuItem = {
  href: string;
  en: string;
  ja: string;
};

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  items: MenuItem[];
  webStoreUrl?: string;
};

export default function RootsHeaderMenu({
  isOpen,
  onToggle,
  onClose,
  items,
  webStoreUrl,
}: Props) {
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isOpen &&
        navRef.current &&
        buttonRef.current &&
        !navRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        onClose();
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () =>
      document.removeEventListener('click', handleOutsideClick, true);
  }, [isOpen, onClose]);

  const webStoreSection = webStoreUrl ? (
    <RootsWebStoreCta url={webStoreUrl} onClick={onClose} />
  ) : null;

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        className={clsx(styles.hamburgerButton, isOpen && styles['is-open'])}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label="メニューを開閉"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <header
        className={clsx(styles.containerHeader, isOpen && styles['is-open'])}
        ref={navRef}
      >
        <nav>
          {items.map((item) => (
            <Link key={item.en} href={item.href} onClick={onClose}>
              <p className={styles.en}>{item.en}</p>
              <p className={styles.ja}>{item.ja}</p>
            </Link>
          ))}
        </nav>
        <div className={styles.boxStoreLink}>{webStoreSection}</div>
      </header>
    </>
  );
}
