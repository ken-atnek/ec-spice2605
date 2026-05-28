/* =======================================
 * 熊日すぱいす ROOTS STORY 導線
 * URL: /src/components/roots/RootsStoryTeaser.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-28
 * ======================================= */
import Link from 'next/link';
import Image from 'next/image';
import RootsCommonProfile from './RootsCommonProfile';
import RootsWebStoreCta from './RootsWebStoreCta';
import styles from './RootsStoryTeaser.module.scss';

type Props = {
  image: string;
  storyHref: string;
  shopName: string;
  position: string;
  name: string;
  nameEn: string;
  pageText: string[];
  illustration: string;
  webStoreUrl?: string;
};

export default function RootsStoryTeaser({
  image,
  storyHref,
  shopName,
  position,
  name,
  nameEn,
  pageText,
  illustration,
  webStoreUrl,
}: Props) {
  return (
    <div className={styles.rootsStoryTeaserFrame}>
      <div className={styles.innerContents}>
        <article>
          <div className={styles.wrapArticle}>
            <div className={styles.itemH2}>
              <span>STORY</span>
              <h2>人物ストーリー</h2>
            </div>
            <Image
              src={image}
              alt="人物ストーリー"
              width={1200}
              height={700}
              className={styles.hero}
            />
            <RootsCommonProfile
              shopName={shopName}
              position={position}
              name={name}
              nameEn={nameEn}
              pageText={pageText}
              illustration={illustration}
              isInsideTeaser
            />
            <Link href={storyHref} className={styles.linkStory}>
              STORYの続きを見る
            </Link>
          </div>
        </article>
      </div>

      {webStoreUrl ? (
        <div className={styles.boxStoreLink}>
          <RootsWebStoreCta url={webStoreUrl} />{' '}
        </div>
      ) : null}
    </div>
  );
}
