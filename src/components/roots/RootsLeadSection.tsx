/* =======================================
 * 熊日すぱいす ROOTS リードセクション
 * URL: /src/components/roots/RootsLeadSection.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-09
 * Last updated: 2026-05-28
 * ======================================= */
import Image from 'next/image';
import Link from 'next/link';
import RootsCommonProfile from '@/components/roots/RootsCommonProfile';
import RootsWebStoreCta from '@/components/roots/RootsWebStoreCta';
import type {
  CommonData,
  RootsTextLine,
} from '@/lib/roots/fetchRootsData';
import styles from './RootsLeadSection.module.scss';

const getLineText = (line: RootsTextLine): string =>
  typeof line === 'string' ? line : line.text;

const renderLine = (line: RootsTextLine) => {
  if (typeof line === 'string') return line;
  if (!line.ruby) return line.text;

  return (
    <ruby>
      {line.text}
      <rt>{line.ruby}</rt>
    </ruby>
  );
};

type Props = {
  heroImage: string;
  heroCatchCopy: RootsTextLine[];
  commonData: CommonData;
  showWebStore?: boolean;
  showEventAnchor?: boolean;
  eventAnchorImage?: string;
};

export default function RootsLeadSection({
  heroImage,
  heroCatchCopy,
  commonData,
  showWebStore = false,
  showEventAnchor = false,
  eventAnchorImage = '/db/roots/images/001/event.jpg',
}: Props) {
  return (
    <section className={styles.rootsLeadSection}>
      <article>
        <div className={styles.rootsHero}>
          <h1 className={styles.logoCard}>
            <Image
              src="/images/spice-logo.webp"
              alt="くまにち　すぱいす"
              width={78}
              height={33}
            />
            <span>よかモノがたり</span>
          </h1>
          <div className={styles.boxContents}>
            <div className={styles.itemImage}>
              <Image
                src={heroImage}
                alt={heroCatchCopy.map(getLineText).join(' ')}
                width={362}
                height={520}
                priority
              />
            </div>
            <p className={styles.catchCopy}>
              {heroCatchCopy.map((line, index) => (
                <span key={`${getLineText(line)}-${index}`}>{renderLine(line)}</span>
              ))}
            </p>
          </div>
        </div>
        <RootsCommonProfile
          shopName={commonData.shopName}
          position={commonData.position}
          name={commonData.name}
          nameEn={commonData.nameEn}
          pageText={commonData.pageText}
          illustration={commonData.illustration}
        />
        <div className={styles.boxStoreLink}>
          {showWebStore && commonData.onlineShopUrl ? (
            <RootsWebStoreCta url={commonData.onlineShopUrl} />
          ) : null}
          {showEventAnchor ? (
            <Link href="#event" className={styles.anchorEvent}>
              <div className={styles.itemImage}>
                <Image
                  src={eventAnchorImage}
                  alt="イベントアンカー用画像 "
                  width={70}
                  height={70}
                />
              </div>
              <p>江津店リニューアルイベント</p>
            </Link>
          ) : null}
        </div>
      </article>
    </section>
  );
}
