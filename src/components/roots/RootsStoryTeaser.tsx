/* =======================================
 * 熊日すぱいす ROOTS STORY 導線
 * URL: /src/components/roots/RootsStoryTeaser.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import Link from "next/link";
import Image from "next/image";
import RootsCommonProfile from "./RootsCommonProfile";
import styles from "./RootsStoryTeaser.module.scss";

type Props = {
  image: string;
  storyHref: string;
  shopName: string;
  position: string;
  name: string;
  nameEn: string;
  pageText: string[];
  illustration: string;
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
}: Props) {
  return (
    <section className={styles.rootsStoryTeaser}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.titleEn}>STORY</p>
          <hr className={styles.rule} />
          <p className={styles.titleJa}>人物ストーリー</p>
        </header>

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
        />

        <p className={styles.dot}>・<br />・<br />・<br />・<br />・</p>

        <div className={styles.buttonWrap}>
          <Link href={storyHref} className={styles.button}>
            STORYの続きを見る
          </Link>
        </div>
      </div>
    </section>
  );
}
