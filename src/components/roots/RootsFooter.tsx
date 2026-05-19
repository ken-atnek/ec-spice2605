/* =======================================
 * 熊日すぱいす ROOTS フッター
 * URL: /src/components/roots/RootsFooter.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-05
 * ======================================= */
import ExternalLink from '@/components/common/ExternalLink';
import styles from './RootsFooter.module.scss';
import Image from 'next/image';
export default function RootsFooter() {
  return (
    <footer className={styles.rootsFooter}>
      <article>
        <div className={styles.itemLogo}>
          <Image
            src="/images/spice-logo.webp"
            alt="くまにち　すぱいす"
            width={78}
            height={33}
          />
        </div>
        <nav>
          <ExternalLink className={styles.snsInsta}>
            <svg role="img" aria-labelledby="svgTitleInsta">
              <title id="svgTitleInsta">インスタグラムアイコン</title>
              <use href="#svgSnsInsta" />
            </svg>
          </ExternalLink>
          <ExternalLink className={styles.snsX}>
            <svg role="img" aria-labelledby="svgTitleX">
              <title id="svgTitleX">エックスアイコン</title>
              <use href="#svgSnsX" />
            </svg>
          </ExternalLink>
        </nav>
      </article>
      <p className={styles.copy}>
        © 2026 KUMANICHI SPICE. All rights reserved.
      </p>
    </footer>
  );
}
