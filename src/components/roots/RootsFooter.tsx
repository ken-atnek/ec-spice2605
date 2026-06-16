/* =======================================
 * 熊日すぱいす ROOTS フッター
 * URL: /src/components/roots/RootsFooter.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-28
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
        <ExternalLink
          className={styles.linkSpice}
          href="https://spice.kumanichi.com/"
        >
          <Image
            src="/images/link-spice.webp"
            alt="熊日すぱいすへリンク画像"
            width={390}
            height={97}
          ></Image>
        </ExternalLink>
        <nav>
          <h3>sns</h3>
          <ExternalLink
            className={styles.snsInsta}
            href="https://www.instagram.com/kumanichi_spice/"
          >
            <svg role="img" aria-labelledby="svgTitleInsta">
              <title id="svgTitleInsta">インスタグラムアイコン</title>
              <use href="#svgSnsInsta" />
            </svg>
          </ExternalLink>
          {/* <ExternalLink className={styles.snsX} href="https://x.com/spice30">
            <svg role="img" aria-labelledby="svgTitleX">
              <title id="svgTitleX">エックスアイコン</title>
              <use href="#svgSnsX" />
            </svg>
          </ExternalLink> */}
        </nav>
      </article>
      <p className={styles.copy}>
        © 2026 KUMANICHI SPICE. All rights reserved.
      </p>
    </footer>
  );
}
