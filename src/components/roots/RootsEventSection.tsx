/* =======================================
 * 熊日すぱいす ROOTS EVENT セクション
 * URL: /src/components/roots/RootsEventSection.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import Image from "next/image";
import styles from "./RootsEventSection.module.scss";

type Props = {
  image: string;
  title: string;
  text: string[];
};

export default function RootsEventSection({ image, title, text }: Props) {
  return (
    <section className={styles.rootsEventSection}>
      <header className={styles.head}>
        <p className={styles.titleEn}>EVENT</p>
        <hr className={styles.rule} />
        <p className={styles.titleJa}>イベント</p>
      </header>

      <div className={styles.card}>
        <p className={styles.shopTitle}>Shop Event</p>
        <Image src={image} alt={title} width={1200} height={900} className={styles.image} />
        <h3 className={styles.postTitle}>{title}</h3>
        {text.map((paragraph, index) => (
          <p key={`${paragraph}-${index}`} className={styles.text}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
