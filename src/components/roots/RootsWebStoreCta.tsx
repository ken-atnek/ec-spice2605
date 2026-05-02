/* =======================================
 * 熊日すぱいす ROOTS WEB STORE CTA
 * URL: /src/components/roots/RootsWebStoreCta.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import styles from "./RootsWebStoreCta.module.scss";

type Props = {
  url: string;
};

export default function RootsWebStoreCta({ url }: Props) {
  return (
    <section className={styles.root}>
      <a href={url} className={styles.link} target="_blank" rel="noopener noreferrer">
        <div>
          <p className={styles.lead}>ご購入はこちら</p>
          <p className={styles.title}>WEB STORE</p>
        </div>

        <span className={styles.iconWrap} aria-hidden="true">
          <svg viewBox="0 0 64 64" className={styles.icon} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10h8l6 30h26l6-22H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="25" cy="52" r="3.5" fill="currentColor"/>
            <circle cx="46" cy="52" r="3.5" fill="currentColor"/>
          </svg>
        </span>
      </a>
    </section>
  );
}
