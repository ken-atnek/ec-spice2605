/* =======================================
 * 熊日すぱいす ROOTS フッター
 * URL: /src/components/roots/RootsFooter.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import styles from "./RootsFooter.module.scss";
export default function RootsFooter() {
  return (
    <footer className={styles.root}>
      <div className={styles.top}>
        <p className={styles.logo}>SPICE</p>
        <div className={styles.line} />
        <div className={styles.sns}>
          <a className={styles.iconLink} href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" className={styles.icon} fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="6" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
          <a className={styles.iconLink} href="#" aria-label="X">
            <svg viewBox="0 0 24 24" className={styles.icon} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.9 3H22l-6.8 7.8L23 21h-6.1l-4.8-6.3L6.7 21H3.6l7.3-8.4L1 3h6.2l4.3 5.7L18.9 3z"/>
            </svg>
          </a>
        </div>
      </div>

      <p className={styles.copy}>© 2026 KUMANICHI SPICES. All rights reserved.</p>
    </footer>
  );
}
