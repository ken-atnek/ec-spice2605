/* =======================================
 * 熊日すぱいす ROOTS Hero
 * URL: /src/components/roots/RootsHero.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-01
 * Last updated: 2026-05-01
 * ======================================= */
import styles from "./RootsHero.module.scss";
import Image from "next/image";

type Props = {
  image: string;
  catchCopy: string;
};

export default function RootsHero({ image, catchCopy }: Props) {
  return (
    <section className={styles.rootsHero}>
      <h1 className={styles.logoCard}>
        <Image
          src="/images/spice-logo.webp"
          alt="くまにち　すぱいす"
          width={78}
          height={33}
        />
        <p>よかモノがたり</p>
      </h1>
      <div className={styles.boxContents}>
        <Image src={image} alt="" fill className={styles.heroImage} />
        <p className={styles.catchCopy}>{catchCopy}</p>
      </div>
    </section>
  );
}
